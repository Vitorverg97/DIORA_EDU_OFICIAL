'use client'

import { useState } from "react";

export default function Cadastro(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    return(
    <div>
        <h1>
            Cadastre-se!
        </h1>
        <p>Nome completo: </p>
        <input type="text"
        value = {nome}
        onChange={(e) => setNome(e.target.value)}
        />
        <p>Email: </p>
        <input type="text"
        value = {email}
        onChange={(e) => setEmail(e.target.value)} />

        <p>Senha: </p>
        <input type="text"
        value={senha}
        onChange={(e) => setSenha (e.target.value)}/>

        <p>Instituição de ensino (opcional): </p>
    </div>
    )
}