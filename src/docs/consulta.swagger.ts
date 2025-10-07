/**
 * @swagger
 * tags:
 *   name: Consulta
 *   description: Rotas para gerenciamento de consultas veterinárias
 */

/**
 * @swagger
 * /consulta:
 *   get:
 *     summary: Lista todas as consultas cadastradas
 *     tags: [Consulta]
 *     responses:
 *       200:
 *         description: Lista de consultas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consulta'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /consulta/{id}:
 *   get:
 *     summary: Busca uma consulta pelo ID
 *     tags: [Consulta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta
 *     responses:
 *       200:
 *         description: Consulta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /consulta:
 *   post:
 *     summary: Cria uma nova consulta
 *     tags: [Consulta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *               - veterinarioId
 *               - descricao
 *               - petId
 *             properties:
 *               data:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-20T15:30:00Z"
 *               descricao:
 *                 type: string
 *                 example: "Consulta de rotina"
 *               tratamento:
 *                 type: string
 *                 example: "Prescrição de antibiótico"
 *               petId:
 *                 type: integer
 *                 example: 2
 *               veterinarioId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Consulta criada com sucesso
 *       400:
 *         description: Erro de validação nos dados enviados
 */

/**
 * @swagger
 * /consulta/{id}:
 *   put:
 *     summary: Atualiza uma consulta existente
 *     tags: [Consulta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta a ser atualizada
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
 *                 example: "2025-10-22T09:00:00Z"
 *               descricao:
 *                 type: string
 *                 example: "Revisão pós-operatória"
 *               tratamento:
 *                 type: string
 *                 example: "Continuação da medicação"
 *               petId:
 *                 type: integer
 *                 example: 2
 *               veterinarioId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Consulta atualizada com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Consulta não encontrada
 */

/**
 * @swagger
 * /consulta/{id}:
 *   delete:
 *     summary: Exclui uma consulta (somente gerente autorizado)
 *     tags: [Consulta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta a ser deletada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gerenteId
 *             properties:
 *               gerenteId:
 *                 type: integer
 *                 example: 1
 *                 description: ID do gerente solicitante da exclusão
 *     responses:
 *       200:
 *         description: Consulta deletada com sucesso
 *       403:
 *         description: Usuário não autorizado a excluir
 *       404:
 *         description: Consulta não encontrada
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Consulta:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         data:
 *           type: string
 *           format: date-time
 *         descricao:
 *           type: string
 *         tratamento:
 *           type: string
 *         veterinarioId:
 *           type: integer
 *         petId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

