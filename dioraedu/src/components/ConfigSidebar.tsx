'use client'

import React from 'react'
import { IoMdClose } from 'react-icons/io'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Sidebar de configurações
 * 
 * Exibe side bar da página de configurações
 * 
 * @param props Texto e botões de alterar senha, notificação, ajuda e sair
 */

const SidebarConfiguracoes: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-72 h-full bg-[#0A2E4B] text-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-white border-opacity-20">
        <h2 className="text-lg font-bold">⚙️ Configurações</h2>
        <button onClick={onClose}>
          <IoMdClose className="text-2xl hover:text-red-400" />
        </button>
      </div>

      <ul className="p-4 space-y-4 text-sm">
        <li className="hover:bg-[#4A4A4A] hover:bg-opacity-10 p-2 rounded cursor-pointer">🔐 Alterar senha</li>
        <li className="hover:bg-[#4A4A4A] hover:bg-opacity-10 p-2 rounded cursor-pointer">🎨 Alterar tema</li>
        <li className="hover:bg-[#4A4A4A] hover:bg-opacity-10 p-2 rounded cursor-pointer">🔔 Notificações</li>
        <li className="hover:bg-[#4A4A4A] hover:bg-opacity-10 p-2 rounded cursor-pointer">📘 Ajuda</li>
        <li className="hover:bg-[#4A4A4A] hover:bg-opacity-10 p-2 rounded cursor-pointer">🚪 Sair</li>
      </ul>
    </div>
  )
}

export default SidebarConfiguracoes
