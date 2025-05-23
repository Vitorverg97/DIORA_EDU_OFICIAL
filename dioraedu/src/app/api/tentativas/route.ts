import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const tentativaSchema = z.object({
  ID_usuario: z.number().int().positive(),
  ID_conteudo: z.number().int().positive(),
  pontuacao: z.number().int().min(0),
  // data_tentativa fica com default CURRENT_TIMESTAMP se não enviada
})

export async function GET() {
  try {
    const lista = await prisma.tentativa.findMany()
    return NextResponse.json(lista)
  } catch (err) {
    console.error('Erro ao buscar tentativas:', err)
    return NextResponse.json({ error: 'Erro ao buscar tentativas' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = tentativaSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: parsed.error.errors }, { status: 400 })
  }
  try {
    const t = await prisma.tentativa.create({ data: parsed.data })
    return NextResponse.json(t, { status: 201 })
  } catch (err) {
    console.error('Erro ao criar tentativa:', err)
    return NextResponse.json({ error: 'Erro ao criar tentativa' }, { status: 500 })
  }
}
