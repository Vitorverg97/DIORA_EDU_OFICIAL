import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const feedbacks = await prisma.fEEDBACK.findMany()
      return res.status(200).json(feedbacks)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao buscar feedbacks.' })
    }
  }

  if (req.method === 'POST') {
    try {
      const feedback = await prisma.fEEDBACK.create({ data: req.body })
      return res.status(201).json(feedback)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao criar feedback.' })
    }
  }

  return res.status(405).json({ error: 'Método não permitido.' })
}
