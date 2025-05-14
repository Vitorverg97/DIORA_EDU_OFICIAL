import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const cursos = await prisma.cURSO.findMany()
      return res.status(200).json(cursos)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao buscar cursos.' })
    }
  }

  if (req.method === 'POST') {
    try {
      const curso = await prisma.cURSO.create({ data: req.body })
      return res.status(201).json(curso)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao criar curso.' })
    }
  }

  return res.status(405).json({ error: 'Método não permitido.' })
}
