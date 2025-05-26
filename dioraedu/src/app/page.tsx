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

      {/* Conteúdo principal centralizado */}
      <main className="flex flex-1 items-center justify-center px-4">
       <div className="relative w-full h-screen bg-white">
        <img
          src="/assets/icone-cerebro.svg"
          alt="Logo DioraEdu"
          className="
            absolute
            top-[160px]
            left-[410px]
            w-[200px]
            h-[200px]
            object-contain
          "
        />
          <div className="relative w-full h-screen bg-[#BDE3FA]">

            <p
              className="
                absolute
                top-[140px] left-[320px]
                text-[#0A2E4B]
                text-[28px]
                font-semibold
                font-['Inter']
                leading-snug
              "
            >
              Acessando a educação com criatividade!
            </p>
            <div className="flex flex-col gap-3 w-60">
              <Link href="/pages/cadastro">
              <button className="bg-[#4A4A4A] text-white w-50 h-10 rounded-lg absolute left-170 top-73">
                Comece agora
              </button>
            </Link>
              <Link href="/pages/login">
              <button className="bg-[#4A4A4A] text-white w-50 h-10 rounded-lg absolute left-170 top-60">
                Já tenho uma conta
              </button>
            </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
