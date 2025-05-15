'use client'
import Link from 'next/link'
import Image from 'next/image'

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <Image
          src="/assets/Capivara_de_chapeu.svg"
          alt="Capivara - mascote do DioraEDU"
          width={200}
          height={200}
        />
        <h1>Ops! Página não encontrada.</h1>
        <p> A página que você tentou acessar não existe ou foi movida.</p>
      <Link href="/" className="back-home">
        Voltar para o início
      </Link>
      </div>
      <style jsx>{`
        .notfound-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          flex-direction: column;
          background:rgb(224, 247, 250);
          text-align: center;
          padding: 2rem;
        }

        .notfound-content {
          max-width: 400px;
          color: rgb(225, 64, 129);
          margin: 0 auto;
        }

        .notfound-content :global(img) {
          display: flex;
          justfiy-content: center;
          margin: 0 auto;
          margin-bottom: 1rem:
        }

        h1 {
          font-size: 2rem;
          margin: 1rem 0;
          color: #ff4081;
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #333;
        }

        .back-home {
          display: inline-flex;
          align-items: center;
          background: #000;
          color: #fff !important; /* força a cor branca */
          padding: 0.5rem 1rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          transition: background 0.3s ease;
        }

        .back-home:hover {
          background: #333;
        }

        .back-home :global(svg) {
          margin-right: 0.5rem;
        }

      `}</style>
    </div>
  )
}

export default NotFoundPage
