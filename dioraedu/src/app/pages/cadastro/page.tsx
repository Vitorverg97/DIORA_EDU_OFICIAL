'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaMicrosoft } from "react-icons/fa";
import Image from 'next/image';

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState('aluno');
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (res.ok) {
      router.push("/pages/login");
    } else {
      const { error } = await res.json();
      setErro(error || "Erro ao registrar");
    }
  }

  return (
    <div className="min-h-screen bg-[#BDE3FA] text-black flex flex-col justify-between">
      
      {/* Conteúdo principal */}
      <div className="mt-16 text-center flex flex-col items-center gap-4">
        {/* Logo */}
        <Image
          src="/assets/icone-cerebro.svg"
          alt="Logo-DioraEDU"
          className="w-30 h-30"
          width={261}
          height={292}
        />

        {/* Título */}
        <h1 className="text-2xl font-bold text-black">Bem-vindo! Cadastre-se para começar</h1>

        {/* Formulário */}
        <div className="flex flex-col items-center gap-3 w-80">
              <form onSubmit={handleSubmit} className="max-w-sm mt-10">
          {/* Select movido para cima */}
          <select
            className="px-4 py-2 text-black rounded w-full outline-none bg-[#BDE3FA]"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
          >
            <option value="aluno">Sou Aluno</option>
            <option value="professor">Sou Professor</option>
            <option value="admin">Sou Administrador</option>
          </select>

          <input
            type="nome"
            placeholder="Nome completo"
            className="px-4 py-2 text-black rounded w-full outline-none input mt-2" required
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            className="px-4 py-2 text-black rounded w-full outline-none input mt-2" required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="px-4 py-2 text-black rounded w-full outline-none input mt-2" required
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            className="px-4 py-2 text-black rounded w-full outline-none input mt-2" required
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
          />
      {erro && <div className="text-red-500 mt-2">{erro}</div>}
          <button
            type="submit"
            className="btn bg-[#4A4A4A] text-white px-6 py-2 rounded w-full hover:opacity-90 mt-4"
          >
            Cadastrar
          </button>

          <div className="flex flex-col items-center gap-2 mt-2 w-full">
            <button
              onClick={() => window.location.href = '/pages/login'}
              className="text-pink-400 text-sm hover:underline"
            >
              Já tem uma conta? Entrar
            </button>
                                    
            </div>
          </form>
            <div className="flex-grow mr-2"></div>
            <span className="text-black">ou</span>
            <div className="flex-grow ml-2"></div>

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
          <Image
            src="/assets/google-play.png"
            alt="Google Play"
            className="h-10"
            width={130}
            height={80}
          />
          <Image
            src="/assets/app-store.png"
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
