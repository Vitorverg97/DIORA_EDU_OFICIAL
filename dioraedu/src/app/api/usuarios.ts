// pages/api/usuarios.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const usuarios = await prisma.uSUARIO.findMany()
      return res.status(200).json(usuarios)
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ error: 'Erro ao buscar usuários.' })
    }
  }

  if (req.method === 'POST') {
    const { nome, email, senha, tipo } = req.body
    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ error: 'Dados incompletos.' })
    }

    try {
      const novoUsuario = await prisma.uSUARIO.create({
        data: { nome, email, senha, tipo },
      })
      return res.status(201).json(novoUsuario)
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro ao criar usuário.' })
    }
  }

  return res.status(405).json({ error: 'Método não permitido.' })
}
