-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: cafeproject
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('-MRKIdVHUtHeR-aAK2ygaFzwlTkDnm9u',1699882463,'{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-11-13T13:34:16.150Z\",\"httpOnly\":true,\"path\":\"/\"},\"userid\":\"admin\"}'),('UnQfYaoEOVwD9--nWiQ_TDYsIe6JfpiP',1699879119,'{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-11-13T11:47:18.284Z\",\"httpOnly\":true,\"path\":\"/\"},\"userid\":\"cho\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `고객`
--

DROP TABLE IF EXISTS `고객`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `고객` (
  `아이디` varchar(45) NOT NULL,
  `이름` varchar(45) NOT NULL,
  `주소` varchar(45) NOT NULL,
  `전화번호` varchar(45) NOT NULL,
  PRIMARY KEY (`아이디`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `고객`
--

LOCK TABLES `고객` WRITE;
/*!40000 ALTER TABLE `고객` DISABLE KEYS */;
INSERT INTO `고객` VALUES ('admin','관리자','지구','01000000000'),('cho','큰수','부산시','01099998888'),('moon','달님','부산시','01055554444'),('park','쌀','부산시','01022224444');
/*!40000 ALTER TABLE `고객` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `공급`
--

DROP TABLE IF EXISTS `공급`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `공급` (
  `공급업체_공급업체번호` int NOT NULL,
  `재료_재료이름` varchar(45) NOT NULL,
  `주문양` int NOT NULL,
  `주문가격` int NOT NULL,
  `납품날짜` varchar(45) NOT NULL,
  `주문단위` varchar(45) NOT NULL,
  PRIMARY KEY (`공급업체_공급업체번호`,`재료_재료이름`),
  KEY `fk_공급업체_has_재료_재료1_idx` (`재료_재료이름`),
  KEY `fk_공급업체_has_재료_공급업체1_idx` (`공급업체_공급업체번호`),
  CONSTRAINT `fk_공급업체_has_재료_공급업체1` FOREIGN KEY (`공급업체_공급업체번호`) REFERENCES `공급업체` (`공급업체번호`),
  CONSTRAINT `fk_공급업체_has_재료_재료1` FOREIGN KEY (`재료_재료이름`) REFERENCES `재료` (`재료이름`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `공급`
--

LOCK TABLES `공급` WRITE;
/*!40000 ALTER TABLE `공급` DISABLE KEYS */;
INSERT INTO `공급` VALUES (201,'물',500,5000,'2024-01-01','g'),(202,'설탕',1000,7000,'2024-01-01','g'),(202,'커피원두',2000,9000,'2024-01-01','mg');
/*!40000 ALTER TABLE `공급` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `공급업체`
--

DROP TABLE IF EXISTS `공급업체`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `공급업체` (
  `공급업체번호` int NOT NULL,
  `공급업체이름` varchar(45) NOT NULL,
  `공급업체주소` varchar(45) NOT NULL,
  PRIMARY KEY (`공급업체번호`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `공급업체`
--

LOCK TABLES `공급업체` WRITE;
/*!40000 ALTER TABLE `공급업체` DISABLE KEYS */;
INSERT INTO `공급업체` VALUES (201,'동서식품','부산시'),(202,'울산식품','울산시');
/*!40000 ALTER TABLE `공급업체` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `레시피`
--

DROP TABLE IF EXISTS `레시피`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `레시피` (
  `메뉴항목_항목번호` int NOT NULL,
  `재료_재료이름` varchar(45) NOT NULL,
  `필요양` int NOT NULL,
  PRIMARY KEY (`메뉴항목_항목번호`,`재료_재료이름`),
  KEY `fk_메뉴항목_has_재료_재료1_idx` (`재료_재료이름`),
  KEY `fk_메뉴항목_has_재료_메뉴항목1_idx` (`메뉴항목_항목번호`),
  CONSTRAINT `fk_메뉴항목_has_재료_메뉴항목1` FOREIGN KEY (`메뉴항목_항목번호`) REFERENCES `메뉴항목` (`항목번호`),
  CONSTRAINT `fk_메뉴항목_has_재료_재료1` FOREIGN KEY (`재료_재료이름`) REFERENCES `재료` (`재료이름`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `레시피`
--

LOCK TABLES `레시피` WRITE;
/*!40000 ALTER TABLE `레시피` DISABLE KEYS */;
INSERT INTO `레시피` VALUES (500,'물',100),(500,'커피원두',10),(501,'물',100),(501,'설탕',5),(501,'커피원두',5),(502,'물',10),(502,'커피원두',1);
/*!40000 ALTER TABLE `레시피` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `메뉴항목`
--

DROP TABLE IF EXISTS `메뉴항목`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `메뉴항목` (
  `항목번호` int NOT NULL,
  `메뉴이름` varchar(45) NOT NULL,
  `메뉴가격` varchar(45) NOT NULL,
  `메뉴분류` varchar(45) NOT NULL,
  PRIMARY KEY (`항목번호`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `메뉴항목`
--

LOCK TABLES `메뉴항목` WRITE;
/*!40000 ALTER TABLE `메뉴항목` DISABLE KEYS */;
INSERT INTO `메뉴항목` VALUES (500,'아메리카누','1500','커피'),(501,'카페라뗴','2000','커피'),(502,'자판기커피','500','사이드');
/*!40000 ALTER TABLE `메뉴항목` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `장바구니`
--

DROP TABLE IF EXISTS `장바구니`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `장바구니` (
  `장바구니식별_장바구니번호` int NOT NULL,
  `메뉴항목_항목번호` int NOT NULL,
  `수량` int NOT NULL,
  `수량금액` int NOT NULL,
  PRIMARY KEY (`장바구니식별_장바구니번호`,`메뉴항목_항목번호`),
  KEY `fk_메뉴항목_has_장바구니식별_장바구니식별1_idx` (`장바구니식별_장바구니번호`),
  KEY `fk_메뉴항목_has_장바구니식별_메뉴항목1_idx` (`메뉴항목_항목번호`),
  CONSTRAINT `fk_메뉴항목_has_장바구니식별_메뉴항목1` FOREIGN KEY (`메뉴항목_항목번호`) REFERENCES `메뉴항목` (`항목번호`),
  CONSTRAINT `fk_메뉴항목_has_장바구니식별_장바구니식별1` FOREIGN KEY (`장바구니식별_장바구니번호`) REFERENCES `장바구니식별` (`장바구니번호`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `장바구니`
--

LOCK TABLES `장바구니` WRITE;
/*!40000 ALTER TABLE `장바구니` DISABLE KEYS */;
/*!40000 ALTER TABLE `장바구니` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `장바구니식별`
--

DROP TABLE IF EXISTS `장바구니식별`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `장바구니식별` (
  `장바구니번호` int NOT NULL AUTO_INCREMENT,
  `고객_아이디` varchar(45) NOT NULL,
  PRIMARY KEY (`장바구니번호`),
  KEY `fk_장바구니식별_고객1_idx` (`고객_아이디`),
  CONSTRAINT `fk_장바구니식별_고객1` FOREIGN KEY (`고객_아이디`) REFERENCES `고객` (`아이디`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `장바구니식별`
--

LOCK TABLES `장바구니식별` WRITE;
/*!40000 ALTER TABLE `장바구니식별` DISABLE KEYS */;
INSERT INTO `장바구니식별` VALUES (13,'admin'),(10,'cho'),(12,'moon'),(11,'park');
/*!40000 ALTER TABLE `장바구니식별` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `재료`
--

DROP TABLE IF EXISTS `재료`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `재료` (
  `재료이름` varchar(45) NOT NULL,
  `재료량` int NOT NULL,
  PRIMARY KEY (`재료이름`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `재료`
--

LOCK TABLES `재료` WRITE;
/*!40000 ALTER TABLE `재료` DISABLE KEYS */;
INSERT INTO `재료` VALUES ('물',51400),('설탕',54995),('커피원두',59000);
/*!40000 ALTER TABLE `재료` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `주문`
--

DROP TABLE IF EXISTS `주문`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `주문` (
  `주문번호` int NOT NULL AUTO_INCREMENT,
  `고객_아이디` varchar(45) NOT NULL,
  `주문날짜` varchar(45) NOT NULL,
  `주문방식` varchar(45) NOT NULL,
  `총금액` int NOT NULL,
  PRIMARY KEY (`주문번호`),
  KEY `fk_주문_고객_idx` (`고객_아이디`),
  CONSTRAINT `fk_주문_고객` FOREIGN KEY (`고객_아이디`) REFERENCES `고객` (`아이디`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `주문`
--

LOCK TABLES `주문` WRITE;
/*!40000 ALTER TABLE `주문` DISABLE KEYS */;
INSERT INTO `주문` VALUES (14,'cho','2023-11-12','카드',55000),(15,'cho','2023-11-12','카드',1500),(16,'cho','2023-11-12','카드',150277500),(17,'cho','2023-11-13','카드',15000),(18,'cho','2023-11-13','카드',2000),(19,'cho','2023-11-13','카드',500),(20,'cho','2023-11-13','카드',1500),(21,'cho','2023-11-13','카드',500),(22,'cho','2023-11-13','카드',500),(23,'cho','2023-11-13','카드',500),(24,'cho','2023-11-13','카드',1500),(25,'cho','2023-11-13','카드',500),(26,'cho','2023-11-13','카드',500),(27,'cho','2023-11-13','카드',500),(28,'cho','2023-11-13','카드',41500),(29,'cho','2023-11-13','카드',2500),(30,'cho','2023-11-13','카드',17000),(31,'cho','2023-11-13','카드',3500),(32,'cho','2023-11-13','카드',150000);
/*!40000 ALTER TABLE `주문` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `주문내역`
--

DROP TABLE IF EXISTS `주문내역`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `주문내역` (
  `주문_주문번호` int NOT NULL,
  `메뉴항목_항목번호` int NOT NULL,
  `수량금액` int NOT NULL,
  `수량` int NOT NULL,
  PRIMARY KEY (`주문_주문번호`,`메뉴항목_항목번호`),
  KEY `fk_메뉴항목_has_주문_메뉴항목1_idx` (`메뉴항목_항목번호`),
  KEY `fk_주문내역_주문1_idx` (`주문_주문번호`),
  CONSTRAINT `fk_메뉴항목_has_주문_메뉴항목1` FOREIGN KEY (`메뉴항목_항목번호`) REFERENCES `메뉴항목` (`항목번호`),
  CONSTRAINT `fk_주문내역_주문1` FOREIGN KEY (`주문_주문번호`) REFERENCES `주문` (`주문번호`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `주문내역`
--

LOCK TABLES `주문내역` WRITE;
/*!40000 ALTER TABLE `주문내역` DISABLE KEYS */;
INSERT INTO `주문내역` VALUES (14,500,15000,10),(14,501,40000,20),(15,500,1500,1),(16,500,150000000,100000),(16,502,277500,555),(17,500,15000,10),(18,501,2000,1),(19,502,500,1),(20,500,1500,1),(21,502,500,1),(22,502,500,1),(23,502,500,1),(24,500,1500,1),(25,502,500,1),(26,502,500,1),(27,502,500,1),(28,500,1500,1),(28,501,40000,20),(29,501,2000,1),(29,502,500,1),(30,500,15000,10),(30,501,2000,1),(31,500,1500,1),(31,501,2000,1),(32,500,150000,100);
/*!40000 ALTER TABLE `주문내역` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-13 21:35:47
