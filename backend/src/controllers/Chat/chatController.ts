import { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    username: string;
  };
}

export class chatController {
  async getConversations(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Usuário Não Autenticado" });
      }

      // TODO: Banco de dados

      return res
        .status(200)
        .json({ message: "Conversas carregadas com sucesso" });
    } catch (error) {
      console.error("Erro ao buscar conversas no Howlira:", error);
      return res
        .status(500)
        .json({ error: "Erro interno ao carregar conversas" });
    }
  }
}