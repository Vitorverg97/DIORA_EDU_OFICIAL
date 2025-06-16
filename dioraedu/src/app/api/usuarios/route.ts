import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
import bcrypt from 'bcryptjs';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  
  const usuarios = await prisma.usuario.findMany();
  return NextResponse.json(usuarios);
}

export async function POST(req: NextRequest) {
  // await authenticate(req); // descomente se for necessário autenticar

  const { nome, email, senha, perfil, dadosEspecificos } = await req.json()

  console.log({ nome, email, perfil })

  if (!nome || !email || !senha || !perfil) {
    return NextResponse.json({ message: 'Dados obrigatórios' }, { status: 400 })
  }

  const perfisPermitidos = ['aluno', 'professor', 'admin']
  if (!perfisPermitidos.includes(perfil)) {
    return NextResponse.json({ message: 'Perfil inválido' }, { status: 400 })
  }

  const existe = await prisma.usuario.findUnique({ where: { email } })
  if (existe) {
    return NextResponse.json({ message: 'E-mail já cadastrado' }, { status: 409 })
  }

  if (senha.length < 8) {
    return NextResponse.json(
      { erro: 'A senha deve conter pelo menos 8 caracteres.' },
      { status: 400 }
    )
  }

  const senhaHash = await bcrypt.hash(senha, 10)

  try {
    const novoUsuario = await prisma.$transaction(async (tx) => {
      const usuario = await tx.usuario.create({
        data: {
          nome,
          email,
          senhaHash,
          perfil,
        },
      })

      if (perfil === "aluno") {
        if (!dadosEspecificos?.instituicaoId) {
          throw new Error("Instituição é obrigatória para aluno.")
        }

        await tx.aluno.create({
          data: {
            usuarioId: usuario.id,
            instituicaoId: dadosEspecificos.instituicaoId,
            freemium: dadosEspecificos.freemium ?? true,
          },
        })
      } else if (perfil === "professor") {
        if (!dadosEspecificos?.instituicaoId) {
          throw new Error("Instituição é obrigatória para professor.")
        }

        await tx.professor.create({
          data: {
            usuarioId: usuario.id,
            instituicaoId: dadosEspecificos.instituicaoId,
            liberado: dadosEspecificos.liberado ?? false,
          },
        })
      } else if (perfil === "admin") {
        if (!dadosEspecificos?.instituicaoId) {
          throw new Error("Instituição é obrigatória para administrador.")
        }

        await tx.administrador.create({
          data: {
            usuarioId: usuario.id,
            instituicaoId: dadosEspecificos.instituicaoId,
            ativo: dadosEspecificos.ativo ?? true,
          },
        })
      }

      return usuario
    })

    return NextResponse.json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      perfil: novoUsuario.perfil
    }, { status: 201 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Erro ao cadastrar usuário:", error)
    return NextResponse.json({ message: error.message || 'Erro interno' }, { status: 500 })
  }
}