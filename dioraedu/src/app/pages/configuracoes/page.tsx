"use client"

import { useRouter } from 'next/navigation';

const Configuracoes: React.FC = () => {
  const router = useRouter();

/**
 * Página de Configurações do usuário
 * 
 * Exibe seções para alterar nome e senha.
 * 
 * @returns {JSX.Element} Página de configurações
 */

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black p-8 font-sans">
      {/* Título */}
      <h1 className="text-2xl font-bold mb-6">Alterar nome e senha</h1>

      {/* Seção: Alterar nome */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Nome de usuário</label>
        <input
          type="text"
          placeholder="Digite seu nome"
          className="w-full p-2 rounded border border-gray-400"
        />
      </div>

      {/* Seção: Alterar senha */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Nova senha</label>
        <input
          type="password"
          placeholder="Digite nova senha"
          className="w-full p-2 rounded border border-gray-400"
        />
      </div>

      <div className="mt-8 w-32 h-full bg-[#0A2E4B] text-white shadow-lg rounded">
        <button
        type='button'
        className="w-full text-center hover:bg-[#4A4A4A] hover:bg-opacity-10 p-2 rounded cursor-pointer"
        onClick={() => router.push("/pages/home-aluno")}
        >
        Voltar
          </button>
      </div>
    </div>
  )
}

export default Configuracoes
