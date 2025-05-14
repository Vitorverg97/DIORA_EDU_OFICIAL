import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

// Schema para validar os dados de entrada
const usuarioSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  senha: z.string().min(6),
  tipo: z.enum(['Aluno', 'Professor']),
})

// GET /api/usuarios
export async function GET() {
  try {
    const usuarios = await prisma.uSUARIO.findMany({
      select: {
        ID_usuario: true,
        nome: true,
        email: true,
        tipo: true,
      },
    })
    return NextResponse.json(usuarios, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 })
  }
}

// POST /api/usuarios
export async function POST(req: Request) {
  const body = await req.json()
  const result = usuarioSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: result.error.errors }, { status: 400 })
  }

  const { nome, email, senha: senhaInput, tipo } = result.data // renomeando 'senha' para evitar conflitos

  try {
    const senhaHash: string = await bcrypt.hash(senhaInput, 10) // adicionando tipagem explícita

    const novoUsuario = await prisma.uSUARIO.create({
      data: { nome, email, senha: senhaHash, tipo },
      select: {
        ID_usuario: true,
        nome: true,
        email: true,
        tipo: true,
      }
    })

    return NextResponse.json(novoUsuario, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 })
  }
}
