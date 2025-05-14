// pages/api/usuarios/perfil.ts

import type { NextApiResponse } from 'next'
import { authMiddleware, AuthenticatedRequest } from '@/middleware/authMiddleware'

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const usuario = req.usuario

  return res.status(200).json({
    mensagem: 'Perfil acessado com sucesso!',
    usuario,
  })
}

export default authMiddleware(handler)
