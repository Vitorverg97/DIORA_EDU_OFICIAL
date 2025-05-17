import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// PUT /api/matriculas/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await req.json()

  try {
    const matriculaAtualizada = await prisma.mATRICULA.update({
      where: { ID_matricula: id },
      data: body,
    })
    return NextResponse.json(matriculaAtualizada)
  } catch (error) {
    console.error('Erro ao atualizar matricula:', error)
    return NextResponse.json({ error: 'Erro ao atualizar matricula.' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  try {
    await prisma.mATRICULA.delete({
      where: { ID_matricula: id },
    })
    return NextResponse.json({ message: 'Matricula excluída com sucesso.' })
  } catch (error) {
    console.error('Erro ao excluir matricula:', error)
    return NextResponse.json({ error: 'Erro ao excluir Matricula.' }, { status: 500 })
  }
}
