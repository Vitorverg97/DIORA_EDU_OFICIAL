'use client'

import React, { useState } from 'react';
import { FaHome, FaUserAlt, FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import ConfigSidebar from '../../../components/ConfigSidebar';

/**
 * Página Inicial do usuário
 * 
 * Exibe seções como o Header, Conteúdo principal com cards das matérias, Coluna de Chat, Menu de configurações e Menu inferior
 * 
 * @returns {JSX.Element} Página Home do aluno
 */

export default function Classes() {
  const [configAberta, setConfigAberta] = useState(false);

  return (
    <div className="bg-white text-black dark:bg-[#0A2E4B] dark:text-white">
      <div className="min-h-screen bg-[#BDE3FA] text-black flex flex-col">
      {/* Barra de navegação superior */}
      <header className="bg-[#0A2E4B] text-white flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img src="/assets/icone-cerebro.svg" alt="Logo" className="h-8" />
          <h1 className="text-xl font-bold">DioraEdu</h1>
        </div>
        <button onClick={() => setConfigAberta(true)}>
          <BsThreeDotsVertical className="text-xl cursor-pointer" />
        </button>
      </header>

      {/* Conteúdo principal */}
      <div className="flex flex-1 px-6 py-4">
        {/* Seção de Classes */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">Classes</h2>
          <div className="grid grid-cols-2 gap-8">
            <DisciplinaCard
              imagemTopo="/assets/topo-matematica.png"
              titulo="Matemática"
              professor="Prof. Helena Martins"
              imagem="/assets/prof1.png"
              link="/pages/classes/matematica"
            />
            <DisciplinaCard
              imagemTopo="/assets/topo-portugues.png"
              titulo="Português"
              professor="Prof. Ricardo Almeida"
              imagem="/assets/prof2.png"
              link="/pages/classes/portugues"
            />
            <DisciplinaCard
              imagemTopo="/assets/topo-geografia.png"
              titulo="Geografia"
              professor="Prof. Cristiane Caiado"
              imagem="/assets/prof3.png"
              link="/pages/classes/geografia"
            />
            <DisciplinaCard
              imagemTopo="/assets/topo-historia.png"
              titulo="História"
              professor="Prof. Ademir Silva"
              imagem="/assets/prof4.png"
              link="/pages/classes/Historia"
            />
          </div>
        </div>

        {/* Coluna de Chat */}
        <aside className="w-80 bg-white bg-opacity-70 p-4 rounded-lg shadow ml-6">
          <h3 className="text-lg font-bold mb-3 bg-blue-700 text-white px-3 py-2 rounded">Novo Chat</h3>
          <ul className="space-y-2">
            {[
              'Caio Alexandre Vieira',
              'Reginaldo José da Silva',
              'Gabriela Maria Cristina',
              'Luana da Silva Macedo',
              'Victor Vieira de Souza'
            ].map((nome, i) => (
              <li
                key={i}
                className="bg-white rounded px-3 py-2 flex justify-between items-center shadow hover:bg-gray-100 cursor-pointer"
              >
                {nome}
                <span>➤</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Menu inferior */}
      <footer className="bg-white py-3 flex justify-around items-center border-t">
        <button
          onClick={() => window.location.href = "/pages/home-aluno"}
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaHome className="text-2xl text-[#0A2E4B]" />
        </button>
        <button
          onClick={() => window.location.href = "/pages/perfil"}
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaUserAlt className="text-2xl text-[#0A2E4B]" />
        </button>
        <FaHeart className="text-2xl text-[#0A2E4B]" />
        <div className="flex gap-2">
          <img src="/assets/google-play.png" alt="Google Play" className="h-8" />
          <img src="/assets/app-store.png" alt="App Store" className="h-8" />
        </div>
      </footer>

      {/* Menu de configurações */}
      <ConfigSidebar isOpen={configAberta} onClose={() => setConfigAberta(false)} />
    </div>
    </div>
  );
}

/**
 * 
 * Componentes do card de disciplina
 * 
 * @param {Object} props
 * @param {string} props.imagemTopo - caminho da imagem do topo
 * @param {string} props.titulo - titulo da disciplina
 * @param {string} props.professor - nome do professor
 * @param {string} props.imagem - caminho da imagem principal
 * @param {string} props.link - link de navegação
 * @returns {JSX.Element} Card de disciplina
 */

// Componente para os cards de disciplina
function DisciplinaCard({
  imagemTopo,
  titulo,
  professor,
  imagem,
  link,
}: {
  imagemTopo: string;
  titulo: string;
  professor: string;
  imagem: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <div className="w-full rounded-xl cursor-pointer transition-all duration-300">
        <div
          className="h-20 bg-cover bg-center rounded-t-xl"
          style={{ backgroundImage: `url(${imagemTopo})` }}
        ></div>
        <div className="bg-white px-3 py-6 flex justify-between items-center rounded-b-xl shadow-md hover:shadow-lg">
          <div>
            <h4 className="text-base font-bold text-[#0A2E4B]">{titulo}</h4>
            <p className="text-sm text-[#0A2E4B]">{professor}</p>
          </div>
          <img
            src={imagem}
            alt={professor}
            className="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
          />
        </div>
      </div>
    </Link>
  );
}
