'use client'

import React, { useState } from 'react'
import { BsUpload, BsTrash } from 'react-icons/bs'

interface LancarAulaProps {
  cursoId: number
  tipo: string
}

const LancarAula: React.FC<LancarAulaProps> = ({ cursoId, tipo }) => {
  const [arquivos, setArquivos] = useState<File[]>([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [linkExterno, setLinkExterno] = useState('')
  const [obrigatoria, setObrigatoria] = useState(false)

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const novosArquivos = Array.from(e.target.files)
      setArquivos(prev => [...prev, ...novosArquivos])
    }
  }

  const removerArquivo = (index: number) => {
    setArquivos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/conteudos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          descricao,
          cursoId,
          tipo,
          urlArquivo: linkExterno || null,
          obrigatoria,
          dataCriacao: new Date(),
          ultimaAtualizacao: new Date(),
        }),
      })

      if (!response.ok) throw new Error('Erro ao publicar aula.')

      alert('Aula publicada com sucesso!')

      // Resetar formulário
      setTitulo('')
      setDescricao('')
      setData('')
      setHora('')
      setLinkExterno('')
      setObrigatoria(false)
      setArquivos([])
    } catch (err) {
      console.error(err)
      alert('Falha ao publicar aula.')
    }
  }

  return (
    <div className="bg-[#BDE3FA] font-sans px-4 py-6">
      <h1 className="text-xl font-bold text-[#0A2E4B] mb-4 text-center">📚 Lançar Nova Aula</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md border border-[#52483a] rounded-xl p-4 flex flex-col gap-4 max-w-3xl mx-auto">
        {/* Título */}
        <div>
          <label htmlFor="titulo" className="text-[#0A2E4B] font-semibold">Título da Aula:</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título"
            className="w-full text-[#0A2E4B] border border-gray-300 rounded-lg p-2 mt-1"
            required
          />
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="descricao" className="text-[#0A2E4B] font-semibold">Descrição:</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Escreva uma breve descrição da aula"
            className="w-full text-[#0A2E4B] border border-gray-300 rounded-lg p-2 mt-1 h-24"
          />
        </div>

        {/* Data e Hora */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1">
            <label htmlFor="data" className="text-[#0A2E4B] font-semibold">Data:</label>
            <input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full border text-[#0A2E4B] border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="hora" className="text-[#0A2E4B] font-semibold">Hora:</label>
            <input
              id="hora"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full border text-[#0A2E4B] border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>
        </div>

        {/* Tipo */}
        <div>
          <label className="text-[#0A2E4B] font-semibold">Tipo de Conteúdo:</label>
          <p className="text-[#0A2E4B]">{tipo}</p>
        </div>

        {/* Link */}
        <div>
          <label htmlFor="link" className="text-[#0A2E4B] font-semibold">Link da aula (Zoom, Meet, etc.):</label>
          <input
            id="link"
            type="url"
            value={linkExterno}
            onChange={(e) => setLinkExterno(e.target.value)}
            placeholder="https://meet.google.com/abc-defg-hij"
            className="w-full border text-[#0A2E4B] border-gray-300 rounded-lg p-2 mt-1"
          />
        </div>

        {/* Obrigatória */}
        <div className="flex items-center gap-2">
          <input
            id="obrigatoria"
            type="checkbox"
            checked={obrigatoria}
            onChange={(e) => setObrigatoria(e.target.checked)}
            className="w-5 h-5 accent-[#52483a]"
          />
          <label htmlFor="obrigatoria" className="text-[#0A2E4B] font-semibold">Aula obrigatória</label>
        </div>

        {/* Anexar Arquivos */}
        <div>
          <label className="text-[#0A2E4B] font-semibold">Anexar Arquivos:</label>
          <label className="cursor-pointer flex items-center gap-2 text-white bg-[#52483a] px-4 py-2 rounded-lg shadow-md mt-2 w-max hover:bg-[#3d3a2f] transition">
            <BsUpload className="text-lg" />
            <span>Selecionar Arquivos</span>
            <input type="file" multiple className="hidden" onChange={handleFiles} />
          </label>

          {arquivos.length > 0 && (
            <ul className="mt-2 space-y-2">
              {arquivos.map((file, index) => (
                <li
                  key={index}
                  className="bg-gray-100 px-3 py-2 rounded flex justify-between items-center text-sm"
                >
                  {file.name}
                  <button
                    type="button"
                    onClick={() => removerArquivo(index)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <BsTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Botão de envio */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-[#0A2E4B] hover:bg-[#16466f] text-white font-bold px-5 py-2 rounded-lg shadow-md transition"
          >
            Publicar Aula
          </button>
        </div>
      </form>
    </div>
  )
}

export default LancarAula
