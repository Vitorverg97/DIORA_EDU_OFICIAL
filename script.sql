
-- =============================
-- BANCO DE DADOS: DioraEDU
-- =============================

-- Tabela de instituições parceiras (premium)
CREATE TABLE instituicoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    dominio_email VARCHAR(100) UNIQUE
    cnpj VARCHAR(18) UNIQUE,
    email_contato VARCHAR(150),
    telefone_contato VARCHAR(20),
    status ENUM('ativa', 'inativa') DEFAULT 'ativa',
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    perfil ENUM('aluno', 'professor', 'admin') NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Alunos (freemium ou ligados a instituição)
CREATE TABLE alunos (
    usuario_id INT PRIMARY KEY,
    freemium BOOLEAN NOT NULL DEFAULT TRUE,
    instituicao_id INT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id)
);

-- Professores (sempre ligados a instituição)
CREATE TABLE professores (
    usuario_id INT PRIMARY KEY,
    liberado BOOLEAN NOT NULL DEFAULT FALSE,
    instituicao_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id)
);

-- Cursos
CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Professor_cursos
CREATE TABLE professor_cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    professor_id INT NOT NULL,
    curso_id INT NOT NULL,
    data_atribuicao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (professor_id) REFERENCES professores(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    UNIQUE (professor_id, curso_id) -- evita duplicações
);


-- Matrículas
CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    data_matricula DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativa', 'concluida', 'cancelada') DEFAULT 'ativa',
    
    nota_final DECIMAL(5,2),
    certificado_emitido BOOLEAN DEFAULT FALSE,
    
    CONSTRAINT fk_matricula_aluno FOREIGN KEY (aluno_id) REFERENCES alunos(usuario_id) ON DELETE CASCADE,
    CONSTRAINT fk_matricula_curso FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    
    UNIQUE (aluno_id, curso_id)
);

-- Conteúdos
CREATE TABLE conteudos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    curso_id INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    tipo ENUM('video', 'leitura', 'quiz', 'simulado', 'pdf', 'audio', 'desafio') NOT NULL,
    url_arquivo TEXT,
    ordem INT DEFAULT 0,
        ativo BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

-- Visualizações do conteúdo
CREATE TABLE visualizacoes_conteudo (
    id INT AUTO_INCREMENT PRIMARY KEY,

    aluno_id INT NOT NULL,
    conteudo_id INT NOT NULL,
    data_visualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (aluno_id, conteudo_id),

    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (conteudo_id) REFERENCES conteudos(id) ON DELETE CASCADE
);

-- Atividades
CREATE TABLE atividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conteudo_id INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    enunciado TEXT NOT NULL,
    tipo ENUM('objetiva', 'discursiva', 'múltipla_escolha') DEFAULT 'objetiva',
    peso DECIMAL(4,2) DEFAULT 1.00,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conteudo_id) REFERENCES conteudos(id) ON DELETE CASCADE
);

-- Tentativas
CREATE TABLE tentativas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    atividade_id INT NOT NULL,
    aluno_id INT NOT NULL,
    resposta TEXT,
    pontuacao DECIMAL(4,2) DEFAULT 0.0,
    data_tentativa DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (atividade_id) REFERENCES atividades(id) ON DELETE CASCADE,
    FOREIGN KEY (aluno_id) REFERENCES alunos(usuario_id) ON DELETE CASCADE
);

-- Feedbacks dos professores
CREATE TABLE feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tentativa_id INT NOT NULL,
    professor_id INT NOT NULL,
    mensagem TEXT NOT NULL,
    data_feedback DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tentativa_id) REFERENCES tentativas(id) ON DELETE CASCADE,
    FOREIGN KEY (professor_id) REFERENCES professores(usuario_id) ON DELETE CASCADE
);

-- Tabela de turmas
CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso_id INT NOT NULL,
    professor_id INT NOT NULL,
    instituicao_id INT,
    data_inicio DATE,
    data_fim DATE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    FOREIGN KEY (professor_id) REFERENCES professores(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id)
);

-- Associação entre alunos e turmas
CREATE TABLE turma_alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turma_id INT NOT NULL,
    aluno_id INT NOT NULL,
    data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
    FOREIGN KEY (aluno_id) REFERENCES alunos(usuario_id) ON DELETE CASCADE
);

-- Views
CREATE VIEW vw_alunos_matriculados AS
SELECT u.id AS usuario_id, u.nome AS aluno, u.email, c.nome AS curso, m.data_matricula, m.status
FROM usuarios u
JOIN alunos a ON u.id = a.usuario_id
JOIN matriculas m ON u.id = m.usuario_id
JOIN cursos c ON m.curso_id = c.id;

CREATE VIEW vw_tentativas_com_feedback AS
SELECT t.id AS tentativa_id, u.nome AS aluno, a.titulo AS atividade, t.resposta, t.nota, f.comentario, pu.nome AS professor
FROM tentativas t
JOIN usuarios u ON t.usuario_id = u.id
JOIN atividades a ON t.atividade_id = a.id
LEFT JOIN feedbacks f ON f.tentativa_id = t.id
LEFT JOIN usuarios pu ON f.professor_id = pu.id;

CREATE VIEW vw_professores_conteudos AS
SELECT p.usuario_id AS professor_id, u.nome AS professor_nome, c.nome AS curso, ct.titulo AS conteudo, ct.tipo
FROM professores p
JOIN usuarios u ON u.id = p.usuario_id
JOIN cursos c ON 1=1
JOIN conteudos ct ON ct.curso_id = c.id;

CREATE VIEW vw_professores_cursos AS
SELECT p.usuario_id, u.nome AS professor, c.nome AS curso, pc.data_atribuicao
FROM professor_cursos pc
JOIN professores p ON pc.professor_id = p.usuario_id
JOIN usuarios u ON u.id = p.usuario_id
JOIN cursos c ON pc.curso_id = c.id;

-- View para listar turmas com seus alunos
CREATE VIEW vw_turmas_alunos AS
SELECT t.id AS turma_id, t.nome AS turma, u.nome AS aluno, u.email, c.nome AS curso, t.data_inicio, t.data_fim
FROM turma_alunos ta
JOIN turmas t ON ta.turma_id = t.id
JOIN alunos a ON ta.aluno_id = a.usuario_id
JOIN usuarios u ON a.usuario_id = u.id
JOIN cursos c ON t.curso_id = c.id;


-- View para painel do professor
CREATE VIEW progresso_atividade AS
SELECT 
    a.id AS aluno_id,
    a.nome AS aluno_nome,
    c.id AS conteudo_id,
    c.titulo AS conteudo_titulo,
    COALESCE(vc.data_visualizacao, NULL) AS visualizou_em,
    COUNT(t.id) AS tentativas_feitas,
    MAX(t.pontuacao) AS melhor_nota
FROM alunos a
JOIN matriculas m ON m.aluno_id = a.id
JOIN conteudos c ON c.curso_id = m.curso_id
LEFT JOIN visualizacoes_conteudo vc ON vc.aluno_id = a.id AND vc.conteudo_id = c.id
LEFT JOIN atividades atv ON atv.conteudo_id = c.id
LEFT JOIN tentativas t ON t.atividade_id = atv.id AND t.aluno_id = a.id
GROUP BY a.id, c.id;

-- Triggers
DELIMITER $$
CREATE TRIGGER trg_definir_freemium
BEFORE INSERT ON alunos
FOR EACH ROW
BEGIN
    DECLARE email_usuario VARCHAR(150);
    SELECT email INTO email_usuario FROM usuarios WHERE id = NEW.usuario_id;
    IF email_usuario NOT LIKE '%@instituicao.edu%' THEN
        SET NEW.freemium = TRUE;
    END IF;
END$$
DELIMITER ;

-- Índices adicionais
CREATE INDEX idx_conteudos_curso_id ON conteudos(curso_id);
CREATE INDEX idx_atividades_conteudo_id ON atividades(conteudo_id);
CREATE INDEX idx_tentativas_usuario_atividade ON tentativas(usuario_id, atividade_id);
CREATE INDEX idx_feedbacks_professor ON feedbacks(professor_id);
