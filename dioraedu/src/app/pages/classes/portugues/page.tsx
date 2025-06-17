'use client'

import ConfigSidebar from "@/components/ConfigSidebar";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

// Example icon imports; replace with your actual SVGs or images
import { FaChalkboardTeacher, FaTasks, FaCheck, FaTimes, FaPuzzlePiece, FaHeart, FaHome, FaUser, FaBook } from "react-icons/fa";

const PortuguesPage: React.FC = () => {
  
  const [configAberta, setConfigAberta] = useState(false)
  
  return(
  <div style={{
    minHeight: "100vh",
    background: "#d8f1ff url('/background-math-icons.png') repeat", // Replace with your own background
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
      <div style={{display: "flex", alignItems: "center"}}>
        {/* Logo */}
        <img src="/assets/icone-cerebro.svg" alt="DioraEdu" style={{height: 36, marginRight: 10}} />
        <span style={{color: "#fff", fontWeight: 700, fontSize: 20, fontFamily: "inherit"}}>DioraEdu</span>
      </div>
        {/* Sidebar de configurações */}
      <ConfigSidebar isOpen={configAberta} onClose={() => setConfigAberta(false)} />
        <button onClick={() => setConfigAberta(true)}>
                  <BsThreeDotsVertical className="text-xl cursor-pointer" />
        </button>
    </div>

    {/* Title */}
    <div style={{
      marginTop: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{fontSize: 38, color: "#254965", fontWeight: 600, margin: 0}}>
        Português
      </h1>
    </div>

    {/* Cards */}
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: 48,
      gap: 28,
      flexWrap: "wrap"
    }}>
      {/* Aula + Atividade */}
      <div style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 8px #0001",
        minWidth: 270,
        maxWidth: 320,
        padding: "18px 12px 30px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          background: "#254965",
          color: "#fff",
          borderRadius: "10px 10px 0 0",
          padding: "8px 26px",
          fontWeight: 600,
          fontSize: 18,
          alignSelf: "stretch",
          textAlign: "center",
          marginBottom: 22
        }}>
          Aula + Atividade
        </div>
        <div style={{display: "flex", gap: 22}}>
          {/* Use your own SVGs or images here */}
          <FaChalkboardTeacher size={48} color="#4A90E2" />
          <FaTasks size={44} color="#F5A623" />
        </div>
      </div>

      {/* Aula + Exercícios de fixação */}
      <div style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 8px #0001",
        minWidth: 270,
        maxWidth: 320,
        padding: "18px 12px 30px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          background: "#254965",
          color: "#fff",
          borderRadius: "10px 10px 0 0",
          padding: "8px 14px",
          fontWeight: 600,
          fontSize: 18,
          alignSelf: "stretch",
          textAlign: "center",
          marginBottom: 22
        }}>
          Aula + Exercícios de fixação
        </div>
        <div style={{display: "flex", gap: 18, alignItems: "center"}}>
          <FaChalkboardTeacher size={48} color="#4A90E2" />
          <div style={{display: "flex", flexDirection: "column", gap: 2}}>
            <span>
              <FaCheck size={28} color="#6BC96B" />
              <FaCheck size={28} color="#6BC96B" />
              <FaTimes size={28} color="#F65C5C" />
            </span>
          </div>
        </div>
      </div>

      {/* Desafios */}
      <div style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 8px #0001",
        minWidth: 270,
        maxWidth: 320,
        padding: "18px 12px 30px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          background: "#254965",
          color: "#fff",
          borderRadius: "10px 10px 0 0",
          padding: "8px 44px",
          fontWeight: 600,
          fontSize: 18,
          alignSelf: "stretch",
          textAlign: "center",
          marginBottom: 22
        }}>
          Desafios <span role="img" aria-label="alvo" style={{marginLeft: 5}}>🎯</span>
        </div>
        <div style={{display: "flex", gap: 32}}>
          <FaPuzzlePiece size={48} color="#FFC93C" />
          <FaHeart size={44} color="#F65C5C" />
        </div>
      </div>
    </div>

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
  )
}

export default PortuguesPage;
