/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Rotas de login, refresh e logout do sistema
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do gerente
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               senha:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *                 accessToken:
 *                   type: string
 *                   description: Token JWT de acesso
 *                 refreshToken:
 *                   type: string
 *                   description: Token usado para renovar o accessToken
 *       401:
 *         description: Email ou senha inválidos
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Gera um novo accessToken usando o refreshToken
 *     tags: [Autenticação]
 *     security:
 *       - refreshToken: []
 *     parameters:
 *       - in: header
 *         name: x-refresh-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de atualização (refreshToken)
 *     responses:
 *       200:
 *         description: Novo accessToken gerado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Novo JWT válido por 1 hora
 *       401:
 *         description: Refresh token inválido ou expirado
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Encerra a sessão removendo o refreshToken do banco
 *     tags: [Autenticação]
 *     security:
 *       - refreshToken: []
 *     parameters:
 *       - in: header
 *         name: x-refresh-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de atualização (refreshToken) a ser invalidado
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Token inválido ou não encontrado
 */
