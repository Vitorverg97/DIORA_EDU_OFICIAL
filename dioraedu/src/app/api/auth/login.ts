import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
})

const JWT_SECRET = process.env.JWT_SECRET || 'NikVergara_crazyK9'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const result = loginSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({
      error: 'Dados inválidos.',
      issues: result.error.errors,
    })
  }

  const { email, senha } = result.data

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    })

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta' })
    }

    const token = jwt.sign(
      {
        id: usuario.ID_usuario,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )

    return res.status(200).json({
      mensagem: 'Login bem-sucedido',
      token,
      usuario: {
        id: usuario.ID_usuario,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
    })
  } catch (error) {
    console.error('Erro no login:', error)
    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
}
