"use client"

import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import {useTheme}  from '../context/ThemeContext';

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

/**
 * Componente para alterar o tema da página para o modo escuro
 * 
 * Renderiza a página para o tema escolhido (Claro ou Escuro)
 * 
 * @returns 
 */

const { toggleTheme } = useTheme();

/**
 * Redirecionar para Configurações do usuário
 * 
 * Exibe seção para alterar nome e senha.
 * 
 * @returns {JSX.Element} Página de configurações
 */

  const router = useRouter();
  
  
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

      <div className="p-4 space-y-4 text-sm">
  <button 
  type='button'
  className="w-full text-left hover:bg-[#4A4A4A] hover:bg-opacity-10 p-2 rounded cursor-pointer"
  onClick={() => router.push("/pages/configuracoes")}
  >
    🔐 Alterar senha
  </button>
  
  <button 
  type='button'
  className={`w-full text-left hover:bg-[#4A4A4A] hover:bg-opacity-10 p-2 rounded cursor-pointer`}
  onClick={toggleTheme}
  >
    🎨 Alterar tema
  </button>
  
  <button 
  type='button'
  className="w-full text-left hover:bg-[#4A4A4A] hover:bg-opacity-10 p-2 rounded cursor-pointer">
    🔔 Notificações
  </button>
  
  <button 
  type='button'
  className="w-full text-left hover:bg-[#4A4A4A] hover:bg-opacity-10 p-2 rounded cursor-pointer">
    📘 Ajuda
  </button>
  
  <button 
  type='button'
  className="w-full text-left hover:bg-[#4A4A4A] hover:bg-opacity-10 p-2 rounded cursor-pointer"
  onClick={() => router.push("/")}
  >
    🚪 Sair
  </button>
</div>

    </div>
  )
}

export default SidebarConfiguracoes
