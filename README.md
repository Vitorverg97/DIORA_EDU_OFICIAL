# DioraEDU

**DioraEDU** é uma plataforma educacional inovadora que busca facilitar e aprimorar os processos de ensino e aprendizagem, oferecendo ferramentas acessíveis para alunos, professores e instituições. O projeto foi idealizado como uma solução institucional com foco em usabilidade, integração e organização de conteúdos educacionais.

> Embora não utilize inteligência artificial neste momento, o projeto está estruturado para futuras expansões tecnológicas.

## 🚀 Visão Geral

O DioraEDU tem como objetivo:

* Centralizar recursos educacionais em uma única plataforma.
* Proporcionar uma interface amigável e moderna para os usuários.
* Oferecer uma base técnica sólida com possibilidade de crescimento e integração com novas tecnologias.

## 🧩 Funcionalidades Principais

* Cadastro e autenticação de usuários com base no tipo (aluno, professor, instituição).
* Gerenciamento de cursos, turmas, conteúdos e atividades.
* Acompanhamento de desempenho de alunos e feedback por professores.
* Comunicação e organização interna entre os participantes da instituição.

## 🛠️ Tecnologias Utilizadas

* **Front-end:** [Next.js (App Router)](https://nextjs.org/) com TypeScript e TailwindCSS.
* **Back-end:** [Node.js](https://nodejs.org/) com [Express.js](https://expressjs.com/) e [Prisma ORM](https://www.prisma.io/).
* **Banco de Dados:** MySQL.
* **ORM:** Prisma.
* **Ambiente:** Node.js 18+, npm ou yarn.

## 📦 Requisitos

* Node.js v18 ou superior
* MySQL Server
* Gerenciador de pacotes (npm ou yarn)

---

## 🧑‍💻 Como Executar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/Vitorverg97/DIORA_EDU_OFICIAL.git
cd DIORA_EDU_OFICIAL
```

### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure o Banco de Dados

1. Inicie seu MySQL Server localmente.
2. Crie o banco de dados:

```sql
CREATE DATABASE dioraedu;
```

3. Crie o arquivo `.env` na raiz do projeto e insira:

```env
DATABASE_URL="mysql://root:sua_senha@localhost:3306/dioraedu"
JWT_SECRET="NikVergara_crazyK9"
```

4. Rode as configurações do Prisma:

```bash
npx prisma generate
npx prisma db push
```

> **Observação:** O script SQL completo do projeto pode ser executado para popular tabelas iniciais. Ele está disponível na raiz do projeto como `script.sql`.

### 4. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

---

## 🧪 Como Usar

1. **Login:**

   * Acesse `/login` e insira suas credenciais.

2. **Gerenciamento de Cursos, Turmas e Atividades:**

   * Acesse a dashboard de acordo com o tipo de usuário logado (aluno, professor ou instituição).

3. **Criação de Conteúdos:**

   * Professores e instituições podem criar conteúdos, enviar links e arquivos.

4. **Resolução de Atividades:**

   * Alunos podem responder atividades com múltiplas tentativas e receber feedbacks automáticos ou personalizados.

5. **Acompanhamento de Rendimento:**

   * Através de views específicas, professores acompanham o desempenho individual e coletivo dos alunos.

---

## 🌱 Futuras Melhorias

* Implementação de algoritmos de personalização por IA.
* Integração com ferramentas externas como Google Classroom ou Microsoft Teams.
* Sistema de recomendação de atividades por perfil de aluno.
* Módulo de certificação e emissão de relatórios personalizados.

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas!

1. Faça um fork do repositório.
2. Crie uma nova branch:
   `git checkout -b minha-feature`.
3. Faça suas alterações.
4. Envie um Pull Request explicando claramente suas mudanças.

---

## 📚 Referências

* [Next.js App Router Documentation](https://nextjs.org/docs/app)
* [Prisma ORM](https://www.prisma.io/docs)
* [Express.js](https://expressjs.com/)
* [MySQL Documentation](https://dev.mysql.com/doc/)

