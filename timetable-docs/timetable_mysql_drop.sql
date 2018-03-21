ALTER TABLE `curso_periodos` DROP FOREIGN KEY `curso_periodos_fk0`;

ALTER TABLE `curso_periodos` DROP FOREIGN KEY `curso_periodos_fk1`;

ALTER TABLE `matriz_curricular` DROP FOREIGN KEY `matriz_curricular_fk0`;

ALTER TABLE `matriz_disciplinas` DROP FOREIGN KEY `matriz_disciplinas_fk0`;

ALTER TABLE `matriz_disciplinas` DROP FOREIGN KEY `matriz_disciplinas_fk1`;

ALTER TABLE `oferta_disciplina` DROP FOREIGN KEY `oferta_disciplina_fk0`;

ALTER TABLE `oferta_disciplina` DROP FOREIGN KEY `oferta_disciplina_fk1`;

ALTER TABLE `oferta_disciplina` DROP FOREIGN KEY `oferta_disciplina_fk2`;

ALTER TABLE `professor_oferta_disciplina` DROP FOREIGN KEY `professor_oferta_disciplina_fk0`;

ALTER TABLE `professor_oferta_disciplina` DROP FOREIGN KEY `professor_oferta_disciplina_fk1`;

ALTER TABLE `horario_semestre_letivo` DROP FOREIGN KEY `horario_semestre_letivo_fk0`;

ALTER TABLE `horario_semestre_letivo` DROP FOREIGN KEY `horario_semestre_letivo_fk1`;

ALTER TABLE `horario_semestre_letivo` DROP FOREIGN KEY `horario_semestre_letivo_fk2`;

ALTER TABLE `horario_semestre_letivo` DROP FOREIGN KEY `horario_semestre_letivo_fk3`;

ALTER TABLE `horario_semestre_letivo` DROP FOREIGN KEY `horario_semestre_letivo_fk4`;

DROP TABLE IF EXISTS `eixo`;

DROP TABLE IF EXISTS `semestre_letivo`;

DROP TABLE IF EXISTS `curso_periodos`;

DROP TABLE IF EXISTS `curso`;

DROP TABLE IF EXISTS `matriz_curricular`;

DROP TABLE IF EXISTS `disciplina`;

DROP TABLE IF EXISTS `matriz_disciplinas`;

DROP TABLE IF EXISTS `oferta_disciplina`;

DROP TABLE IF EXISTS `turno`;

DROP TABLE IF EXISTS `professor`;

DROP TABLE IF EXISTS `professor_oferta_disciplina`;

DROP TABLE IF EXISTS `periodo`;

DROP TABLE IF EXISTS `dia_da_semana`;

DROP TABLE IF EXISTS `horario_semestre_letivo`;

