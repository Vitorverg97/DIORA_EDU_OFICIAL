'use client'

import React, { useState } from "react";
import { FaHeart, FaHome, FaUser, FaBook, FaSearch, FaBars } from "react-icons/fa";
import LancarAula from "@/components/LancarAula";
import ListaConteudos from "@/components/ListaConteudos";
import EditarConteudo from "@/components/EditarConteudo";
import DeletarConteudo from "@/components/DeletarConteudo";

const MatematicaPage: React.FC = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editarId, setEditarId] = useState<number | null>(null);
  const [deletarId, setDeletarId] = useState<number | null>(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#d8f1ff url('/background-math-icons.png') repeat",
      fontFamily: "inherit",
      position: "relative"
    }}>
      {/* Top Bar */}
      <div style={{
        background: "#254965",
        display: "flex",
        alignItems: "center",
        padding: "12px 20px",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/assets/icone-cerebro.svg" alt="DioraEdu" style={{ height: 36, marginRight: 10 }} />
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 20, fontFamily: "inherit" }}>DioraEdu</span>
        </div>
        <div style={{ flex: 1, margin: "0 30px" }}>
          <input
            type="text"
            placeholder=""
            style={{
              width: "100%",
              borderRadius: 18,
              border: "none",
              height: 30,
              padding: "0 18px",
              outline: "none"
            }}
          />
        </div>
        <div>
          <FaSearch color="#fff" size={20} style={{ marginRight: 14 }} />
          <FaBars color="#fff" size={22} />
        </div>
      </div>

      {/* Title */}
      <div style={{
        marginTop: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <span style={{
          background: "#FFB92C",
          borderRadius: 4,
          padding: "2px 10px",
          marginRight: 14,
          fontWeight: 700,
          color: "#254965",
          fontFamily: "monospace"
        }}>
          X+Y=Z
        </span>
        <h1 style={{ fontSize: 38, color: "#254965", fontWeight: 600, margin: 0 }}>
          Matemática
        </h1>
      </div>

      {/* CRUD Ações */}
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={{
            background: "#254965",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 6,
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {mostrarFormulario ? "Fechar Formulário" : "Nova Aula (Conteúdo)"}
        </button>
      </div>

      {mostrarFormulario && (
        <div style={{ marginTop: 30 }}>
          <LancarAula cursoId={1} tipo="leitura" />
        </div>
      )}

      <div style={{ marginTop: 40, padding: "0 20px" }}>
        <ListaConteudos onEditar={setEditarId} onDeletar={setDeletarId} />
      </div>

      {editarId && (
        <EditarConteudo conteudoId={editarId} onClose={() => setEditarId(null)} />
      )}

      {deletarId && (
        <DeletarConteudo conteudoId={deletarId} onClose={() => setDeletarId(null)} />
      )}

      {/* Bottom Nav */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#fff",
        boxShadow: "0 -2px 10px #0002",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0",
        zIndex: 10
      }}>
        <FaHome size={28} color="#254965" />
        <FaUser size={28} color="#254965" />
        <FaBook size={28} color="#254965" />
        <FaHeart size={28} color="#F65C5C" />
      </div>
    </div>
  );
};

export default MatematicaPage;
