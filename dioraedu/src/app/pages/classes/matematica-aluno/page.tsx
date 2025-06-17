'use client'

import React, { useEffect, useState } from 'react';

type Conteudo = {
  id: number;
  titulo: string;
  descricao: string;
  createdAt?: string;
  dataCriacao?: string;
};

export default function AlunoMat() {
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [serverTime, setServerTime] = useState<string>("");

  useEffect(() => {
    const fetchConteudos = async () => {
      try {
        const res = await fetch("/api/conteudos");
        const data = await res.json();

        if (Array.isArray(data.conteudos)) {
          setConteudos(data.conteudos);
        } else {
          console.error("Resposta inesperada:", data);
        }

        if (data.serverTime) {
          setServerTime(data.serverTime);
        }
      } catch (error) {
        console.error("Erro ao buscar conteúdos:", error);
      }
    };

    fetchConteudos();
  }, []);

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "Sem data";
    const data = new Date(isoDate);
    return data.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <div className="p-4 min-h-screen" style={ {backgroundColor: '#A7E7F2'} }>
      <h1 className="text-2xl font-bold text-black mb-4">Conteúdos disponíveis</h1>
      <p className="text-sm text-gray-600 mb-4">Data do servidor: {formatDate(serverTime)}</p>

      {conteudos.length === 0 ? (
        <p className="text-white-500">Nenhum conteúdo encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {conteudos.map((c) => (
            <li key={c.id} className="bg-white shadow rounded p-4">
              <h2 className="font-semibold text-black text-lg">{c.titulo}</h2>
              <p className="text-sm text-gray-600">{c.descricao}</p>
              <p className="text-xs text-black mt-2">
                Criado em: {formatDate(c.dataCriacao ?? c.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
