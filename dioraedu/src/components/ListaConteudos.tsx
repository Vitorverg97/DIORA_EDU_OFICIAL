// ListaConteudos.tsx
'use client'

import React, { useEffect, useState } from 'react';

interface Conteudo {
  id: number;
  titulo: string;
  descricao?: string;
  tipo: string;
  dataCriacao: string;
}

interface ListaConteudosProps {
  onEditar: (id: number) => void;
  onDeletar: (id: number) => void;
}

const ListaConteudos: React.FC<ListaConteudosProps> = ({ onEditar, onDeletar }) => {
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchConteudos = async () => {
      const res = await fetch('/api/conteudos');
      const data = await res.json();
      setConteudos(data);
      setCarregando(false);
    };
    fetchConteudos();
  }, []);

  if (carregando) return <p className="text-center mt-6">Carregando conteúdos...</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-8 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-[#0A2E4B] mb-4">📋 Conteúdos Cadastrados</h2>
      <table className="w-full text-left border">
        <thead className="bg-gray-200 text-[#0A2E4B]">
          <tr>
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Criado em</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {conteudos.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="p-2 border font-medium">{c.titulo}</td>
              <td className="p-2 border">{c.tipo}</td>
              <td className="p-2 border">{new Date(c.dataCriacao).toLocaleDateString()}</td>
              <td className="p-2 border flex gap-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => onEditar(c.id)}
                >
                  ✏️
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDeletar(c.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaConteudos;
