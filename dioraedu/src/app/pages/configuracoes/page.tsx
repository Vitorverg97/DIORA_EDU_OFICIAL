"use client"

import React, { useState } from 'react'

const Configuracoes: React.FC = () => {
  const [temaEscuro, setTemaEscuro] = useState(false)

  const toggleTema = () => {
    setTemaEscuro(!temaEscuro)
  }

  return (
    <div className={`min-h-screen ${temaEscuro ? 'bg-[#1f2937] text-white' : 'bg-[#f0f0f0] text-black'} p-8 font-sans`}>
      {/* Título */}
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>

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

      {/* Seção: Tema */}
      <div className="mb-6 flex items-center justify-between">
        <span className="font-semibold">Tema escuro</span>
        <button
          onClick={toggleTema}
          className={`px-4 py-2 rounded ${temaEscuro ? 'bg-yellow-400 text-black' : 'bg-[#0A2E4B] text-white'} transition-all`}
        >
          {temaEscuro ? 'Desativar' : 'Ativar'}
        </button>
      </div>

      {/* Botão: Sair */}
      <button
        onClick={() => window.location.href = '/'}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-all"
      >
        Sair da conta
      </button>
    </div>
  )
}

export default Configuracoes
