import jwt from "jsonwebtoken";
import prisma from "../db/prismaClient";
import { hashUtil } from "../utils/hash.util";
import { env } from "../config/env";
import { AppError } from "../middlewares/errorHandler";

export type TipoUsuario = "GERENTE" | "VETERINARIO";

/**
 * Busca o usuário por e-mail nas duas tabelas autenticáveis.
 * Retorna o registro + o tipo (ou null se não existir em nenhuma).
 *
 * Limitação conhecida: Gerente e Veterinario têm colunas de e-mail com constraint
 * UNIQUE independente uma da outra (tabelas separadas). O create de cada serviço faz
 * uma checagem extra em nível de aplicação para impedir e-mail duplicado entre as duas
 * tabelas, mas isso não é atômico (race condition possível entre checagem e insert) —
 * uma garantia real exigiria uma tabela/coluna de e-mail compartilhada com constraint
 * única no banco. Se, por qualquer motivo, o mesmo e-mail existir nas duas tabelas,
 * esta função retorna o Gerente (a primeira tabela consultada).
 */
async function findUserByEmail(email: string) {
  const gerente = await prisma.gerente.findUnique({ where: { email } });
  if (gerente) return { usuario: gerente, tipo: "GERENTE" as const };

  const veterinario = await prisma.veterinario.findUnique({ where: { email } });
  if (veterinario) return { usuario: veterinario, tipo: "VETERINARIO" as const };

  return null;
}

const authService = {
  /**
   * Autentica por e-mail + senha (Gerente ou Veterinario).
   * Mensagem genérica para não vazar quais e-mails existem.
   */
  async login(email: string, senha: string) {
    const encontrado = await findUserByEmail(email);

    const senhaValida = encontrado
      ? await hashUtil.compare(senha, encontrado.usuario.senha)
      : false;

    if (!encontrado || !senhaValida) {
      throw new AppError(401, "E-mail ou senha inválidos.");
    }

    const token = jwt.sign(
      { sub: encontrado.usuario.id, tipo: encontrado.tipo },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"] }
    );

    return {
      token,
      tipo: encontrado.tipo,
      usuario: {
        id: encontrado.usuario.id,
        nome: encontrado.usuario.nome,
        email: encontrado.usuario.email,
      },
    };
  },

  /**
   * Retorna o perfil completo (sem senha) de um usuário autenticado.
   */
  async me(id: number, tipo: TipoUsuario) {
    if (tipo === "GERENTE") {
      const gerente = await prisma.gerente.findUnique({
        where: { id },
        select: { id: true, nome: true, email: true, createdAt: true, updatedAt: true },
      });
      if (!gerente) throw new AppError(404, "Gerente não encontrado.");
      return gerente;
    }

    const veterinario = await prisma.veterinario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        especialidade: true,
        consulta: { select: { id: true, data: true, descricao: true, tratamento: true, petId: true } },
      },
    });
    if (!veterinario) throw new AppError(404, "Veterinário não encontrado.");
    return veterinario;
  },
};

export default authService;
