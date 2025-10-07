/**
 * @swagger
 * tags:
 *   name: Gerente
 *   description: Rotas para gerenciamento de gerentes
 */

/**
 * @swagger
 * /gerente:
 *   get:
 *     summary: Lista todos os gerentes
 *     tags: [Gerente]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /gerente/{id}:
 *   get:
 *     summary: Busca um gerente pelo ID
 *     tags: [Gerente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gerente encontrado
 *       404:
 *         description: Gerente não encontrado
 */

/**
 * @swagger
 * /gerente:
 *   post:
 *     summary: Cria um novo gerente
 *     tags: [Gerente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Gerente criado
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /gerente/{id}:
 *   put:
 *     summary: Atualiza os dados de um gerente
 *     tags: [Gerente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Atualizado"
 *               email:
 *                 type: string
 *                 example: "joao.atualizado@email.com"
 *               senha:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Gerente atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Gerente não encontrado
 */

/**
 * @swagger
 * /gerente/{id}:
 *   delete:
 *     summary: Deleta um gerente
 *     tags: [Gerente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gerenteId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Gerente deletado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Gerente não encontrado
 */
