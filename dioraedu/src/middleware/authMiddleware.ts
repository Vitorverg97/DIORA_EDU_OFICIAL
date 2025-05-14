import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'


export interface AuthenticatedRequest extends NextApiRequest {
  usuario: {
    id: number
    email: string
    tipo: 'Aluno' | 'Professor'
  }
}

// Middleware de autenticação
export function authMiddleware(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => void | Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Token ausente.' })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthenticatedRequest['usuario']
      ;(req as AuthenticatedRequest).usuario = decoded
      return handler(req as AuthenticatedRequest, res)
    } catch (error) {
      console.error('Erro ao verificar token:', error)
      return res.status(401).json({ error: 'Token inválido ou expirado.' })
    }
  }
}
