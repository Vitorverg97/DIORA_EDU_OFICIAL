import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const conteudos = await prisma.cONTEUDO.findMany()
            return res.status(200).json(conteudos)
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao buscar conteúdos.' })
        }
    }

    if (req.method === 'POST') {
        try {
            const conteudo = await prisma.cONTEUDO.create({ data: req.body })
            return res.status(201).json(conteudo)
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao criar conteúdo.' })
        }
    }

    return res.status(405).json({error: 'Método não permitido.'})
}