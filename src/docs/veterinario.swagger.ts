/**
 * @swagger
 * tags:
 *   name: Veterinario
 *   description: Rotas para gerenciamento de veterinários no sistema PetShop
 */

/**
 * @swagger
 * /veterinario:
 *   get:
 *     summary: Lista todos os veterinários cadastrados
 *     tags: [Veterinario]
 *     responses:
 *       200:
 *         description: Lista de veterinários retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /veterinario/{id}:
 *   get:
 *     summary: Busca um veterinário pelo ID
 *     tags: [Veterinario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veterinário
 *     responses:
 *       200:
 *         description: Veterinário encontrado
 *       404:
 *         description: Veterinário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /veterinario:
 *   post:
 *     summary: Cadastra um novo veterinário
 *     tags: [Veterinario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - especialidade
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Dr. João Pedro"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao.pedro@email.com"
 *               senha:
 *                 type: string
 *                 example: "senhaSegura123"
 *               especialidade:
 *                 type: string
 *                 example: "Cardiologia veterinária"
 *     responses:
 *       201:
 *         description: Veterinário criado com sucesso
 *       400:
 *         description: Erro de validação nos dados enviados
 */

/**
 * @swagger
 * /veterinario/{id}:
 *   put:
 *     summary: Atualiza os dados de um veterinário existente
 *     tags: [Veterinario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veterinário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Dr. João P. Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao.p.silva@email.com"
 *               senha:
 *                 type: string
 *                 example: "novaSenhaSegura456"
 *               especialidade:
 *                 type: string
 *                 example: "Dermatologia veterinária"
 *     responses:
 *       200:
 *         description: Veterinário atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Veterinário não encontrado
 */

/**
 * @swagger
 * /veterinario/{id}:
 *   delete:
 *     summary: Exclui um veterinário (somente gerente autorizado)
 *     tags: [Veterinario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veterinário a ser deletado
 *       - in: query
 *         name: gerenteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do gerente solicitante da exclusão
 *     responses:
 *       200:
 *         description: Veterinário deletado com sucesso
 *       403:
 *         description: Usuário não autorizado
 *       404:
 *         description: Veterinário não encontrado
 *       400:
 *         description: Erro de validação
 */
