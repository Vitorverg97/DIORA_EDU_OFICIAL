import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const tentativas = await prisma.tENTATIVA.findMany()
      return res.status(200).json(tentativas)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao buscar tentativas.' })
    }
  }

  if (req.method === 'POST') {
    try {
      const tentativa = await prisma.tENTATIVA.create({ data: req.body })
      return res.status(201).json(tentativa)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao criar tentativa.' })
    }
  }

  return res.status(405).json({ error: 'Método não permitido.' })
}
