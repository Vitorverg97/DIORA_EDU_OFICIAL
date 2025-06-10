# READ-ME-DIORA

# DioraEdu

DioraEdu é um projeto voltado para a área de educação, com o objetivo de facilitar e aprimorar processos educacionais por meio de uma plataforma inovadora e acessível. Embora não utilize inteligência artificial no momento, o DioraEdu foca em oferecer soluções práticas para alunos, professores e instituições.

## Visão Geral

O projeto DioraEdu busca:

- Centralizar ferramentas úteis para o aprendizado e ensino.
- Proporcionar uma interface intuitiva para os usuários.
- Oferecer uma base sólida para expansão futura, permitindo integrações adicionais.

## Funcionalidades Principais

- Gerenciamento de turmas e alunos.
- Organização de conteúdos educacionais.
- Comunicação eficiente entre professores e alunos.

## Requisitos

- **Backend:** Java (com suporte a frameworks como Spring).
- **Banco de Dados:** MySQL.
- **Interface:** Java Swing para aplicações desktop.
- **Ambiente:** JDK 17 ou superior, Maven para gerenciamento de dependências.

## Instruções de Restauração do Ambiente

1. **Clonando o Repositório**

   ```bash
   git clone https://github.com/seuusuario/DIORA_EDU_OFICIAL.git
   cd dioraedu
   ```

2. **Configurando o Banco de Dados**

   - Certifique-se de que o MySQL está instalado e rodando.
   - Crie o banco de dados com o seguinte comando:

     ```sql
     CREATE DATABASE dioraedu;
     ```

   - Importe o arquivo de dump localizado em `db/dioraedu.sql`:

     ```bash
     mysql -u seu_usuario -p dioraedu < db/dioraedu.sql
     ```

3. **Configurando o Aplicativo**

   - Atualize as configurações de conexão ao banco de dados no arquivo `src/main/resources/application.properties`:

     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/dioraedu
     spring.datasource.username=seu_usuario
     spring.datasource.password=sua_senha
     ```

4. **Compilando e Executando**

   - Compile e execute o projeto:

     ```bash
     mvn clean install
     java -jar target/dioraedu-0.1.0.jar
     ```

## Como Usar

1. **Login:**
   - Insira suas credenciais fornecidas pela administração.

2. **Gerenciamento de Turmas e Alunos:**
   - Navegue até o menu principal e escolha a opção desejada.

3. **Adição de Conteúdos:**
   - Utilize a interface para adicionar, remover ou modificar conteúdos educacionais.

4. **Comunicação:**
   - Acesse a funcionalidade de mensagens para se conectar com outros usuários.

## Futuras Melhorias

- Implementação de recursos baseados em IA para personalização do aprendizado.
- Versão web para maior acessibilidade.
- Suporte para integrações com plataformas externas.

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch para sua funcionalidade ou correção: `git checkout -b minha-feature`.
3. Envie um pull request explicando as mudanças.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
