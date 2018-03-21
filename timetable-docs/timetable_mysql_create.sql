--http://dbdesigner.net/designer/schema/156459

CREATE TABLE `eixo` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`descricao` varchar(100) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `semestre_letivo` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`semestre` varchar(6) NOT NULL UNIQUE,
	`ativo` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `curso_periodos` (
	`turno` INT NOT NULL,
	`qtde_periodos` INT NOT NULL,
	`curso` INT NOT NULL
);

CREATE TABLE `curso` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(100) NOT NULL UNIQUE,
	`ativo` BOOLEAN NOT NULL,
	`eixo` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `matriz_curricular` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`curso` INT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`ativo` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `disciplina` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(100) NOT NULL UNIQUE,
	`credito` INT NOT NULL DEFAULT '4',
	PRIMARY KEY (`id`)
);

CREATE TABLE `matriz_disciplinas` (
	`matriz` INT NOT NULL,
	`disciplina` INT NOT NULL,
	`semestre` INT NOT NULL DEFAULT '1'
);

CREATE TABLE `oferta_disciplina` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`turno` INT NOT NULL,
	`semestre_letivo` INT NOT NULL,
	`disciplina` INT NOT NULL,
	`creditos_totais` INT NOT NULL,
	`creditos_restantes` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `turno` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(100) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `professor` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(200) NOT NULL UNIQUE,
	`ativo` BOOLEAN NOT NULL,
	`creditos_totais` INT NOT NULL DEFAULT '0',
	`creditos_livres` INT NOT NULL DEFAULT '0',
	`coordenador` BOOLEAN NOT NULL,
	`login` varchar(100) NOT NULL,
	`senha` varchar(100) NOT NULL,
	`cpf` INT(11),
	PRIMARY KEY (`id`)
);

CREATE TABLE `professor_oferta_disciplina` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`professor` INT NOT NULL,
	`oferta_disciplina` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `periodo` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(5) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `dia_da_semana` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(100) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `horario_semestre_letivo` (
	`semestre_letivo` INT NOT NULL,
	`prof_oferta_disciplina` INT NOT NULL,
	`dia_semana` INT NOT NULL,
	`turno` INT NOT NULL,
	`periodo` INT NOT NULL
);

ALTER TABLE `curso_periodos` ADD CONSTRAINT `curso_periodos_fk0` FOREIGN KEY (`turno`) REFERENCES `turno`(`id`);

ALTER TABLE `curso_periodos` ADD CONSTRAINT `curso_periodos_fk1` FOREIGN KEY (`curso`) REFERENCES `curso`(`id`);

ALTER TABLE `matriz_curricular` ADD CONSTRAINT `matriz_curricular_fk0` FOREIGN KEY (`curso`) REFERENCES `curso`(`id`);

ALTER TABLE `matriz_disciplinas` ADD CONSTRAINT `matriz_disciplinas_fk0` FOREIGN KEY (`matriz`) REFERENCES `matriz_curricular`(`id`);

ALTER TABLE `matriz_disciplinas` ADD CONSTRAINT `matriz_disciplinas_fk1` FOREIGN KEY (`disciplina`) REFERENCES `disciplina`(`id`);

ALTER TABLE `oferta_disciplina` ADD CONSTRAINT `oferta_disciplina_fk0` FOREIGN KEY (`turno`) REFERENCES `turno`(`id`);

ALTER TABLE `oferta_disciplina` ADD CONSTRAINT `oferta_disciplina_fk1` FOREIGN KEY (`semestre_letivo`) REFERENCES `semestre_letivo`(`id`);

ALTER TABLE `oferta_disciplina` ADD CONSTRAINT `oferta_disciplina_fk2` FOREIGN KEY (`disciplina`) REFERENCES `disciplina`(`id`);

ALTER TABLE `professor_oferta_disciplina` ADD CONSTRAINT `professor_oferta_disciplina_fk0` FOREIGN KEY (`professor`) REFERENCES `professor`(`id`);

ALTER TABLE `professor_oferta_disciplina` ADD CONSTRAINT `professor_oferta_disciplina_fk1` FOREIGN KEY (`oferta_disciplina`) REFERENCES `oferta_disciplina`(`id`);

ALTER TABLE `horario_semestre_letivo` ADD CONSTRAINT `horario_semestre_letivo_fk0` FOREIGN KEY (`semestre_letivo`) REFERENCES `semestre_letivo`(`id`);

ALTER TABLE `horario_semestre_letivo` ADD CONSTRAINT `horario_semestre_letivo_fk1` FOREIGN KEY (`prof_oferta_disciplina`) REFERENCES `professor_oferta_disciplina`(`id`);

ALTER TABLE `horario_semestre_letivo` ADD CONSTRAINT `horario_semestre_letivo_fk2` FOREIGN KEY (`dia_semana`) REFERENCES `dia_da_semana`(`id`);

ALTER TABLE `horario_semestre_letivo` ADD CONSTRAINT `horario_semestre_letivo_fk3` FOREIGN KEY (`turno`) REFERENCES `turno`(`id`);

ALTER TABLE `horario_semestre_letivo` ADD CONSTRAINT `horario_semestre_letivo_fk4` FOREIGN KEY (`periodo`) REFERENCES `periodo`(`id`);

