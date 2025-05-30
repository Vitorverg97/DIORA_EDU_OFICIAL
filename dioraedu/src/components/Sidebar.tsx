'use client'

import React from 'react'
import { X } from 'lucide-react'
import LancarAula from './LancarAula'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
        </button>
      </div>
      <div className="overflow-y-auto h-[calc(100%-64px)] px-4 pb-6">
        <LancarAula />
      </div>
    </div>
  )
}

export default Sidebar
