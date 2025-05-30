"use client"

import React, { useState } from 'react'
import { BsUpload, BsTrash } from 'react-icons/bs'

const LancarAula: React.FC = () => {
  const [arquivos, setArquivos] = useState<File[]>([])
  const [obrigatoria, setObrigatoria] = useState(false)

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const novos = Array.from(e.target.files)
      setArquivos([...arquivos, ...novos])
    }
  }

  const removerArquivo = (index: number) => {
    const novaLista = arquivos.filter((_, i) => i !== index)
    setArquivos(novaLista)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#BDE3FA] font-sans px-6 py-8">
      <h1 className="text-2xl font-bold text-[#0A2E4B] mb-6 text-center">📚 Lançar Nova Aula</h1>

      <form className="bg-white shadow-md border border-[#52483a] rounded-xl p-6 flex flex-col gap-5 max-w-2xl mx-auto">

        {/* Título */}
        <div>
          <label className="text-[#0A2E4B] font-semibold">Título da Aula:</label>
          <input type="text" placeholder="Digite o título"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
        </div>

        {/* Descrição */}
        <div>
          <label className="text-[#0A2E4B] font-semibold">Descrição:</label>
          <textarea placeholder="Escreva uma breve descrição da aula"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 h-24" />
        </div>

        {/* Turma/Disciplina */}
        <div>
          <label className="text-[#0A2E4B] font-semibold">Turma/Disciplina:</label>
          <select className="w-full border border-gray-300 rounded-lg p-2 mt-1">
            <option value="">Selecione...</option>
            <option value="7A">7º Ano A - Matemática</option>
            <option value="9B">9º Ano B - Português</option>
          </select>
        </div>

        {/* Data e hora */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-[#0A2E4B] font-semibold">Data:</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
          </div>
          <div className="flex-1">
            <label className="text-[#0A2E4B] font-semibold">Hora:</label>
            <input type="time" className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
          </div>
        </div>

        {/* Link externo */}
        <div>
          <label className="text-[#0A2E4B] font-semibold">Link da aula (Zoom, Meet, etc.):</label>
          <input type="url" placeholder="https://meet.google.com/abc-defg-hij"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
        </div>

        {/* Obrigatória */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={obrigatoria}
            onChange={(e) => setObrigatoria(e.target.checked)}
            className="w-5 h-5 accent-[#52483a]"
          />
          <label className="text-[#0A2E4B] font-semibold">Aula obrigatória</label>
        </div>

        {/* Upload múltiplo */}
        <div>
          <label className="text-[#0A2E4B] font-semibold">Anexar Arquivos:</label>
          <label className="cursor-pointer flex items-center gap-2 text-white bg-[#52483a] px-4 py-2 rounded-lg shadow-md mt-2 w-max hover:bg-[#3d3a2f] transition">
            <BsUpload className="text-lg" />
            <span>Selecionar Arquivos</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFiles}
            />
          </label>
          {/* Lista dos arquivos */}
          <ul className="mt-3 space-y-2">
            {arquivos.map((file, index) => (
              <li key={index} className="bg-gray-100 px-3 py-2 rounded flex justify-between items-center text-sm">
                {file.name}
                <button onClick={() => removerArquivo(index)} className="text-red-600 hover:text-red-800 transition">
                  <BsTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Botões */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-[#0A2E4B] font-bold px-6 py-2 rounded-lg shadow-md transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-[#0A2E4B] hover:bg-[#16466f] text-white font-bold px-6 py-2 rounded-lg shadow-md transition"
          >
            Publicar Aula
          </button>
        </div>
      </form>
    </div>
  )
}

export default LancarAula
