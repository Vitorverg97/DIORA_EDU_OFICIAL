'use client'

import { FaHome, FaUserAlt, FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Classes() {
  return (
    <div className="min-h-screen bg-[#BDE3FA] text-black flex flex-col">
      
      {/* Barra de navegação superior */}
      <header className="bg-[#0A2E4B] text-white flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img src="/assets/icone-cerebro.svg" alt="Logo" className="h-8" />
          <h1 className="text-xl font-bold">DioraEdu</h1>
        </div>
        <input
          type="text"
          placeholder="Buscar..."
          className="rounded px-3 py-1 text-white w-1/3"
        />
        <BsThreeDotsVertical className="text-xl cursor-pointer" />
      </header>

      {/* Conteúdo principal */}
      <div className="flex flex-1 px-6 py-4">
        {/* Seção de Classes */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">Classes</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Cartões de disciplinas */}
            <DisciplinaCard
              cor="bg-[#92D050]"
              titulo="Matemática"
              professor="Prof. Helena Martins"
              imagem="/assets/prof1.png"
            />
            <DisciplinaCard
              cor="bg-[#D9006C]"
              titulo="Português"
              professor="Prof. Ricardo Almeida"
              imagem="/assets/prof2.png"
            />
            <DisciplinaCard
              cor="bg-[#00B050]"
              titulo="Geografia"
              professor="Prof. Cristiane Calado"
              imagem="/assets/prof3.png"
            />
            <DisciplinaCard
              cor="bg-[#FFC000]"
              titulo="História"
              professor="Prof. Ademir Silva"
              imagem="/assets/prof4.png"
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
              <li key={i} className="bg-white rounded px-3 py-2 flex justify-between items-center shadow hover:bg-gray-100 cursor-pointer">
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
    onClick={() => window.location.href = "/pages/home"}
    className="hover:scale-120 transition-transform duration-200"
  >
    <FaHome className="text-2xl text-[#0A2E4B]" />
  </button>
  <button
    onClick={() => window.location.href = "/pages/perfil"}
    className="hover:scale-120 transition-transform duration-200"
  >
    <FaUserAlt className="text-2xl text-[#0A2E4B]" />
  </button>
  <FaHeart className="text-2xl text-[#0A2E4B]" />
  <div className="flex gap-2">
    <img src="/assets/google-play.png" alt="Google Play" className="h-8" />
    <img src="/assets/app-store.png" alt="App Store" className="h-8" />
  </div>
</footer>
    </div>
  );
}

// Componente para os cards de disciplina
function DisciplinaCard({ cor, titulo, professor, imagem }: { cor: string, titulo: string, professor: string, imagem: string }) {
  return (
    <div className={`p-4 rounded-xl shadow flex justify-between items-center ${cor}`}>
      <div>
        <h4 className="text-xl font-bold text-white">{titulo}</h4>
        <p className="text-white text-sm">{professor}</p>
      </div>
      <img src={imagem} alt={professor} className="h-12 w-12 rounded-full object-cover" />
    </div>
  );
}
