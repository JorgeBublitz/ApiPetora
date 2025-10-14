import prisma from '../config/prisma';
import { HashUtil } from '../utils/hash.util';
import { JwtUtil } from '../utils/jwt.util';
import { TokenPair } from '../types/jwt.types';
import { RegisterInput, LoginInput } from '../utils/validation.schemas';

export class AuthService {

  // Realiza o cadastro do usuário
  static async register(data: RegisterInput): Promise<TokenPair> {
    const existingGerente = await prisma.gerente.findUnique({
      where: { email: data.email },
    });

    if (existingGerente) {
      throw new Error('Email já está em uso');
    }
    
    const hashedPassword = await HashUtil.hashPassword(data.password);

    // Criar usuário
    const gerente = await prisma.gerente.create({
      data: {
        email: data.email,
        password: hashedPassword,
        nome: data.name,
      },
    });

    // Gerar tokens
    const payload = { gerenteId: gerente.id.toString(), email: gerente.email };
    const accessToken = JwtUtil.generateAccessToken(payload);
    const refreshToken = JwtUtil.generateRefreshToken(payload);

    // Salvar refresh token no banco
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        gerenteId: gerente.id,
        expiresAt: JwtUtil.getRefreshTokenExpirationDate(),
      },
    });

    return { accessToken, refreshToken };
  }

  // Realiza o login do usuário
  static async login(data: LoginInput): Promise<TokenPair> {
    // Buscar usuário
    const gerente = await prisma.gerente.findUnique({
      where: { email: data.email },
    });

    if (!gerente) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await HashUtil.comparePassword(data.password, gerente.password);

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }
    // Gerar tokens
    const payload = { gerenteId: gerente.id.toString(), email: gerente.email };
    const accessToken = JwtUtil.generateAccessToken(payload);
    const refreshToken = JwtUtil.generateRefreshToken(payload);

    // Salvar refresh token no banco
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        gerenteId: gerente.id,
        expiresAt: JwtUtil.getRefreshTokenExpirationDate(),
      },
    });

    return { accessToken, refreshToken };
  }

  static async refreshAccessToken(refreshToken: string): Promise<TokenPair> {
    // Verificar o refresh token
    const payload = JwtUtil.verifyRefreshToken(refreshToken);

    // Verificar se o refresh token existe no banco e não expirou
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken) {
      throw new Error('Refresh token inválido');
    }

    if (storedToken.expiresAt < new Date()) {
      // Token expirado, remover do banco
      await prisma.refreshToken.delete({
        where: { id: storedToken.id },
      });
      throw new Error('Refresh token expirado');
    }

    // Remover o refresh token antigo (rotação de tokens)
    await prisma.refreshToken.delete({
      where: { id: storedToken.id },
    });

    // Gerar novos tokens
    const newAccessToken = JwtUtil.generateAccessToken(payload);
    const newRefreshToken = JwtUtil.generateRefreshToken(payload);

    // Salvar novo refresh token no banco
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        gerenteId: String(payload.gerenteId),
        expiresAt: JwtUtil.getRefreshTokenExpirationDate(),
      },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
  
  static async logout(refreshToken: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }
}

