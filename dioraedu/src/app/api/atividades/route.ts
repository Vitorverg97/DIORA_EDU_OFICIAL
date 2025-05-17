import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const atividadeSchema = z.object({
  ID_conteudo: z.number().int().positive(),
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  data_criacao: z.string().refine(d => !isNaN(Date.parse(d)), { message: 'Data inválida' }),
})

export async function GET() {
  try {
    const lista = await prisma.atividade.findMany()
    return NextResponse.json(lista)
  } catch (err) {
    console.error('Erro ao buscar atividades:', err)
    return NextResponse.json({ error: 'Erro ao buscar atividades' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = atividadeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: parsed.error.errors }, { status: 400 })
  }
  try {
    const atv = await prisma.atividade.create({ data: parsed.data })
    return NextResponse.json(atv, { status: 201 })
  } catch (err) {
    console.error('Erro ao criar atividade:', err)
    return NextResponse.json({ error: 'Erro ao criar atividade' }, { status: 500 })
  }
}
