import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const matriculas = await prisma.mATRICULA.findMany()
            return res.status(200).json(matriculas)
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao buscar matrículas.' })
        }
    }

    if (req.method === 'POST') {
        try {
            const matricula = await prisma.mATRICULA.create({ data: req.body })
            return res.status(201).json(matricula)
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao criar matrícula.' })
        }
    }

    return res.status(405).json({ error: 'Método não permitido.' })
}
