
import { DefaultSession, DefaultUser } from "next-auth";

// 1. Extenda o tipo User retornado no authorize
declare module "next-auth" {
  interface Session {
    user?: {
      id?: number;
      nome?: string;
      tipo?: string;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: number;
    nome: string;
    tipo: string;
    email: string;
  }
}

// 2. Extenda o tipo Token para JWT customizado
declare module "next-auth/jwt" {
  interface JWT {
    id?: number;
    nome?: string;
    tipo?: string;
    email?: string;
  }
}