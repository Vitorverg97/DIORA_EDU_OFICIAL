import Image from "next/image";
import Link from "next/link";

export default function TelaInicial() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/assets/fundo-login.png')" }}
    >
      {/* Topo com logo DioraEdu */}
      <header className="flex items-center justify-start px-6 py-4">
        <Image src="/assets/icone-cerebro.svg" alt="Logo DioraEdu" width={40} height={40} />
        <h1 className="text-2xl font-bold text-[#0A2E4B] ml-2">DioraEdu</h1>
      </header>

      {/* Conteúdo central */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          
          {/* Imagem central */}
          <Image
            src="/assets/icone-cerebro.svg"
            alt="Logo central"
            width={200}
            height={200}
            className="object-contain"
          />

          {/* Texto abaixo da imagem */}
          <p className="text-[#0A2E4B] text-[28px] font-semibold font-['Inter'] leading-snug">
            Acessando a educação com criatividade!
          </p>

          {/* Botões */}
          <div className="flex flex-col gap-3 w-60">
            <Link href="/pages/cadastro">
              <button className="w-full bg-[#4A4A4A] text-white h-10 rounded-lg hover:opacity-90 transition-all">
                Comece agora
              </button>
            </Link>

            <Link href="/pages/login">
              <button className="w-full bg-[#4A4A4A] text-white h-10 rounded-lg hover:opacity-90 transition-all">
                Já tenho uma conta
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
