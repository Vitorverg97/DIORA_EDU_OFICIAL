import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f7e0a1] text-[#4a4a4a] font-sans">
      {/* Topbar */}
      <header className="bg-[#0A2E4B] shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/assets/icone-cerebro.svg" alt="Logo DioraEdu" width={36} height={36} />
          <span className="font-bold text-xl text-[white]">DioraEdu</span>
        </div>
        <nav className="flex gap-6 font-semibold">
        <Link href="#sobre" className="text-white hover:text-[#f0ca51] transition-colors">Sobre</Link>
        <Link href="#beneficios" className="text-white hover:text-[#f0ca51] transition-colors">Benefícios</Link>
        <Link href="#planos" className="text-white hover:text-[#f0ca51] transition-colors">Planos</Link>
        <Link href="/pages/login" className="bg-[#4a4a4a] text-white px-4 py-2 rounded-xl shadow hover:bg-[#3b3b3b]">Entrar</Link>
      </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center bg-[#BDE3FA]">
        <h1 className="text-4xl font-bold mb-4 text-[black]">Aprender nunca foi tão divertido!</h1>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-[black]">Com o DioraEdu, você aprende Português e Matemática de forma gamificada e interativa, direto do seu celular ou computador.</p>
        <Link href="/pages/cadastro" className="bg-[#4a4a4a] border-2 border-[#4a4a4a] text-[white] font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg hover:bg-[#3b3b3b] transition">
  Comece Agora
</Link>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="px-6 py-16 bg-[#0A2E4B] text-center">
        <h2 className="text-3xl font-bold mb-10 text-[white]">Por que usar o DioraEdu?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <Image src="/assets/icone-cerebro.svg" alt="Gamificação" width={50} height={50} className="mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Gamificação</h3>
            <p>Aprenda se divertindo com desafios, recompensas e rankings!</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <Image src="/assets/Books-example.png" alt="Material didático" width={50} height={50} className="mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Conteúdo Personalizado</h3>
            <p>Aulas e exercícios adaptados ao seu nível de conhecimento.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <Image src="/assets/heart-example.png" alt="Acompanhamento" width={50} height={50} className="mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Acompanhamento</h3>
            <p>Veja sua evolução em tempo real com relatórios e estatísticas.</p>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="px-6 py-16 bg-[#BDE3FA] text-center">
        <h2 className="text-3xl font-bold mb-10 text-[#4a4a4a]">Escolha seu plano</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-[#8ED2EB] p-6 rounded-2xl shadow-md border-2 border-[#8ED2EB]">
            <h3 className="text-xl font-bold mb-2">Gratuito</h3>
            <p className="mb-4">Acesso básico às lições e estatísticas</p>
            <p className="text-2xl font-bold mb-4">R$0</p>
            <button className="bg-[#4a4a4a] text-white py-2 px-6 rounded-xl hover:bg-[#3b3b3b]">Selecionar</button>
          </div>
          <div className="bg-[#2589C5] p-6 rounded-2xl shadow-lg border-2 border-[#2589C5]">
            <h3 className="text-xl font-bold mb-2">Premium</h3>
            <p className="mb-4">Acesso completo + IA + bônus exclusivos</p>
            <p className="text-2xl font-bold mb-4">R$19,90/mês</p>
            <button className="bg-[#4a4a4a] text-white py-2 px-6 rounded-xl hover:bg-[#3b3b3b]">Selecionar</button>
          </div>
          <div className="bg-[#8ED2EB] p-6 rounded-2xl shadow-md border-2 border-[#8ED2EB]">
            <h3 className="text-xl font-bold mb-2">Para Escolas</h3>
            <p className="mb-4">Pacotes especiais para instituições de ensino</p>
            <p className="text-2xl font-bold mb-4">A combinar</p>
            <button className="bg-[#4a4a4a] text-white py-2 px-6 rounded-xl hover:bg-[#3b3b3b]">Fale Conosco</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4a4a4a] text-white px-6 py-8 text-center">
        <p className="text-sm">© 2025 DioraEdu. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
