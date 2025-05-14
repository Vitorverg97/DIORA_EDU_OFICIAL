import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const atividades = await prisma.aTIVIDADE.findMany()
      return res.status(200).json(atividades)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao buscar atividades.' })
    }
  }

  if (req.method === 'POST') {
    try {
      const atividade = await prisma.aTIVIDADE.create({ data: req.body })
      return res.status(201).json(atividade)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao criar atividade.' })
    }
  }

  return res.status(405).json({ error: 'Método não permitido.' })
}
