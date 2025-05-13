// app/api/usuarios.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const usuarioSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  senha: z.string().min(6),
  tipo: z.enum(['Aluno', 'Professor']),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const usuarios = await prisma.uSUARIO.findMany()
      return res.status(200).json(usuarios)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      return res.status(500).json({ error: 'Erro ao buscar usuários.' })
    }
  }

  if (req.method === 'POST') {
  const result = usuarioSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: 'Dados inválidos.',
      issues: result.error.errors,
    })
  }

  const { nome, email, senha, tipo } = result.data

  try {
    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUsuario = await prisma.uSUARIO.create({
      data: { nome, email, senha: senhaHash, tipo },
    })

    return res.status(201).json(novoUsuario)
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return res.status(500).json({ error: 'Erro ao criar usuário.' })
  }
}

}
