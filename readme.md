# DioraEDU

> Plataforma educacional gamificada para reforço de Português e Matemática, inspirada em Duolingo, Google Classroom e Microsoft Teams.

## 🚀 Objetivo

Desenvolver uma aplicação educacional que torne o aprendizado mais interativo e eficiente, focando inicialmente no ensino de Português e Matemática para alunos da educação básica.

## 📦 Tecnologias Utilizadas

### FrameWork
- Next.js / React
- Tailwind CSS

### Outros
- Git + GitHub
- VS Code

## 📁 Estrutura de Pastas

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

````


## 🧑‍💻 Equipe
- **Vítor Vieira** – Fullstack e Gestão
- **Thalys Vinícius** – Frontend
- **Giselly Luiza** – Backend e Gestão
- **Danilo da Silva** – Frontend e Design
- **Reginaldo José** – Documentação(a definir) e Testes
- **Alisson Gustavo** – Design e Testes 

## 📌 Funcionalidades previstas
- [ ] Cadastro de usuários (alunos, professores)
- [ ] CRUD de conteúdo educativo
- [ ] Sistema de gamificação (pontos, conquistas)
- [ ] Relatórios de desempenho em PDF
- [ ] Painel administrativo

## 🗂️ Como rodar o projeto localmente

```bash
git clone https://github.com/seu-usuario/DIORA_EDU_OFICIAL.git
cd dioraedu/backend
````

## ✅ Licença

Projeto acadêmico - Uso educacional apenas.

---
