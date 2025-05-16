import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const cursoSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().min(1),
})

export async function GET() {
  try {
    const cursos = await prisma.cURSO.findMany({
      select: { ID_curso: true, nome: true, descricao: true },
    })
    return NextResponse.json(cursos)
  } catch (err) {
    console.error('Erro ao buscar cursos:', err)
    return NextResponse.json({ error: 'Erro ao buscar cursos' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = cursoSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: parsed.error.errors }, { status: 400 })
  }
  try {
    const curso = await prisma.cURSO.create({ data: parsed.data })
    return NextResponse.json(curso, { status: 201 })
  } catch (err) {
    console.error('Erro ao criar curso:', err)
    return NextResponse.json({ error: 'Erro ao criar curso' }, { status: 500 })
  }
}
