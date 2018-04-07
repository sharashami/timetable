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
-- Table structure for table `available_course`
--

DROP TABLE IF EXISTS `available_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `available_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shift_id` int(11) NOT NULL,
  `semester_id` int(11) NOT NULL,
  `program_structure_course_id` int(11) NOT NULL,
  `total_credits` int(11) NOT NULL,
  `free_credits` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `available_course_fk2` (`program_structure_course_id`),
  KEY `available_course_fk0` (`shift_id`),
  KEY `available_course_fk1` (`semester_id`),
  CONSTRAINT `available_course_fk0` FOREIGN KEY (`shift_id`) REFERENCES `shift` (`id`),
  CONSTRAINT `available_course_fk1` FOREIGN KEY (`semester_id`) REFERENCES `semester` (`id`),
  CONSTRAINT `available_course_fk2` FOREIGN KEY (`program_structure_course_id`) REFERENCES `program_structure_courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `available_course`
--

LOCK TABLES `available_course` WRITE;
/*!40000 ALTER TABLE `available_course` DISABLE KEYS */;
INSERT INTO `available_course` VALUES (1,2,1,1,0,0),(2,2,1,2,0,0),(3,2,1,3,0,0),(4,2,1,4,0,0),(5,2,1,5,0,0),(6,2,1,6,0,0),(7,2,1,7,0,0),(8,2,1,8,0,0),(9,2,1,9,0,0),(10,2,1,10,0,0),(11,2,1,11,0,0),(12,2,1,12,0,0),(13,2,1,13,0,0),(14,2,1,14,0,0),(15,2,1,15,0,0),(16,1,1,16,0,0),(17,1,1,17,0,0),(18,1,1,18,0,0),(19,1,1,19,0,0),(20,1,1,20,0,0),(21,1,1,21,0,0),(22,1,1,22,0,0),(23,1,1,23,0,0),(24,1,1,24,0,0),(25,1,1,25,0,0),(26,1,1,26,0,0),(27,1,1,27,0,0),(28,1,1,28,0,0),(29,1,1,29,0,0),(30,1,1,30,0,0),(31,1,1,31,0,0),(32,1,1,32,0,0),(33,1,1,33,0,0),(34,1,1,34,0,0),(35,1,1,35,0,0);
/*!40000 ALTER TABLE `available_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `credits` int(11) NOT NULL DEFAULT '4',
  PRIMARY KEY (`id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'DESENVOLVIMENTO PESSOAL E PROFISSIONAL',2),(2,'ELETRICIDADE E ELETRÔNICA PARA INFORMÁTICA',2),(3,'INTERPRETAÇÃO E REDAÇÃO DE TEXTOS',2),(4,'INGLÊS',2),(5,'INTRODUÇÃO A PROGRAMAÇÃO',4),(6,'INSTALAÇÃO E MANUTENÇÃO DE COMPUTADORES',4),(7,'PROGRAMAÇÃO ORIENTADA A OBJETOS',4),(8,'SISTEMAS OPERACIONAIS',4),(9,'INTRODUÇÃO A BANCO DE DADOS',4),(10,'INTRODUÇÃO A ENGENHARIA DE SOFTWARE',4),(11,'PROGRAMAÇÃO PARA WEB I',4),(12,'REDES DE COMPUTADORES',4),(13,'EMPREENDEDORISMO',2),(14,'PROGRAMAÇÃO PARA WEB II',4),(15,'SERVIDORES DE REDES DE COMPUTADORES',4),(16,'CÁLCULO I',4),(17,'CIRCUITOS DIGITAIS',4),(18,'FUNDAMENTOS DE PROGRAMAÇÃO',4),(19,'MATEMÁTICA DISCRETA',4),(20,'ÁLGEBRA LINEAR',4),(21,'CÁLCULO II',4),(22,'FÍSICA I',4),(23,'INGLÊS INSTRUMENTAL',2),(24,'LABORATÓRIO DE PROGRAMAÇÃO',4),(25,'ARQUITETURA DE COMPUTADORES',4),(26,'FÍSICA II',4),(27,'PROBABILIDADE E ESTATÍSTICA',4),(28,'PROGRAMAÇÃO LINEAR',4),(29,'PROGRAMAÇÃO ORIENTADA A OBJETO',4),(30,'BANCO DE DADOS',4),(31,'CÁLCULO NUMÉRICO',4),(32,'COMUNICAÇÃO DE DADOS',4),(33,'ESTRUTURA DE DADOS',4),(34,'LÓGICA PARA COMPUTAÇÃO',4),(35,'ANÁLISE DE ALGORITMOS',4),(36,'ENGENHARIA DE SOFTWARE',4),(37,'GRAFOS',4),(38,'INTRODUÇÃO A ELETRICIDADE E ELETRÔNICA PARA\nCOMPUTAÇÃO',2),(39,'INTELIGÊNCIA ARTIFICIAL',4),(40,'LINGUAGENS DE PROGRAMAÇÃO',4),(41,'METODOLOGIA CIENTÍFICA',2),(42,'REDES DE COMPUTADORES I',4),(43,'ANÁLISE E PROJETO DE SISTEMAS',4),(44,'MICROCONTROLADORES',4),(45,'TEORIA DA COMPUTAÇÃO',4),(46,'TRABALHO DE CONCLUSÃO DE CURSO I',2),(47,'ADMINISTRAÇÃO PARA CIÊNCIA DA COMPUTAÇÃO',4),(48,'COMPILADORES',4),(49,'COMPRESSÃO DE DADOS',4),(50,'EDUCAÇÃO FÍSICA',2),(51,'GESTÃO DE PROJETOS',4),(52,'INTELIGÊNCIA COMPUTACIONAL APLICADA',4),(53,'INTRODUÇÃO A COMPUTAÇÃO GRÁFICA',4),(54,'LINGUAGEM BRASILEIRA DE SINAIS',2),(55,'MODELAGEM DE SISTEMAS HÍBRIDOS',4),(56,'PROCESSAMENTO DIGITAL DE IMAGENS',4),(57,'PROCESSAMENTO DIGITAL DE SINAIS',4),(58,'PROGRAMAÇÃO PARALELA',4),(59,'PROJETO DE REDES DE COMPUTADORES',4),(60,'PROJETOS SOCIAIS',2),(61,'RECONHECIMENTO DE PADRÕES',4),(62,'REDES DE COMPUTADORES II',4),(63,'REDES NEURAIS ARTIFICIAIS',4),(64,'REDES SEM FIO',4),(65,'ROBÓTICA EDUCACIONAL',4),(66,'SEGURANÇA DA INFORMAÇÃO',4),(67,'SISTEMAS DISTRIBUÍDOS',4),(68,'SISTEMAS EMBARCADOS',4),(69,'TÓPICOS EM JAVA PARA WEB',4),(70,'TRABALHO DE CONCLUSÃO DE CURSO II',2);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field`
--

DROP TABLE IF EXISTS `field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `field` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descricao` (`descricao`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (1,'COMPUTAÇÃO');
/*!40000 ALTER TABLE `field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laboratory`
--

DROP TABLE IF EXISTS `laboratory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `laboratory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `field_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `laboratory_fk0` (`field_id`),
  CONSTRAINT `laboratory_fk0` FOREIGN KEY (`field_id`) REFERENCES `field` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laboratory`
--

LOCK TABLES `laboratory` WRITE;
/*!40000 ALTER TABLE `laboratory` DISABLE KEYS */;
INSERT INTO `laboratory` VALUES (1,'INFO 1',1),(2,'INFO 2',1),(3,'INFO 3',1),(4,'LAB REDES SEM FIO',1),(5,'REDES 1',1),(6,'REDES 2',1);
/*!40000 ALTER TABLE `laboratory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `period`
--

DROP TABLE IF EXISTS `period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `period` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `period`
--

LOCK TABLES `period` WRITE;
/*!40000 ALTER TABLE `period` DISABLE KEYS */;
INSERT INTO `period` VALUES (1,'AB'),(2,'CD');
/*!40000 ALTER TABLE `period` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `total_credits` int(11) NOT NULL DEFAULT '0',
  `free_credits` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `professor_fk0` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES (1,1,0,0),(2,1,0,0),(3,1,0,0),(4,1,0,0),(5,1,0,0),(6,1,0,0),(7,1,0,0),(8,1,0,0),(9,1,0,0),(10,1,0,0),(11,1,0,0),(12,1,0,0),(13,1,0,0),(14,1,0,0),(15,1,0,0),(16,1,0,0),(17,1,0,0),(18,1,0,0),(19,1,0,0),(20,1,0,0),(21,1,0,0),(22,1,0,0),(23,1,0,0),(24,1,0,0),(25,1,0,0),(26,1,0,0),(27,1,0,0);
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor_available_course`
--

DROP TABLE IF EXISTS `professor_available_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professor_available_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `professor_id` int(11) NOT NULL,
  `available_course_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `professor_available_course_fk0` (`professor_id`),
  KEY `professor_available_course_fk1` (`available_course_id`),
  CONSTRAINT `professor_available_course_fk0` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`),
  CONSTRAINT `professor_available_course_fk1` FOREIGN KEY (`available_course_id`) REFERENCES `available_course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor_available_course`
--

LOCK TABLES `professor_available_course` WRITE;
/*!40000 ALTER TABLE `professor_available_course` DISABLE KEYS */;
INSERT INTO `professor_available_course` VALUES (3,1,18),(4,1,19),(5,1,21);
/*!40000 ALTER TABLE `professor_available_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `field_id` int(11) NOT NULL,
  `acronym` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `description` (`description`),
  KEY `program_fk0` (`field_id`),
  CONSTRAINT `program_fk0` FOREIGN KEY (`field_id`) REFERENCES `field` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES (1,'CIÊNCIA DA COMPUTAÇÃO',1,1,'CC'),(2,'TÉCNICO EM INFORMÁTICA',1,1,'TI');
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_periods`
--

DROP TABLE IF EXISTS `program_periods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program_periods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shift_id` int(11) NOT NULL,
  `periods_number` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `program_periods_fk0` (`shift_id`),
  KEY `program_periods_fk1` (`program_id`),
  CONSTRAINT `program_periods_fk0` FOREIGN KEY (`shift_id`) REFERENCES `shift` (`id`),
  CONSTRAINT `program_periods_fk1` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_periods`
--

LOCK TABLES `program_periods` WRITE;
/*!40000 ALTER TABLE `program_periods` DISABLE KEYS */;
INSERT INTO `program_periods` VALUES (1,1,2,1),(2,2,2,1),(3,2,2,2);
/*!40000 ALTER TABLE `program_periods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_structure`
--

DROP TABLE IF EXISTS `program_structure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program_structure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `program_id` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `program_structure_fk0` (`program_id`),
  CONSTRAINT `program_structure_fk0` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_structure`
--

LOCK TABLES `program_structure` WRITE;
/*!40000 ALTER TABLE `program_structure` DISABLE KEYS */;
INSERT INTO `program_structure` VALUES (1,1,'2014-2',1),(2,2,'2012-2',1);
/*!40000 ALTER TABLE `program_structure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_structure_courses`
--

DROP TABLE IF EXISTS `program_structure_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program_structure_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `program_structure_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `semester_number` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `program_structure_courses_fk0` (`program_structure_id`),
  KEY `program_structure_courses_fk1` (`course_id`),
  CONSTRAINT `program_structure_courses_fk0` FOREIGN KEY (`program_structure_id`) REFERENCES `program_structure` (`id`),
  CONSTRAINT `program_structure_courses_fk1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_structure_courses`
--

LOCK TABLES `program_structure_courses` WRITE;
/*!40000 ALTER TABLE `program_structure_courses` DISABLE KEYS */;
INSERT INTO `program_structure_courses` VALUES (1,2,1,1),(2,2,2,1),(3,2,3,1),(4,2,4,1),(5,2,5,1),(6,2,6,2),(7,2,7,2),(8,2,8,2),(9,2,9,3),(10,2,10,3),(11,2,11,3),(12,2,12,3),(13,2,13,4),(14,2,14,4),(15,2,15,4),(16,1,16,1),(17,1,17,1),(18,1,18,1),(19,1,19,1),(20,1,20,2),(21,1,21,2),(22,1,22,2),(23,1,23,2),(24,1,24,2),(25,1,25,3),(26,1,26,3),(27,1,27,3),(28,1,28,3),(29,1,29,3),(30,1,30,4),(31,1,31,4),(32,1,32,4),(33,1,33,4),(34,1,34,4),(35,1,35,5),(36,1,36,5),(37,1,37,5),(38,1,38,5),(39,1,8,5),(40,1,39,6),(41,1,40,6),(42,1,41,6),(43,1,42,6),(44,1,43,7),(45,1,44,7),(46,1,45,7),(47,1,46,7),(48,1,47,8),(49,1,48,8),(50,1,49,8),(51,1,50,8),(52,1,51,8),(53,1,52,8),(54,1,53,8),(55,1,54,8),(56,1,55,8),(57,1,56,8),(58,1,57,8),(59,1,58,8),(60,1,59,8),(61,1,60,8),(62,1,61,8),(63,1,62,8),(64,1,63,8),(65,1,64,8),(66,1,65,8),(67,1,66,8),(68,1,67,8),(69,1,68,8),(70,1,69,8),(71,1,70,8);
/*!40000 ALTER TABLE `program_structure_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `semester_id` int(11) NOT NULL,
  `prof_available_course_id` int(11) NOT NULL,
  `weekday_id` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL,
  `period_id` int(11) NOT NULL,
  `laboratory_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `schedule_fk0` (`semester_id`),
  KEY `schedule_fk1` (`prof_available_course_id`),
  KEY `schedule_fk2` (`weekday_id`),
  KEY `schedule_fk3` (`shift_id`),
  KEY `schedule_fk4` (`period_id`),
  KEY `schedule_fk5` (`laboratory_id`),
  CONSTRAINT `schedule_fk0` FOREIGN KEY (`semester_id`) REFERENCES `semester` (`id`),
  CONSTRAINT `schedule_fk1` FOREIGN KEY (`prof_available_course_id`) REFERENCES `professor_available_course` (`id`),
  CONSTRAINT `schedule_fk2` FOREIGN KEY (`weekday_id`) REFERENCES `weekday` (`id`),
  CONSTRAINT `schedule_fk3` FOREIGN KEY (`shift_id`) REFERENCES `shift` (`id`),
  CONSTRAINT `schedule_fk4` FOREIGN KEY (`period_id`) REFERENCES `period` (`id`),
  CONSTRAINT `schedule_fk5` FOREIGN KEY (`laboratory_id`) REFERENCES `laboratory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,1,3,1,1,1,NULL),(2,1,3,3,1,1,NULL),(3,1,5,2,2,1,NULL),(4,1,5,4,2,1,NULL);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester`
--

DROP TABLE IF EXISTS `semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `semester` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(6) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester`
--

LOCK TABLES `semester` WRITE;
/*!40000 ALTER TABLE `semester` DISABLE KEYS */;
INSERT INTO `semester` VALUES (1,'2018.2',1);
/*!40000 ALTER TABLE `semester` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shift` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shift`
--

LOCK TABLES `shift` WRITE;
/*!40000 ALTER TABLE `shift` DISABLE KEYS */;
INSERT INTO `shift` VALUES (1,'MANHÃ'),(3,'NOITE'),(2,'TARDE');
/*!40000 ALTER TABLE `shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `sex` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'JOARI',NULL,NULL,0),(2,'AGEBSON',NULL,NULL,0),(3,'AJALMAR',NULL,NULL,0),(4,'ANDERSON',NULL,NULL,0),(5,'AMAURI',NULL,NULL,0),(6,'SHARA',NULL,NULL,0),(7,'ADRIANO',NULL,NULL,0),(8,'CORNELI',NULL,NULL,0),(9,'SAULO',NULL,NULL,0),(10,'DANIEL ALENCAR',NULL,NULL,0),(11,'GABRIELA',NULL,NULL,0),(12,'SIQUEIRA',NULL,NULL,0),(13,'ELDER',NULL,NULL,0),(14,'FABIANA',NULL,NULL,0),(15,'JEFFERSON',NULL,NULL,0),(16,'IGOR',NULL,NULL,0),(17,'INACIO',NULL,NULL,0),(18,'JEAN',NULL,NULL,0),(19,'NIVANDO',NULL,NULL,0),(20,'OTAVIO',NULL,NULL,0),(21,'SANDRO',NULL,NULL,0),(22,'JONAS',NULL,NULL,0),(23,'DANIEL FERREIRA',NULL,NULL,0),(24,'WELLINGTON',NULL,NULL,0),(25,'ALISSON',NULL,NULL,0),(26,'THIAGO ALVES',NULL,NULL,0),(27,'THIAGO QUEIROZ',NULL,NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_auth`
--

DROP TABLE IF EXISTS `user_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL DEFAULT '1234',
  `profile` enum('secretary','professor','student') NOT NULL DEFAULT 'professor',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_UNIQUE` (`token`),
  KEY `user_auth_fk0` (`id`),
  CONSTRAINT `user_auth_fk0` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_auth`
--

LOCK TABLES `user_auth` WRITE;
/*!40000 ALTER TABLE `user_auth` DISABLE KEYS */;
INSERT INTO `user_auth` VALUES (1,'JOARI','1234','professor',1,NULL),(2,'AGEBSON','1234','professor',1,NULL),(3,'AJALMAR','1234','professor',1,NULL),(4,'ANDERSON','1234','professor',1,NULL),(5,'AMAURI','1234','professor',1,NULL),(6,'SHARA','1234','professor',1,NULL),(7,'ADRIANO','1234','professor',1,NULL),(8,'CORNELI','1234','professor',1,NULL),(9,'SAULO','1234','professor',1,NULL),(10,'DANIEL ALENCAR','1234','professor',1,NULL),(11,'GABRIELA','1234','professor',1,NULL),(12,'SIQUEIRA','1234','professor',1,NULL),(13,'ELDER','1234','professor',1,NULL),(14,'FABIANA','1234','professor',1,NULL),(15,'JEFFERSON','1234','professor',1,NULL),(16,'IGOR','1234','professor',1,NULL),(17,'INACIO','1234','professor',1,NULL),(18,'JEAN','1234','professor',1,NULL),(19,'NIVANDO','1234','professor',1,NULL),(20,'OTAVIO','1234','professor',1,NULL),(21,'SANDRO','1234','professor',1,NULL),(22,'JONAS','1234','professor',1,NULL),(23,'DANIEL FERREIRA','1234','professor',1,NULL),(24,'WELLINGTON','1234','professor',1,NULL),(25,'ALISSON','1234','professor',1,NULL),(26,'THIAGO ALVES','1234','professor',1,NULL),(27,'THIAGO QUEIROZ','1234','professor',1,NULL);
/*!40000 ALTER TABLE `user_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weekday`
--

DROP TABLE IF EXISTS `weekday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weekday` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weekday`
--

LOCK TABLES `weekday` WRITE;
/*!40000 ALTER TABLE `weekday` DISABLE KEYS */;
INSERT INTO `weekday` VALUES (3,'QUARTA'),(4,'QUINTA'),(6,'SÁBADO'),(1,'SEGUNDA'),(5,'SEXTA'),(2,'TERÇA');
/*!40000 ALTER TABLE `weekday` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-06 21:51:25
