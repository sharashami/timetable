CREATE DATABASE  IF NOT EXISTS `timetable` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `timetable`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: timetable
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `eixo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'CIÊNCIA DA COMPUTAÇÃO',1,1),(2,'TÉCNICO EM INFORMÁTICA',1,1);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso_periodos`
--

DROP TABLE IF EXISTS `curso_periodos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curso_periodos` (
  `turno` int(11) NOT NULL,
  `qtde_periodos` int(11) NOT NULL,
  `curso` int(11) NOT NULL,
  KEY `curso_periodos_fk0` (`turno`),
  KEY `curso_periodos_fk1` (`curso`),
  CONSTRAINT `curso_periodos_fk0` FOREIGN KEY (`turno`) REFERENCES `turno` (`id`),
  CONSTRAINT `curso_periodos_fk1` FOREIGN KEY (`curso`) REFERENCES `curso` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso_periodos`
--

LOCK TABLES `curso_periodos` WRITE;
/*!40000 ALTER TABLE `curso_periodos` DISABLE KEYS */;
INSERT INTO `curso_periodos` VALUES (1,2,1),(2,2,1),(2,2,2);
/*!40000 ALTER TABLE `curso_periodos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dia_da_semana`
--

DROP TABLE IF EXISTS `dia_da_semana`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dia_da_semana` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dia_da_semana`
--

LOCK TABLES `dia_da_semana` WRITE;
/*!40000 ALTER TABLE `dia_da_semana` DISABLE KEYS */;
INSERT INTO `dia_da_semana` VALUES (3,'QUARTA'),(4,'QUINTA'),(6,'SÁBADO'),(1,'SEGUNDA'),(5,'SEXTA'),(2,'TERÇA');
/*!40000 ALTER TABLE `dia_da_semana` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disciplina`
--

DROP TABLE IF EXISTS `disciplina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `disciplina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `credito` int(11) NOT NULL DEFAULT '4',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disciplina`
--

LOCK TABLES `disciplina` WRITE;
/*!40000 ALTER TABLE `disciplina` DISABLE KEYS */;
INSERT INTO `disciplina` VALUES (1,'DESENVOLVIMENTO PESSOAL E PROFISSIONAL',2),(2,'ELETRICIDADE E ELETRÔNICA PARA INFORMÁTICA',2),(3,'INTERPRETAÇÃO E REDAÇÃO DE TEXTOS',2),(4,'INGLÊS',2),(5,'INTRODUÇÃO A PROGRAMAÇÃO',4),(6,'INSTALAÇÃO E MANUTENÇÃO DE COMPUTADORES',4),(7,'PROGRAMAÇÃO ORIENTADA A OBJETOS',4),(8,'SISTEMAS OPERACIONAIS',4),(9,'INTRODUÇÃO A BANCO DE DADOS',4),(10,'INTRODUÇÃO A ENGENHARIA DE SOFTWARE',4),(11,'PROGRAMAÇÃO PARA WEB I',4),(12,'REDES DE COMPUTADORES',4),(13,'EMPREENDEDORISMO',2),(14,'PROGRAMAÇÃO PARA WEB II',4),(15,'SERVIDORES DE REDES DE COMPUTADORES',4),(16,'CÁLCULO I',4),(17,'CIRCUITOS DIGITAIS',4),(18,'FUNDAMENTOS DE PROGRAMAÇÃO',4),(19,'MATEMÁTICA DISCRETA',4),(20,'ÁLGEBRA LINEAR',4),(21,'CÁLCULO II',4),(22,'FÍSICA I',4),(23,'INGLÊS INSTRUMENTAL',2),(24,'LABORATÓRIO DE PROGRAMAÇÃO',4),(25,'ARQUITETURA DE COMPUTADORES',4),(26,'FÍSICA II',4),(27,'PROBABILIDADE E ESTATÍSTICA',4),(28,'PROGRAMAÇÃO LINEAR',4),(29,'PROGRAMAÇÃO ORIENTADA A OBJETO',4),(30,'BANCO DE DADOS',4),(31,'CÁLCULO NUMÉRICO',4),(32,'COMUNICAÇÃO DE DADOS',4),(33,'ESTRUTURA DE DADOS',4),(34,'LÓGICA PARA COMPUTAÇÃO',4),(35,'ANÁLISE DE ALGORITMOS',4),(36,'ENGENHARIA DE SOFTWARE',4),(37,'GRAFOS',4),(38,'INTRODUÇÃO A ELETRICIDADE E ELETRÔNICA PARA\nCOMPUTAÇÃO',2),(39,'INTELIGÊNCIA ARTIFICIAL',4),(40,'LINGUAGENS DE PROGRAMAÇÃO',4),(41,'METODOLOGIA CIENTÍFICA',2),(42,'REDES DE COMPUTADORES I',4),(43,'ANÁLISE E PROJETO DE SISTEMAS',4),(44,'MICROCONTROLADORES',4),(45,'TEORIA DA COMPUTAÇÃO',4),(46,'TRABALHO DE CONCLUSÃO DE CURSO I',2),(47,'ADMINISTRAÇÃO PARA CIÊNCIA DA COMPUTAÇÃO',4),(48,'COMPILADORES',4),(49,'COMPRESSÃO DE DADOS',4),(50,'EDUCAÇÃO FÍSICA',2),(51,'GESTÃO DE PROJETOS',4),(52,'INTELIGÊNCIA COMPUTACIONAL APLICADA',4),(53,'INTRODUÇÃO A COMPUTAÇÃO GRÁFICA',4),(54,'LINGUAGEM BRASILEIRA DE SINAIS',2),(55,'MODELAGEM DE SISTEMAS HÍBRIDOS',4),(56,'PROCESSAMENTO DIGITAL DE IMAGENS',4),(57,'PROCESSAMENTO DIGITAL DE SINAIS',4),(58,'PROGRAMAÇÃO PARALELA',4),(59,'PROJETO DE REDES DE COMPUTADORES',4),(60,'PROJETOS SOCIAIS',2),(61,'RECONHECIMENTO DE PADRÕES',4),(62,'REDES DE COMPUTADORES II',4),(63,'REDES NEURAIS ARTIFICIAIS',4),(64,'REDES SEM FIO',4),(65,'ROBÓTICA EDUCACIONAL',4),(66,'SEGURANÇA DA INFORMAÇÃO',4),(67,'SISTEMAS DISTRIBUÍDOS',4),(68,'SISTEMAS EMBARCADOS',4),(69,'TÓPICOS EM JAVA PARA WEB',4),(70,'TRABALHO DE CONCLUSÃO DE CURSO II',2);
/*!40000 ALTER TABLE `disciplina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eixo`
--

DROP TABLE IF EXISTS `eixo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eixo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descricao` (`descricao`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eixo`
--

LOCK TABLES `eixo` WRITE;
/*!40000 ALTER TABLE `eixo` DISABLE KEYS */;
INSERT INTO `eixo` VALUES (1,'COMPUTAÇÃO');
/*!40000 ALTER TABLE `eixo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario_semestre_letivo`
--

DROP TABLE IF EXISTS `horario_semestre_letivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `horario_semestre_letivo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `semestre_letivo` int(11) NOT NULL,
  `prof_oferta_disciplina` int(11) NOT NULL,
  `dia_semana` int(11) NOT NULL,
  `turno` int(11) NOT NULL,
  `periodo` int(11) NOT NULL,
  `laboratorio` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `horario_semestre_letivo_fk0` (`semestre_letivo`),
  KEY `horario_semestre_letivo_fk1` (`prof_oferta_disciplina`),
  KEY `horario_semestre_letivo_fk2` (`dia_semana`),
  KEY `horario_semestre_letivo_fk3` (`turno`),
  KEY `horario_semestre_letivo_fk4` (`periodo`),
  KEY `horario_semestre_letivo_fk5` (`laboratorio`),
  CONSTRAINT `horario_semestre_letivo_fk0` FOREIGN KEY (`semestre_letivo`) REFERENCES `semestre_letivo` (`id`),
  CONSTRAINT `horario_semestre_letivo_fk1` FOREIGN KEY (`prof_oferta_disciplina`) REFERENCES `professor_oferta_disciplina` (`id`),
  CONSTRAINT `horario_semestre_letivo_fk2` FOREIGN KEY (`dia_semana`) REFERENCES `dia_da_semana` (`id`),
  CONSTRAINT `horario_semestre_letivo_fk3` FOREIGN KEY (`turno`) REFERENCES `turno` (`id`),
  CONSTRAINT `horario_semestre_letivo_fk4` FOREIGN KEY (`periodo`) REFERENCES `periodo` (`id`),
  CONSTRAINT `horario_semestre_letivo_fk5` FOREIGN KEY (`laboratorio`) REFERENCES `laboratorio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario_semestre_letivo`
--

LOCK TABLES `horario_semestre_letivo` WRITE;
/*!40000 ALTER TABLE `horario_semestre_letivo` DISABLE KEYS */;
/*!40000 ALTER TABLE `horario_semestre_letivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laboratorio`
--

DROP TABLE IF EXISTS `laboratorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `laboratorio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `eixo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `laboratorio_fk0` (`eixo`),
  CONSTRAINT `laboratorio_fk0` FOREIGN KEY (`eixo`) REFERENCES `eixo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laboratorio`
--

LOCK TABLES `laboratorio` WRITE;
/*!40000 ALTER TABLE `laboratorio` DISABLE KEYS */;
INSERT INTO `laboratorio` VALUES (1,'INFO 1',1),(2,'INFO 2',1),(3,'INFO 3',1),(4,'LAB REDES SEM FIO',1),(5,'REDES 1',1),(6,'REDES 2',1);
/*!40000 ALTER TABLE `laboratorio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matriz_curricular`
--

DROP TABLE IF EXISTS `matriz_curricular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matriz_curricular` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `curso` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `matriz_curricular_fk0` (`curso`),
  CONSTRAINT `matriz_curricular_fk0` FOREIGN KEY (`curso`) REFERENCES `curso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matriz_curricular`
--

LOCK TABLES `matriz_curricular` WRITE;
/*!40000 ALTER TABLE `matriz_curricular` DISABLE KEYS */;
INSERT INTO `matriz_curricular` VALUES (1,1,'2014-2',1),(2,2,'2012-2',1);
/*!40000 ALTER TABLE `matriz_curricular` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matriz_disciplinas`
--

DROP TABLE IF EXISTS `matriz_disciplinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matriz_disciplinas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matriz` int(11) NOT NULL,
  `disciplina` int(11) NOT NULL,
  `semestre` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `matriz_disciplinas_fk0` (`matriz`),
  KEY `matriz_disciplinas_fk1` (`disciplina`),
  CONSTRAINT `matriz_disciplinas_fk0` FOREIGN KEY (`matriz`) REFERENCES `matriz_curricular` (`id`),
  CONSTRAINT `matriz_disciplinas_fk1` FOREIGN KEY (`disciplina`) REFERENCES `disciplina` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matriz_disciplinas`
--

LOCK TABLES `matriz_disciplinas` WRITE;
/*!40000 ALTER TABLE `matriz_disciplinas` DISABLE KEYS */;
INSERT INTO `matriz_disciplinas` VALUES (1,2,1,1),(2,2,2,1),(3,2,3,1),(4,2,4,1),(5,2,5,1),(6,2,6,2),(7,2,7,2),(8,2,8,2),(9,2,9,3),(10,2,10,3),(11,2,11,3),(12,2,12,3),(13,2,13,4),(14,2,14,4),(15,2,15,4),(16,1,16,1),(17,1,17,1),(18,1,18,1),(19,1,19,1),(20,1,20,2),(21,1,21,2),(22,1,22,2),(23,1,23,2),(24,1,24,2),(25,1,25,3),(26,1,26,3),(27,1,27,3),(28,1,28,3),(29,1,29,3),(30,1,30,4),(31,1,31,4),(32,1,32,4),(33,1,33,4),(34,1,34,4),(35,1,35,5),(36,1,36,5),(37,1,37,5),(38,1,38,5),(39,1,8,5),(40,1,39,6),(41,1,40,6),(42,1,41,6),(43,1,42,6),(44,1,43,7),(45,1,44,7),(46,1,45,7),(47,1,46,7),(48,1,47,8),(49,1,48,8),(50,1,49,8),(51,1,50,8),(52,1,51,8),(53,1,52,8),(54,1,53,8),(55,1,54,8),(56,1,55,8),(57,1,56,8),(58,1,57,8),(59,1,58,8),(60,1,59,8),(61,1,60,8),(62,1,61,8),(63,1,62,8),(64,1,63,8),(65,1,64,8),(66,1,65,8),(67,1,66,8),(68,1,67,8),(69,1,68,8),(70,1,69,8),(71,1,70,8);
/*!40000 ALTER TABLE `matriz_disciplinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oferta_disciplina`
--

DROP TABLE IF EXISTS `oferta_disciplina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oferta_disciplina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `turno` int(11) NOT NULL,
  `semestre_letivo` int(11) NOT NULL,
  `matriz_disciplina` int(11) NOT NULL,
  `creditos_totais` int(11) NOT NULL,
  `creditos_restantes` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `oferta_disciplina_fk2` (`matriz_disciplina`),
  KEY `oferta_disciplina_fk0` (`turno`),
  KEY `oferta_disciplina_fk1` (`semestre_letivo`),
  CONSTRAINT `oferta_disciplina_fk0` FOREIGN KEY (`turno`) REFERENCES `turno` (`id`),
  CONSTRAINT `oferta_disciplina_fk1` FOREIGN KEY (`semestre_letivo`) REFERENCES `semestre_letivo` (`id`),
  CONSTRAINT `oferta_disciplina_fk2` FOREIGN KEY (`matriz_disciplina`) REFERENCES `matriz_disciplinas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oferta_disciplina`
--

LOCK TABLES `oferta_disciplina` WRITE;
/*!40000 ALTER TABLE `oferta_disciplina` DISABLE KEYS */;
INSERT INTO `oferta_disciplina` VALUES (1,2,1,1,0,0),(2,2,1,2,0,0),(3,2,1,3,0,0),(4,2,1,4,0,0),(5,2,1,5,0,0),(6,2,1,6,0,0),(7,2,1,7,0,0),(8,2,1,8,0,0),(9,2,1,9,0,0),(10,2,1,10,0,0),(11,2,1,11,0,0),(12,2,1,12,0,0),(13,2,1,13,0,0),(14,2,1,14,0,0),(15,2,1,15,0,0),(16,1,1,16,0,0),(17,1,1,17,0,0),(18,1,1,18,0,0),(19,1,1,19,0,0),(20,1,1,20,0,0),(21,1,1,21,0,0),(22,1,1,22,0,0),(23,1,1,23,0,0),(24,1,1,24,0,0),(25,1,1,25,0,0),(26,1,1,26,0,0),(27,1,1,27,0,0),(28,1,1,28,0,0),(29,1,1,29,0,0),(30,1,1,30,0,0),(31,1,1,31,0,0),(32,1,1,32,0,0),(33,1,1,33,0,0),(34,1,1,34,0,0),(35,1,1,35,0,0);
/*!40000 ALTER TABLE `oferta_disciplina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo`
--

DROP TABLE IF EXISTS `periodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `periodo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo`
--

LOCK TABLES `periodo` WRITE;
/*!40000 ALTER TABLE `periodo` DISABLE KEYS */;
INSERT INTO `periodo` VALUES (1,'AB'),(2,'CD');
/*!40000 ALTER TABLE `periodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `creditos_totais` int(11) NOT NULL DEFAULT '0',
  `creditos_livres` int(11) NOT NULL DEFAULT '0',
  `coordenador` tinyint(1) NOT NULL,
  `login` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `cpf` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES (1,'JOARI',1,0,0,0,'joari','1234',NULL),(2,'AGEBSON',1,0,0,0,'agebson','1234',NULL),(3,'AJALMAR',1,0,0,0,'ajalmar','1234',NULL),(4,'ANDERSON',1,0,0,0,'anderson','1234',NULL),(5,'AMAURI',1,0,0,0,'amauri','1234',NULL),(6,'SHARA',1,0,0,1,'shara','1234',NULL),(7,'ADRIANO',1,0,0,0,'adriano','1234',NULL),(8,'CORNELI',1,0,0,0,'corneli','1234',NULL),(9,'SAULO',1,0,0,0,'saulo','1234',NULL),(10,'DANIEL ALENCAR',1,0,0,0,'danielalencar','1234',NULL),(11,'GABRIELA',1,0,0,0,'gabriela','1234',NULL),(12,'SIQUEIRA',1,0,0,0,'siqueira','1234',NULL),(13,'ELDER',1,0,0,0,'elder','1234',NULL),(14,'FABIANA',1,0,0,0,'fabiana','1234',NULL),(15,'JEFFERSON',1,0,0,0,'jefferson','1234',NULL),(16,'IGOR',1,0,0,0,'igor','1234',NULL),(17,'INACIO',1,0,0,0,'inacio','1234',NULL),(18,'JEAN',1,0,0,0,'jean','1234',NULL),(19,'NIVANDO',1,0,0,0,'nivando','1234',NULL),(20,'OTAVIO',1,0,0,0,'otavio','1234',NULL),(21,'SANDRO',1,0,0,0,'sandro','1234',NULL),(22,'JONAS',1,0,0,0,'jonas','1234',NULL),(23,'DANIEL FERREIRA',1,0,0,0,'danielferreira','1234',NULL),(24,'WELLINGTON',1,0,0,0,'wellington','1234',NULL),(25,'ALISSON',1,0,0,0,'alisson','1234',NULL),(26,'THIAGO ALVES',1,0,0,0,'thiagoalves','1234',NULL),(27,'THIAGO QUEIROZ',1,0,0,0,'thiagoqueiroz','1234',NULL);
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor_oferta_disciplina`
--

DROP TABLE IF EXISTS `professor_oferta_disciplina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professor_oferta_disciplina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `professor` int(11) NOT NULL,
  `oferta_disciplina` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `professor_oferta_disciplina_fk0` (`professor`),
  KEY `professor_oferta_disciplina_fk1` (`oferta_disciplina`),
  CONSTRAINT `professor_oferta_disciplina_fk0` FOREIGN KEY (`professor`) REFERENCES `professor` (`id`),
  CONSTRAINT `professor_oferta_disciplina_fk1` FOREIGN KEY (`oferta_disciplina`) REFERENCES `oferta_disciplina` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor_oferta_disciplina`
--

LOCK TABLES `professor_oferta_disciplina` WRITE;
/*!40000 ALTER TABLE `professor_oferta_disciplina` DISABLE KEYS */;
/*!40000 ALTER TABLE `professor_oferta_disciplina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semestre_letivo`
--

DROP TABLE IF EXISTS `semestre_letivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `semestre_letivo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `semestre` varchar(6) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `semestre` (`semestre`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semestre_letivo`
--

LOCK TABLES `semestre_letivo` WRITE;
/*!40000 ALTER TABLE `semestre_letivo` DISABLE KEYS */;
INSERT INTO `semestre_letivo` VALUES (1,'2018.2',1);
/*!40000 ALTER TABLE `semestre_letivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno`
--

DROP TABLE IF EXISTS `turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno`
--

LOCK TABLES `turno` WRITE;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
INSERT INTO `turno` VALUES (1,'MANHÃ'),(3,'NOITE'),(2,'TARDE');
/*!40000 ALTER TABLE `turno` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-22 20:16:21
