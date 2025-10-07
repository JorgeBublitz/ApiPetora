/**
 * @swagger
 * tags:
 *   name: Agendamento
 *   description: Rotas para gerenciamento de agendamentos no sistema PetShop
 */

/**
 * @swagger
 * /agendamento:
 *   get:
 *     summary: Lista todos os agendamentos
 *     tags: [Agendamento]
 *     responses:
 *       200:
 *         description: Lista de agendamentos retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /agendamento/{id}:
 *   get:
 *     summary: Busca um agendamento pelo ID
 *     tags: [Agendamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /agendamento:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *               - servico
 *               - petId
 *             properties:
 *               data:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-12T14:30:00Z"
 *               servico:
 *                 type: string
 *                 example: "Banho e Tosa"
 *               observacao:
 *                 type: string
 *                 example: "Usar shampoo hipoalergênico"
 *               petId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *       400:
 *         description: Erro de validação dos dados enviados
 */

/**
 * @swagger
 * /agendamento/{id}:
 *   put:
 *     summary: Atualiza um agendamento existente
 *     tags: [Agendamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-15T10:00:00Z"
 *               servico:
 *                 type: string
 *                 example: "Consulta veterinária"
 *               observacao:
 *                 type: string
 *                 example: "Paciente em jejum"
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Agendamento não encontrado
 */

/**
 * @swagger
 * /agendamento/{id}:
 *   delete:
 *     summary: Exclui um agendamento (somente gerente autorizado)
 *     tags: [Agendamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento a ser deletado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - solicitanteId
 *             properties:
 *               solicitanteId:
 *                 type: integer
 *                 example: 1
 *                 description: ID do gerente que solicita a exclusão
 *     responses:
 *       200:
 *         description: Agendamento deletado com sucesso
 *       403:
 *         description: Usuário não autorizado a deletar
 *       404:
 *         description: Agendamento não encontrado
 *       400:
 *         description: Erro de validação
 */
