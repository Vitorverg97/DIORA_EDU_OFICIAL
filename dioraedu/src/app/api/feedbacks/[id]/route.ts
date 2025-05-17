// PUT /api/feedbacks/[id]

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await req.json()

  try {
    const feedbackAtualizado = await prisma.fEEDBACK.update({
      where: { ID_feedback: id },
      data: body,
    })
    return NextResponse.json(feedbackAtualizado)
  } catch (error) {
    console.error('Erro ao atualizar feedback:', error)
    return NextResponse.json({ error: 'Erro ao atualizar feedback.' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  try {
    await prisma.fEEDBACK.delete({
      where: { ID_feedback: id },
    })
    return NextResponse.json({ message: 'Feedback excluída com sucesso.' })
  } catch (error) {
    console.error('Erro ao excluir feedback:', error)
    return NextResponse.json({ error: 'Erro ao excluir feedback.' }, { status: 500 })
  }
}
