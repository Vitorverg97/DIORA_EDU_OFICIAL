import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// PUT /api/tentativas/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await req.json()

  try {
    const tentativaAtualizada = await prisma.tentativa.update({
      where: { ID_tentativa: id },
      data: body,
    })
    return NextResponse.json(tentativaAtualizada)
  } catch (error) {
    console.error('Erro ao atualizar tentativa:', error)
    return NextResponse.json({ error: 'Erro ao atualizar tentativa.' }, { status: 500 })
  }
}

// DELETE /api/tentativas/[id]
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  try {
    await prisma.tentativa.delete({
      where: { ID_tentativa: id },
    })
    return NextResponse.json({ message: 'tentativa excluída com sucesso.' })
  } catch (error) {
    console.error('Erro ao excluir tentativa:', error)
    return NextResponse.json({ error: 'Erro ao excluir tentativa.' }, { status: 500 })
  }
}
