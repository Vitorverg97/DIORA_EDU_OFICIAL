// DeletarConteudo.tsx
'use client'

import React from 'react';

interface DeletarConteudoProps {
  conteudoId: number;
  onClose: () => void;
}

const DeletarConteudo: React.FC<DeletarConteudoProps> = ({ conteudoId, onClose }) => {
  const deletar = async () => {
    const confirmacao = confirm('Tem certeza que deseja deletar este conteúdo?');
    if (confirmacao) {
      await fetch(`/api/conteudos/${conteudoId}`, { method: 'DELETE' });
      onClose();
    }
  };

  return (
    <div className="flex gap-2">
      <p>Deseja realmente excluir o conteúdo?</p>
      <button onClick={deletar} className="bg-red-500 text-white px-2 rounded">
        Confirmar
      </button>
      <button onClick={onClose} className="text-gray-600 underline">
        Cancelar
      </button>
    </div>
  );
};

export default DeletarConteudo;
