# DioraEDU

> A gamified educational platform for reinforcing Portuguese and Math skills, inspired by Duolingo, Google Classroom, and Microsoft Teams.

## 🚀 Objective

To develop an educational application that makes learning more interactive and effective, initially focusing on teaching Portuguese and Math to elementary school students.

## 📦 Technologies Used

### Framework
- Next.js / React
- Tailwind CSS

### Others
- Git + GitHub
- VS Code

## 📁 Initial Folder Structure

```markdown
/dioraedu
├── /node_modules
├── /public
│   └── /assets              # Imagens, ícones, etc.
├── /src
│   ├── /app (ou /pages)     # Rotas da aplicação (usar /pages se não usar App Router)
│   │   ├── /api
│   │   │   ├── /auth        # Login, logout, registro
│   │   │   ├── /usuarios    # CRUD de usuários
│   │   │   ├── /cursos      # CRUD de cursos
│   │   │   ├── /conteudos   # CRUD de conteúdos
│   │   │   ├── /atividades  # CRUD de atividades
│   │   │   ├── /matriculas  # Matrículas de alunos
│   │   │   └── /feedbacks   # Envio e leitura de feedbacks
│   │   ├── /login           # Tela de login
│   │   ├── /dashboard       # Redireciona para a home do aluno, prof ou admin
│   │   ├── /cursos          # Listagem geral dos cursos
│   │   ├── /cursos/[id]     # Detalhes de curso (com conteúdos)
│   │   ├── /conteudos/[id]  # Visualização de conteúdo (e tentativas/feedback)
│   │   └── index.tsx        # Página inicial
│   ├── /components
│   │   ├── Layout.tsx       # Layout base (navbar, footer, etc.)
│   │   ├── CursoCard.tsx    # Exibe um curso
│   │   ├── ConteudoItem.tsx # Exibe conteúdo
│   │   └── etc...
│   ├── /lib
│   │   ├── prisma.ts        # Instância compartilhada do Prisma Client
│   │   └── auth.ts          # Funções de login/autenticação
│   ├── /hooks               # Hooks customizados
│   ├── /styles              # CSS/Tailwind ou arquivos SCSS
│   └── /utils               # Funções utilitárias (validações, formatações, etc.)
├── .env                     # Variáveis de ambiente (banco de dados, JWT, etc.)
├── prisma
│   └── schema.prisma        # Modelos do banco (equivale ao SQL)
├── tsconfig.json
├── package.json
└── README.md

```

## 🧑‍💻 Team
- **Vítor Vieira** – Fullstack & Project Management
- **Thalys Vinícius** – Frontend
- **Giselly Luiza** – Backend & Management
- **Danilo da Silva** – Frontend & Design
- **Reginaldo José** – Documentation (TBD) & Testing
- **Alisson Gustavo** – Design & Testing

## 📌 Planned Features
- [ ] User registration (students, teachers)
- [ ] Educational content CRUD
- [ ] Gamification system (points, achievements)
- [ ] Performance reports in PDF
- [ ] Admin dashboard

## 🗂️ How to run the project locally

```bash
git clone https://github.com/your-username/DIORA_EDU_OFICIAL.git
cd dioraedu/backend
```

## ✅ License

Academic project - Educational use only.

---
