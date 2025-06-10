'use client'

import { /*useEffect,*/ useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaMicrosoft } from "react-icons/fa";
import Image from 'next/image';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import  prisma from '@/lib/prisma';
//import { useSession } from "next-auth/react";

export default function Login() {
  //const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(""); 
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      senha,
    });

    if (res?.error) {
      setErro("E-mail ou senha inválidos");
    } 
    else if (res?.ok) {     
      if (prisma.usuario.fields.perfil.name === "aluno"){
         alert(prisma.usuario.fields.perfil.name)
         router.push("/pages/home-aluno");
      } 
      if (prisma.usuario.fields.perfil.name === "professor") {
         router.push("/pages/home-professor");
      } 
      if (prisma.usuario.fields.perfil.name === "admin") {
         router.push("/pages/home-admin");
    }
  }
}
/*
  useEffect(() => {
    if (session?.user?.tipo === "aluno") {
      router.push("/pages/home-aluno");
    } else if (session?.user?.tipo === "professor") {
      router.push("/pages/home-professor");
    } else if (session?.user?.tipo === "admin") {
      router.push("/pages/home-admin");
    }

} , [session, router]);*/

  return (
        <div className="min-h-screen bg-[#BDE3FA] text-black flex flex-col justify-between">
      {/* Conteúdo principal */}
      <div className="mt-16 text-center flex flex-col items-center gap-4">
        {/* Logo */}
        <Image src="/assets/icone-cerebro.svg"
               alt="Logo-DioraEDU"
               className="w-30 h-30"
               width={261}
               height={292} />

        {/* Título */}
        <h1 className="text-2xl font-bold text-black">Que bom que você voltou!</h1>

        {/* Formulário */}
        <div className="flex flex-col text-black items-center gap-3 w-80">
          <form onSubmit={handleSubmit} className="max-w-sm  mt-10">
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            className="px-4 py-2 rounded w-full outline-none input" required
            
          />
          
          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            type="password"
            className="px-4 py-2 rounded w-full outline-none input" required
          />
          
          {erro && <div className='text-red-500 mt-2'>{erro}</div>}

          <button
            type="submit"
            className="bg-[#4A4A4A] text-white px-6 py-2 rounded w-full hover:opacity-90"
          >
            Continuar
          </button>
          

            <div className="flex flex-col items-center gap-2 mt-2 w-full">
            <button
              type='button'
              className="text-pink-400 text-sm hover:underline"
              onClick={() => router.push("/pages/cadastro")}
            >
              Não tem uma conta? Cadastrar
            </button>
            </div>
            </form>
          
          <div className="flex items-center justify-center w-full text-black">
                <div className="flex-grow mr-2"></div>
                <span className="text-black">ou</span>
                <div className="flex-grow ml-2"></div>
            
            
            </div>

          {/* Login social */}
          <button className="flex items-center text-black justify-center gap-3 border px-4 py-2 rounded w-full bg-white hover:bg-gray-100">
            <FcGoogle className="text-xl" />
            Continuar com o Google
          </button>
          <button className="flex items-center text-black justify-center gap-3 border px-4 py-2 rounded w-full bg-white hover:bg-gray-100">
            <FaFacebook className="text-blue-600 text-xl" />
            Continuar com o Facebook
          </button>
          <button className="flex items-center text-black justify-center gap-3 border px-4 py-2 rounded w-full bg-white hover:bg-gray-100">
            <FaMicrosoft className="text-blue-800 text-xl" />
            Continuar com a conta Microsoft
          </button>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-[#4A4A4A] w-full py-4 flex justify-around items-center text-white text-sm">
        <button className="hover:underline">Sobre nós</button>
        <button className="hover:underline">Mídias Sociais</button>
        <div className="flex gap-2">
          
        <Image src="/assets/google-play.png"
               alt="Google Play"
               className="h-10" 
               width={130}
               height={80}
        />
          
        <Image src="/assets/app-store.png"
               alt="App Store"
               className="h-10"
               width={130}
               height={80}
        />
        </div>
      </footer>
    </div>
  );
}

