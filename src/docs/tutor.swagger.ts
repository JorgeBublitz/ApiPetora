/**
 * @swagger
 * tags:
 *   name: Tutor
 *   description: Rotas para gerenciamento de tutores no sistema PetShop
 */

/**
 * @swagger
 * /tutor:
 *   get:
 *     summary: Lista todos os tutores cadastrados
 *     tags: [Tutor]
 *     responses:
 *       200:
 *         description: Lista de tutores retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /tutor/{id}:
 *   get:
 *     summary: Busca um tutor pelo ID
 *     tags: [Tutor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor
 *     responses:
 *       200:
 *         description: Tutor encontrado
 *       404:
 *         description: Tutor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /tutor:
 *   post:
 *     summary: Cadastra um novo tutor
 *     tags: [Tutor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Carlos da Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "carlos.silva@email.com"
 *               telefone:
 *                 type: string
 *                 example: "(11) 91234-5678"
 *     responses:
 *       201:
 *         description: Tutor criado com sucesso
 *       400:
 *         description: Erro de validação nos dados enviados
 */

/**
 * @swagger
 * /tutor/{id}:
 *   put:
 *     summary: Atualiza os dados de um tutor existente
 *     tags: [Tutor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Carlos Augusto da Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "carlos.augusto@email.com"
 *               telefone:
 *                 type: string
 *                 example: "(11) 99876-5432"
 *     responses:
 *       200:
 *         description: Tutor atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Tutor não encontrado
 */

/**
 * @swagger
 * /tutor/{id}:
 *   delete:
 *     summary: Exclui um tutor (somente gerente autorizado)
 *     tags: [Tutor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor a ser deletado
 *       - in: query
 *         name: gerenteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do gerente solicitante da exclusão
 *     responses:
 *       200:
 *         description: Tutor deletado com sucesso
 *       403:
 *         description: Usuário não autorizado
 *       404:
 *         description: Tutor não encontrado
 *       400:
 *         description: Erro de validação
 */
