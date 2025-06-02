import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function authenticate(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) throw new NextResponse('Token não informado', { status: 401 });
  const token = auth.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return null
  } catch {
    throw new NextResponse('Token inválido', { status: 401 });
  }
}
