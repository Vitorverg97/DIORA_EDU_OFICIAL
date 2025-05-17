import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const conteudoSchema = z.object({
  ID_curso: z.number().int().positive(),
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  tipo: z.enum(['Texto', 'Vídeo', 'Exercício']),
})

export async function GET() {
  try {
    const lista = await prisma.cONTEUDO.findMany()
    return NextResponse.json(lista)
  } catch (err) {
    console.error('Erro ao buscar conteúdos:', err)
    return NextResponse.json({ error: 'Erro ao buscar conteúdos' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = conteudoSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: parsed.error.errors }, { status: 400 })
  }
  try {
    const cont = await prisma.cONTEUDO.create({ data: parsed.data })
    return NextResponse.json(cont, { status: 201 })
  } catch (err) {
    console.error('Erro ao criar conteúdo:', err)
    return NextResponse.json({ error: 'Erro ao criar conteúdo' }, { status: 500 })
  }
}
