"use client"

import React, { useState } from "react"
import Image from "next/image"
import { FaHome, FaUserAlt, FaHeart } from "react-icons/fa"
import { BsThreeDotsVertical } from "react-icons/bs"
import ConfigSidebar from "../../../components/ConfigSidebar" // ajuste o caminho se precisar

/**
 * Página de perfil do usuário
 * 
 * Exibe página de perfil do usuário com nome, estatístcicas de pontuação nas matérias de matemática e português e chat
 * 
 * @param {object} props
 * @param {string} props.matematica - pontuação em matemática (ex: 79 pontos)
 * @param {string} props.portugues - pontuação em português (ex: 100 pontos)
 * @returns {JSX.Element} Página de perfil do usuário
 */


const Perfil: React.FC = () => {
  const [configAberta, setConfigAberta] = useState(false)

  const stats = [
    { label: "Matemática:", value: "79pts" },
    { label: "Português:", value: "100pts" },
  ]

  return (
    <div className="min-h-screen bg-[#BDE3FA] font-sans flex flex-col">
      {/* Topbar */}
      <header className="bg-[#0A2E4B] h-12 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/icone-cerebro.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <h1 className="text-xl font-bold text-white font-comic">DioraEdu</h1>
        </div>
        <button onClick={() => setConfigAberta(true)}>
          <BsThreeDotsVertical className="text-white text-2xl cursor-pointer" />
        </button>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow flex justify-center px-16 mt-10">
        {/* Perfil */}
        <div className="flex flex-col items-center mr-20">
          <button
            disabled
            className="bg-[#4A4A4A] text-white font-bold text-2xl px-8 py-2 mb-6 rounded-lg shadow-md"
          >
            Aluno
          </button>
          <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-[#52483a] mb-4">
            <Image
              src="/assets/aluno1.png"
              alt="Perfil"
              width={208}
              height={208}
              className="object-cover"
            />
          </div>
          <div className="bg-[#52483a] text-white font-bold text-2xl px-6 py-1 rounded-xl shadow-md">
            Antonio Stark
          </div>
        </div>

        {/* Estatísticas */}
        <div className="flex flex-col items-center flex-1 max-w-md">
          <button
            disabled
            className="bg-[#4A4A4A] text-white font-bold text-lg px-9 py-2 mb-6 rounded-md shadow-md"
          >
            Estatísticas
          </button>
          <div className="bg-[#f2f2f2] border-2 border-[#52483a] rounded-xl w-full shadow-lg py-7 flex flex-col items-center">
            <span className="text-[#52483a] font-bold text-lg mb-6">
              Pontuação
            </span>
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="flex gap-6 items-center mb-4 w-full justify-center"
              >
                <span className="bg-[#4A4A4A] text-white font-bold px-4 py-1 text-sm rounded-xl w-[106px] text-center">
                  {label}
                </span>
                <span className="bg-[#4A4A4A] text-white font-bold px-4 py-1 text-sm rounded-xl w-[60px] text-center">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Chat fixo */}
      <div className="fixed right-8 bottom-20 flex flex-col items-center">
        <div className="w-[54px] h-[54px] rounded-full bg-white border-2 border-[#52483a] flex items-center justify-center shadow-md mb-2">
          <Image
            src="/assets/Chat-balloon.png"
            alt="Chat"
            width={50}
            height={55}
          />
        </div>
        <span className="bg-white text-[#52483a] font-bold px-4 py-1 border-2 border-[#52483a] rounded-xl shadow-md text-sm">
          Chat
        </span>
      </div>

      {/* Footer com ícones */}
      <footer className="bg-white py-3 flex justify-around items-center border-t">
        <button
          onClick={() => (window.location.href = "/pages/home-aluno")}
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaHome className="text-2xl text-[#0A2E4B]" />
        </button>
        <button
          onClick={() => (window.location.href = "/pages/perfil")}
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

      {/* Sidebar de Configurações */}
      <ConfigSidebar isOpen={configAberta} onClose={() => setConfigAberta(false)} />
    </div>
  )
}

export default Perfil
