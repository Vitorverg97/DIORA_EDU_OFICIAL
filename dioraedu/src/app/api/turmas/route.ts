import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
//import { authenticate } from '@/lib/authMiddleware'; // middleware de autenticação JWT

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  // await authenticate(req); // lança erro 401 se não autenticado
  try{
    const turmas = await prisma.turma.findMany({
      include: {
        curso: true,
        professor: true,
        instituicao: true,
      },
    });
  return NextResponse.json(turmas, {status: 200});

  } catch (error) {
    console.error('Erro ao buscar turmas:', error);
    
    return NextResponse.json({ error: 'Erro ao buscar turmas' }, { status: 500 });
  }  
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // validação se existe o usuário professor
    const professorExiste = await prisma.professor.findUnique({
  where: { usuarioId: data.professorId }
});

if (!professorExiste) {
  return NextResponse.json({ message: 'Professor não encontrado' }, { status: 400 });
}

    // Validação básica (melhor usar Zod para isso em produção)
    if (!data.nome || !data.cursoId || !data.professorId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes' },
        { status: 400 }
      );
    }

    const novaTurma = await prisma.turma.create({
      data: {
        nome: data.nome,
        cursoId: data.cursoId,
        professorId: data.professorId,
        instituicaoId: data.instituicaoId ?? null,
        dataInicio: data.dataInicio ? new Date(data.dataInicio) : null,
        dataFim: data.dataFim ? new Date(data.dataFim) : null,
      },
    });

    return NextResponse.json(novaTurma, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar turma:', error);
    return NextResponse.json({ error: 'Erro ao criar turma' }, { status: 400 });
  }
}