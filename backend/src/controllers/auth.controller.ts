import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterInput, LoginInput, RefreshTokenInput } from '../utils/validation.schemas';

export class AuthController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const data: RegisterInput = req.body;
      await AuthService.register(data);

      return res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso',
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const data: LoginInput = req.body;
      const tokens = await AuthService.login(data);

      return res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: tokens,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  }

  static async refresh(req: Request, res: Response): Promise<Response> {
    try {
      const { refreshToken }: RefreshTokenInput = req.body;
      const tokens = await AuthService.refreshAccessToken(refreshToken);

      return res.status(200).json({
        success: true,
        message: 'Token renovado com sucesso',
        data: tokens,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  }

  static async logout(req: Request, res: Response): Promise<Response> {
    try {
      const { refreshToken }: RefreshTokenInput = req.body;
      await AuthService.logout(refreshToken);

      return res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso',
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  }

  static async me(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.gerente) {
        return res.status(401).json({
          success: false,
          message: 'Não autenticado',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Usuário autenticado',
        data: {
          userId: req.gerente.gerenteId,
          email: req.gerente.email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  }
}
