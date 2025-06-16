-- =============================
-- BANCO DE DADOS: DioraEDU
-- =============================

create database dioraedu;
use dioraedu;

-- Tabela de instituições parceiras (premium)
 CREATE TABLE instituicao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    dominioEmail VARCHAR(100) UNIQUE,
    cnpj VARCHAR(18) UNIQUE,
    emailContato VARCHAR(150),
    telefoneContato VARCHAR(20),
    status ENUM('ativa', 'inativa') DEFAULT 'ativa',
    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de usuários
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senhaHash VARCHAR(255) NOT NULL,
    perfil ENUM('aluno', 'professor', 'admin') NOT NULL,
    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Alunos (freemium ou ligados a instituição)
CREATE TABLE alunos (
    usuarioId INT PRIMARY KEY,
    freemium BOOLEAN NOT NULL DEFAULT TRUE,
    instituicaoId INT NOT NULL,
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (instituicaoId) REFERENCES instituicoes(id)
);

-- Professores (sempre ligados a instituição)
CREATE TABLE professores (
    usuario_id INT PRIMARY KEY,
    liberado BOOLEAN NOT NULL DEFAULT FALSE,
    instituicao_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id)
);

-- Administradores (sempre ligados a instituição)
CREATE TABLE administradores (
    usuarioId INT PRIMARY KEY,
    instituicaoId INT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
	criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuarioId) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (instituicaoId) REFERENCES instituicao(id)
);

-- Cursos
CREATE TABLE curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Professor_cursos
CREATE TABLE professorCurso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    professorId INT NOT NULL,
    cursoId INT NOT NULL,
    dataAtribuicao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (professorId) REFERENCES professores(usuarioId) ON DELETE CASCADE,
    FOREIGN KEY (cursoId) REFERENCES curso(id) ON DELETE CASCADE,
    UNIQUE (professorId, cursoId) -- evita duplicações
);


-- Matrículas
CREATE TABLE matricula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alunoId INT NOT NULL,
    cursoId INT NOT NULL,
    dataMatricula DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativa', 'concluida', 'cancelada') DEFAULT 'ativa',    
    notaFinal DECIMAL(5,2),
    certificadoEmitido BOOLEAN DEFAULT FALSE,
    
    CONSTRAINT fk_matricula_aluno FOREIGN KEY (alunoId) REFERENCES aluno(usuarioId) ON DELETE CASCADE,
    CONSTRAINT fk_matricula_curso FOREIGN KEY (cursoId) REFERENCES curso(id) ON DELETE CASCADE, 
    UNIQUE (alunoId, cursoId)
);

-- Conteúdos
CREATE TABLE conteudo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cursoId INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    tipo ENUM('video', 'leitura', 'quiz', 'simulado', 'pdf', 'audio', 'desafio') NOT NULL,
    urlArquivo TEXT,
    ordem INT DEFAULT 0,
	ativo BOOLEAN DEFAULT TRUE,
    dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultimaAtualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cursoId) REFERENCES curso(id) ON DELETE CASCADE
);

-- Visualizações do conteúdo
CREATE TABLE visualizacoesConteudo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alunoId INT NOT NULL,
    conteudoId INT NOT NULL,
    dataVisualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (alunoId, conteudoId),
    FOREIGN KEY (alunoId) REFERENCES aluno(usuarioId) ON DELETE CASCADE,
    FOREIGN KEY (conteudoId) REFERENCES conteudo(id) ON DELETE CASCADE
);

-- Atividades
CREATE TABLE atividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conteudoId INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    enunciado TEXT NOT NULL,
    tipo ENUM('objetiva', 'discursiva', 'múltipla_escolha') DEFAULT 'objetiva',
    peso DECIMAL(4,2) DEFAULT 1.00,
    ativo BOOLEAN DEFAULT TRUE,
    dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conteudoId) REFERENCES conteudo(id) ON DELETE CASCADE
);

-- Tentativas
CREATE TABLE tentativa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    atividadeId INT NOT NULL,
    alunoId INT NOT NULL,
    resposta TEXT,
    pontuacao DECIMAL(4,2) DEFAULT 0.00,
    dataTentativa DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (atividadeId) REFERENCES atividade(id) ON DELETE CASCADE,
    FOREIGN KEY (alunoId) REFERENCES aluno(usuarioId) ON DELETE CASCADE
);

-- Feedbacks dos professores
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tentativaId INT NOT NULL,
    professorId INT NOT NULL,
    mensagem TEXT NOT NULL,
    dataFeedback DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tentativaId) REFERENCES tentativa(id) ON DELETE CASCADE,
    FOREIGN KEY (professorId) REFERENCES professore(usuarioId) ON DELETE CASCADE
);

-- Tabela de turmas
CREATE TABLE turma (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cursoId INT NOT NULL,
    professorId INT NOT NULL,
    instituicaoId INT,
    dataInicio DATE,
    dataFim DATE,
    FOREIGN KEY (cursoId) REFERENCES curso(id) ON DELETE CASCADE,
    FOREIGN KEY (professorId) REFERENCES professores(usuarioId) ON DELETE CASCADE,
    FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id)
);

-- Associação entre alunos e turmas
CREATE TABLE turmaAlunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turma_id INT NOT NULL,
    aluno_id INT NOT NULL,
    data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
    FOREIGN KEY (aluno_id) REFERENCES alunos(usuario_id) ON DELETE CASCADE
);

-- conversas
CREATE TABLE conversa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150), -- Usado em grupos (ex: "Turma 3A - Matemática")
    tipo ENUM('privada', 'grupo') NOT NULL,
    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- conversa do participantes
CREATE TABLE conversaParticipante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversaId INT NOT NULL,
    usuarioId INT NOT NULL,
    adicionadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversaId) REFERENCES conversa(id) ON DELETE CASCADE,
    FOREIGN KEY (usuarioId) REFERENCES usuario(id) ON DELETE CASCADE,
    UNIQUE (conversaId, usuarioId)
);

-- mensagens
CREATE TABLE mensagen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversaId INT NOT NULL,
    remetenteId INT NOT NULL,
    conteudo TEXT NOT NULL,
    dataEnvio DATETIME DEFAULT CURRENT_TIMESTAMP,
    editada BOOLEAN DEFAULT FALSE,
    deletada BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (conversaId) REFERENCES conversa(id) ON DELETE CASCADE,
    FOREIGN KEY (remetenteId) REFERENCES usuario(id) ON DELETE CASCADE,
    INDEX idx_conversa_envio (conversa_id, data_envio)
);

-- Mensagens_lidas
CREATE TABLE mensagemLida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensagemId INT NOT NULL,
    usuarioId INT NOT NULL,
    dataLeitura DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mensagemId) REFERENCES mensagen(id) ON DELETE CASCADE,
    FOREIGN KEY (usuarioId) REFERENCES usuario(id) ON DELETE CASCADE,
    UNIQUE (mensagemId, usuarioId)
);


-- Views
CREATE OR REPLACE VIEW vw_alunos_matriculados AS
SELECT 
    u.id AS usuario_id, 
    u.nome AS aluno, 
    u.email, 
    c.nome AS curso, 
    m.dataMatricula, 
    m.status
FROM usuario u
JOIN alunos a ON u.id = a.usuarioId
JOIN matricula m ON m.alunoId = a.usuarioId
JOIN curso c ON c.id = m.cursoId;

CREATE OR REPLACE VIEW vw_tentativas_com_feedback AS
SELECT 
    t.id AS tentativaId,
    u.nome AS aluno, 
    a.titulo AS atividade, 
    t.resposta, 
    t.pontuacao AS nota,
    f.mensagem AS comentario,
    up.nome AS professor
FROM tentativa t
JOIN usuario u ON u.id = t.alunoId
JOIN atividade a ON a.id = t.atividadeId
LEFT JOIN feedback f ON f.tentativaId = t.id
LEFT JOIN usuario up ON up.id = f.professorId;

CREATE OR REPLACE VIEW vw_professores_conteudos AS
SELECT p.usuarioId AS professorId, u.nome AS professorNome, c.nome AS curso, ct.titulo AS conteudo, ct.tipo
FROM professores p
JOIN usuario u ON u.id = p.usuarioId
JOIN curso c ON 1=1
JOIN conteudo ct ON ct.cursoId = c.id;

CREATE OR REPLACE VIEW vw_professores_cursos AS
SELECT p.usuarioId, u.nome AS professor, c.nome AS curso, pc.dataAtribuicao
FROM professorcurso pc
JOIN professores p ON pc.professorId = p.usuarioId
JOIN usuario u ON u.id = p.usuarioId
JOIN curso c ON pc.cursoId = c.id;

-- View para listar turmas com seus alunos
CREATE OR REPLACE VIEW vw_turmas_alunos AS
SELECT t.id AS turma_id, t.nome AS turma, u.nome AS aluno, u.email, c.nome AS curso, t.dataInicio, t.dataFim
FROM turmaaluno ta
JOIN turma t ON ta.turmaId = t.id
JOIN alunos a ON ta.alunoId = a.usuarioId
JOIN usuario u ON a.usuarioId = u.id
JOIN curso c ON t.cursoId = c.id;

-- View para painel do professor
CREATE OR REPLACE VIEW progresso_atividade AS
SELECT 
    a.usuarioId AS aluno_id,
    u.nome AS aluno_nome,
    c.id AS conteudo_id,
    c.titulo AS conteudo_titulo,
    vc.dataVisualizacao AS visualizou_em,
    COUNT(t.id) AS tentativas_feitas,
    MAX(t.pontuacao) AS melhor_nota
FROM alunos a
JOIN usuario u ON u.id = a.usuarioId
JOIN matricula m ON m.alunoId = a.usuarioId
JOIN conteudo c ON c.cursoId = m.cursoId
LEFT JOIN visualizacaoconteudo vc ON vc.alunoId = a.usuarioId AND vc.conteudoId = c.id
LEFT JOIN atividade atv ON atv.conteudoId = c.id
LEFT JOIN tentativa t ON t.atividadeId = atv.id AND t.alunoId = a.usuarioId
GROUP BY 
    a.usuarioId, 
    u.nome,
    c.id, 
    c.titulo,
    vc.dataVisualizacao;

-- Triggers
DELIMITER $$
CREATE TRIGGER trg_definir_freemium
BEFORE INSERT ON alunos
FOR EACH ROW
BEGIN
    DECLARE emailUsuario VARCHAR(150);
    SELECT email INTO emailUsuario FROM usuario WHERE id = NEW.usuarioId;
    IF email_usuario NOT LIKE '%@instituicao.edu%' THEN
        SET NEW.freemium = TRUE;
    END IF;
END$$
DELIMITER ;

-- Índices adicionais
CREATE INDEX idx_conteudos_curso_id ON conteudo(cursoId);
CREATE INDEX idx_atividades_conteudo_id ON atividade(conteudoId);
CREATE INDEX idx_tentativas_usuario_atividade ON tentativa(alunoId, atividadeId);
CREATE INDEX idx_feedbacks_professor ON feedback(professorId);

use dioraedu;

desc usuario;
desc instituicao;
desc alunos;

select * from usuario;
select id, perfil from usuario where perfil = 'admin';

SHOW CREATE TABLE Turma;
ALTER TABLE Turma DROP FOREIGN KEY Turma_instituicaoId_fkey;

select * from alunos;
select * from professores;
select * from administradores;
select * from instituicao;
select * from curso;
select * from turma;

desc alunos;
desc professores;
desc administradores;
desc matricula;
desc turma;
desc instituicao;

-- inserts
insert into instituicao (nome, dominioEmail, cnpj, emailContato, telefoneContato, status, dataCadastro)
values ("Escolinha do Professor Raimundo", "@edu.br", "123456789987654321", "secretaria.exemplo@email.com", "021965575436", 'ativa', current_timestamp());

