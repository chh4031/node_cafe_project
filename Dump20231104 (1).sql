-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: cafedb
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
INSERT INTO `sessions` VALUES ('2tNlqle662cK5HXDUmJ4xqx7eXq4tya3',1699090317,'{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-11-04T09:26:09.216Z\",\"httpOnly\":true,\"path\":\"/\"},\"loginInfo\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `고객`
--

DROP TABLE IF EXISTS `고객`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `고객` (
  `고객아이디` varchar(20) NOT NULL,
  `고객비밀번호` varchar(20) NOT NULL,
  `고객이름` varchar(20) NOT NULL,
  `주소` varchar(50) NOT NULL,
  `휴대폰번호` varchar(20) NOT NULL,
  PRIMARY KEY (`고객아이디`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `고객`
--

LOCK TABLES `고객` WRITE;
/*!40000 ALTER TABLE `고객` DISABLE KEYS */;
INSERT INTO `고객` VALUES ('cho','1111','조','NN1308','0513201897'),('kim','2222','김','NM246','01022223333'),('Lee','5555','이','NM244','0513204456'),('moon','3333','문','NM247','0513201702'),('park','4444','박','NM245','01011112222');
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
  `재료_재료이름` varchar(10) NOT NULL,
  `주문양` int NOT NULL,
  `주문가격` int NOT NULL,
  `납품날짜` varchar(20) NOT NULL,
  `주문단위` varchar(20) NOT NULL,
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
  `공급업체이름` varchar(20) NOT NULL,
  `공급업체주소` varchar(50) NOT NULL,
  PRIMARY KEY (`공급업체번호`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `공급업체`
--

LOCK TABLES `공급업체` WRITE;
/*!40000 ALTER TABLE `공급업체` DISABLE KEYS */;
/*!40000 ALTER TABLE `공급업체` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `메뉴단위`
--

DROP TABLE IF EXISTS `메뉴단위`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `메뉴단위` (
  `주문_주문날짜` int NOT NULL,
  `주문_고객_고객아이디` varchar(20) NOT NULL,
  `메뉴항목_항목번호` int NOT NULL,
  `주문수량` int DEFAULT NULL,
  `주문가격` int DEFAULT NULL,
  PRIMARY KEY (`주문_주문날짜`,`주문_고객_고객아이디`,`메뉴항목_항목번호`),
  KEY `fk_주문_has_메뉴항목_메뉴항목1_idx` (`메뉴항목_항목번호`),
  KEY `fk_주문_has_메뉴항목_주문1_idx` (`주문_주문날짜`,`주문_고객_고객아이디`),
  CONSTRAINT `fk_주문_has_메뉴항목_메뉴항목1` FOREIGN KEY (`메뉴항목_항목번호`) REFERENCES `메뉴항목` (`항목번호`),
  CONSTRAINT `fk_주문_has_메뉴항목_주문1` FOREIGN KEY (`주문_주문날짜`, `주문_고객_고객아이디`) REFERENCES `주문` (`주문날짜`, `고객_고객아이디`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `메뉴단위`
--

LOCK TABLES `메뉴단위` WRITE;
/*!40000 ALTER TABLE `메뉴단위` DISABLE KEYS */;
/*!40000 ALTER TABLE `메뉴단위` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `메뉴항목`
--

DROP TABLE IF EXISTS `메뉴항목`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `메뉴항목` (
  `항목번호` int NOT NULL,
  `이름` varchar(20) NOT NULL,
  `가격` int NOT NULL,
  `분류` varchar(20) NOT NULL,
  PRIMARY KEY (`항목번호`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `메뉴항목`
--

LOCK TABLES `메뉴항목` WRITE;
/*!40000 ALTER TABLE `메뉴항목` DISABLE KEYS */;
INSERT INTO `메뉴항목` VALUES (1001,'아메리카노',1500,'커피'),(1002,'카페라떼',2000,'커피'),(1003,'키푸치노',2500,'커피');
/*!40000 ALTER TABLE `메뉴항목` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `재료`
--

DROP TABLE IF EXISTS `재료`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `재료` (
  `재료이름` varchar(10) NOT NULL,
  `재료양` varchar(10) NOT NULL,
  PRIMARY KEY (`재료이름`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `재료`
--

LOCK TABLES `재료` WRITE;
/*!40000 ALTER TABLE `재료` DISABLE KEYS */;
/*!40000 ALTER TABLE `재료` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `조합법`
--

DROP TABLE IF EXISTS `조합법`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `조합법` (
  `메뉴항목_항목번호` int NOT NULL,
  `재료_재료이름` varchar(10) NOT NULL,
  `필요양` varchar(10) NOT NULL,
  PRIMARY KEY (`메뉴항목_항목번호`,`재료_재료이름`),
  KEY `fk_메뉴항목_has_재료_재료1_idx` (`재료_재료이름`),
  KEY `fk_메뉴항목_has_재료_메뉴항목1_idx` (`메뉴항목_항목번호`),
  CONSTRAINT `fk_메뉴항목_has_재료_메뉴항목1` FOREIGN KEY (`메뉴항목_항목번호`) REFERENCES `메뉴항목` (`항목번호`),
  CONSTRAINT `fk_메뉴항목_has_재료_재료1` FOREIGN KEY (`재료_재료이름`) REFERENCES `재료` (`재료이름`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `조합법`
--

LOCK TABLES `조합법` WRITE;
/*!40000 ALTER TABLE `조합법` DISABLE KEYS */;
/*!40000 ALTER TABLE `조합법` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `주문`
--

DROP TABLE IF EXISTS `주문`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `주문` (
  `주문날짜` int NOT NULL,
  `고객_고객아이디` varchar(20) NOT NULL,
  `주문방식` varchar(20) NOT NULL,
  PRIMARY KEY (`주문날짜`,`고객_고객아이디`),
  KEY `fk_주문_고객_idx` (`고객_고객아이디`),
  CONSTRAINT `fk_주문_고객` FOREIGN KEY (`고객_고객아이디`) REFERENCES `고객` (`고객아이디`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `주문`
--

LOCK TABLES `주문` WRITE;
/*!40000 ALTER TABLE `주문` DISABLE KEYS */;
/*!40000 ALTER TABLE `주문` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-04 17:38:47
