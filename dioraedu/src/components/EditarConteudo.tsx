// EditarConteudo.tsx
'use client'

import React, { useEffect, useState } from 'react';

interface Conteudo {
  id: number;
  titulo: string;
  descricao?: string;
  tipo: string;
  dataCriacao: string;
}

interface EditarConteudoProps {
  conteudoId: number;
  onClose: () => void;
}

const EditarConteudo: React.FC<EditarConteudoProps> = ({ conteudoId, onClose }) => {
  const [conteudo, setConteudo] = useState<Conteudo | null>(null);
  const [titulo, setTitulo] = useState('');

  useEffect(() => {
    const fetchConteudo = async () => {
      const res = await fetch(`/api/conteudos/${conteudoId}`);
      const data = await res.json();
      setConteudo(data);
      setTitulo(data.titulo);
    };
    fetchConteudo();
  }, [conteudoId]);

  const handleSalvar = async () => {
    await fetch(`/api/conteudos/${conteudoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo }),
    });
    onClose();
  };

  if (!conteudo) return <p>Carregando conteúdo...</p>;

  return (
    <div className="flex gap-2">
      <input
        className="border rounded px-2 py-1"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <button className="bg-green-500 text-white px-2 rounded" onClick={handleSalvar}>
        Salvar
      </button>
      <button className="text-gray-600 underline" onClick={onClose}>
        Cancelar
      </button>
    </div>
  );
};

export default EditarConteudo;
