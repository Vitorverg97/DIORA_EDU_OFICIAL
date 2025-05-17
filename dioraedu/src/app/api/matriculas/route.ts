import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const matriculaSchema = z.object({
  ID_usuario: z.number().int().positive(),
  ID_curso: z.number().int().positive(),
  data_matricula: z.string().refine(d => !isNaN(Date.parse(d)), { message: 'Data inválida' }),
})

export async function GET() {
  try {
    const lista = await prisma.matricula.findMany()
    return NextResponse.json(lista)
  } catch (err) {
    console.error('Erro ao buscar matrículas:', err)
    return NextResponse.json({ error: 'Erro ao buscar matrículas' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = matriculaSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: parsed.error.errors }, { status: 400 })
  }
  try {
    const mat = await prisma.matricula.create({ data: parsed.data })
    return NextResponse.json(mat, { status: 201 })
  } catch (err) {
    console.error('Erro ao criar matrícula:', err)
    return NextResponse.json({ error: 'Erro ao criar matrícula' }, { status: 500 })
  }
}
