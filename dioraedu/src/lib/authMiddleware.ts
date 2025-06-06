
/*
import { NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function authenticate(req: NextRequest): Promise<JwtPayload | string> {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Token não fornecido');
    error.name = 'UnauthorizedError';
    throw error;
  }

  const token = authHeader.split(' ')[1];

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET não está definido no ambiente');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: any) {
    const error = new Error('Token inválido');
    error.name = 'UnauthorizedError';
    throw error;
  }
}
*/