import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const feedbackSchema = z.object({
  ID_usuario: z.number().int().positive(),
  ID_conteudo: z.number().int().positive(),
  comentario: z.string().optional(),
  avaliacao: z.number().int().min(1).max(5),
})

export async function GET() {
  try {
    const lista = await prisma.fEEDBACK.findMany()
    return NextResponse.json(lista)
  } catch (err) {
    console.error('Erro ao buscar feedbacks:', err)
    return NextResponse.json({ error: 'Erro ao buscar feedbacks' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = feedbackSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: parsed.error.errors }, { status: 400 })
  }
  try {
    const f = await prisma.fEEDBACK.create({ data: parsed.data })
    return NextResponse.json(f, { status: 201 })
  } catch (err) {
    console.error('Erro ao criar feedback:', err)
    return NextResponse.json({ error: 'Erro ao criar feedback' }, { status: 500 })
  }
}
