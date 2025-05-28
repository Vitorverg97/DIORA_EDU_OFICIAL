'use client'

import { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaMicrosoft } from "react-icons/fa";
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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
          <input
            type="text"
            placeholder="Email ou nome de usuário"
            className="px-4 py-2 rounded w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="px-4 py-2 rounded w-full outline-none"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            onClick={() => {
              window.location.href = "/pages/home";
            }}
            className="bg-[#4A4A4A] text-white px-6 py-2 rounded w-full hover:opacity-90"
          >
            Continuar
          </button>


            <div className="flex flex-col items-center gap-2 mt-2 w-full">
            <button
                onClick={() => window.location.href = '/pages/cadastro'}
                className="text-pink-400 text-sm hover:underline"
            >
                Não tem uma conta? Cadastrar
            </button>

            <div className="flex items-center justify-center w-full text-black">
                <div className="border-t border-black flex-grow mr-2"></div>
                <span className="text-sm">ou</span>
                <div className="border-t border-black flex-grow ml-2"></div>
            </div>
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
