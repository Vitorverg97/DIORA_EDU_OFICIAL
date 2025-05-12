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
        
    }
}