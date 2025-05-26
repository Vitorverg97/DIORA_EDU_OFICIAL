import React from "react";

const colors = {

  background: "#FFFFFF", // branco

  primary: "#1A3A4F",   // azul escuro

  accent: "#8ED2EB",    // azul claro

};
 
export default function LandingPage() {

  return (
<div

      style={{

        minHeight: "100vh",

        background: `linear-gradient(135deg, ${colors.background} 60%, ${colors.accent} 100%)`,

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        justifyContent: "center",

        fontFamily: "Inter, Arial, Helvetica, sans-serif",

      }}
>
<div

        style={{

          background: "/assets/fundo-login.png",

          borderRadius: 24,

          boxShadow: "0 4px 24px rgba(26, 58, 79, 0.14)",

          padding: "48px 32px",

          maxWidth: 420,

          width: "100%",

          textAlign: "center",

        }}
>
   
<h1

          style={{

            color: colors.primary,

            marginBottom: 8,

            fontSize: "2.6rem",

            letterSpacing: 1,

            fontWeight: 700,

          }}
>

          DioraEDU
</h1>
<p

          style={{

            color: colors.primary,

            marginBottom: 32,

            fontSize: "1.15rem",

            fontWeight: 400,

          }}
>

          Aprenda, evolua e transforme seu futuro com o DioraEDU.
</p>
<div style={{ display: "flex", gap: 16, justifyContent: "center" }}>

<a href="pages/login"
  
  
                style={{
  
                  background: colors.primary,
  
                  color: colors.background,
  
                  padding: "12px 32px",
  
                  borderRadius: 8,
  
                  textDecoration: "none",
  
                  fontWeight: 600,
  
                  fontSize: "1rem",
  
                  transition: "background 0.2s",
  
                  border: `2px solid ${colors.primary}`,
  
                }}
  >
                Login
  
</a>

<a href="pages/cadastro"

              style={{

                background: colors.accent,

                color: colors.primary,

                padding: "12px 32px",

                borderRadius: 8,

                textDecoration: "none",

                fontWeight: 600,

                fontSize: "1rem",

                border: `2px solid ${colors.accent}`,

                transition: "background 0.2s",

              }}
>
              Cadastro
</a>
</div>
</div>
</div>

  );

}
 