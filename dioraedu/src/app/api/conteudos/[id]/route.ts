import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// PUT /api/conteudos/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await req.json()

  try {
    const conteudoAtualizado = await prisma.cONTEUDO.update({
      where: { ID_conteudo: id },
      data: body,
    })
    return NextResponse.json(conteudoAtualizado)
  } catch (error) {
    console.error('Erro ao atualizar conteudo:', error)
    return NextResponse.json({ error: 'Erro ao atualizar conteudo.' }, { status: 500 })
  }
}

// DELETE /api/conteudos/[id]
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  try {
    await prisma.cONTEUDO.delete({
      where: { ID_conteudo: id },
    })
    return NextResponse.json({ message: 'conteudo excluída com sucesso.' })
  } catch (error) {
    console.error('Erro ao excluir conteudo:', error)
    return NextResponse.json({ error: 'Erro ao excluir conteudo.' }, { status: 500 })
  }
}
