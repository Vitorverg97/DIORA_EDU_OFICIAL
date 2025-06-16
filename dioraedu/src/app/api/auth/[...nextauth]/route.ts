import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * Configuração NextAuth para a autenticação de credenciais personalizadas
 * 
 * Este handler define um provedor de credenciais que permite aos usuários
 * fazer login com email e senha. A função `authorize` é responsável por
 * validar as credenciais fornecidas contra o banco de dados.
 */

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        senha: { label: "Senha", type: "password" },
      },

/**
 * Valida credenciais fornecidas (email e senha)
 * 
 * @param credentials - objeto que contém as credenciais do usuário (email e senha)
 * @param credentials.email - Email do usuário
 * @param credentials.senha - Senha do usuário
 * @Returns Um objeto de usuário se a autentificação for bem sucedida, caso contrário retorna "null"
 */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) return null;

        const user = await prisma.usuario.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.senha, user.senhaHash);
        if (!valid) return null;

        // Retorne o objeto com os campos customizados que você quer propagar
        return {
          id: user.id,
          email: user.email,
          nome: user.nome,
          tipo: user.perfil,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Adiciona campos customizados ao token JWT
    async jwt({ token, user }) {
      if (user) {
        // Type assertion para aceitar os campos customizados
        token.id = typeof user.id === "string" ? parseInt(user.id,10) : user.id;
        token.nome = user.nome;
        token.tipo = user.tipo;
      }
      return token;
    },
    // Adiciona os campos customizados à sessão
    async session({ session, token }) {
      // Garante que session.user existe
      if (session.user) {
        session.user.id = token.id as number;
        session.user.nome = token.nome as string;
        session.user.tipo = token.tipo as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };