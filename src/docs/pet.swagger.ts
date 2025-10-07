/**
 * @swagger
 * tags:
 *   name: Pet
 *   description: Rotas para gerenciamento de pets no sistema PetShop
 */

/**
 * @swagger
 * /pet:
 *   get:
 *     summary: Lista todos os pets cadastrados
 *     tags: [Pet]
 *     responses:
 *       200:
 *         description: Lista de pets retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /pet/{id}:
 *   get:
 *     summary: Busca um pet pelo ID
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Pet encontrado
 *       404:
 *         description: Pet não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /pet:
 *   post:
 *     summary: Cadastra um novo pet
 *     tags: [Pet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - especie
 *               - raca
 *               - dataNascimento
 *               - tutorId
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Rex"
 *               especie:
 *                 type: string
 *                 example: "Cachorro"
 *               raca:
 *                 type: string
 *                 example: "Labrador"
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *                 example: "2018-05-10"
 *               tutorId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 *       400:
 *         description: Erro de validação nos dados enviados
 */

/**
 * @swagger
 * /pet/{id}:
 *   put:
 *     summary: Atualiza os dados de um pet existente
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Rex Jr."
 *               especie:
 *                 type: string
 *                 example: "Cachorro"
 *               raca:
 *                 type: string
 *                 example: "Golden Retriever"
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *                 example: "2020-08-10"
 *               agendamentos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 4]
 *               consultas:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2]
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Pet não encontrado
 */

/**
 * @swagger
 * /pet/{id}:
 *   delete:
 *     summary: Exclui um pet (somente gerente autorizado)
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet a ser deletado
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
 *                 description: ID do gerente solicitante da exclusão
 *     responses:
 *       200:
 *         description: Pet deletado com sucesso
 *       403:
 *         description: Usuário não autorizado
 *       404:
 *         description: Pet não encontrado
 *       400:
 *         description: Erro de validação
 */
