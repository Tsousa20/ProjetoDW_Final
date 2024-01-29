CREATE DATABASE  IF NOT EXISTS `burgershop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `burgershop`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: burgershop
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owners` (
  `owner_id` int NOT NULL AUTO_INCREMENT,
  `owner_name` varchar(20) DEFAULT NULL,
  `owner_user_name` varchar(20) DEFAULT NULL,
  `owner_passwd` varchar(20) DEFAULT NULL,
  `owner_about` varchar(250) DEFAULT NULL,
  `owner_image` varchar(250) DEFAULT NULL,
  `owner_about_descrp` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,'Tiago Sousa','tiago_sousad11','testeTiagoSousa','This is the man who keeps the ship steady. With a knack for numbers and a heart for sustainability, he ensures that BURGER D11 not only serves top quality burgers but does so with a mindful approach to business.','images/Tiago_Sousa.jpg','Business Strategist'),(2,'Rodrigo Anjos','rodrigod11','testeRodrigo','Meet Rodrigo, the creative force behind BURGER D11. With an artistic eye, he is the one who transforms your experience into more than just a meal. From designing the menu, decorating the restaurant, he delivers a warm and inviting atmosphere.','images/Rodrigo_Anjos.jpg','Creative Soul'),(3,'Tiago Lança','tiago_lançad11','testeTiagoLança','Meet the chef of BURGER D11, his love for burgers originated in his kitchen with all kinds of experiments, and keeps getting bigger. His enthusiasm to discover new and better recipes is on fire. He delivers top quality and tasty burgers to everyone.','images/Tiago_Lança.jpg','Chef and Burger Enthusiast'),(4,'Daniel Martins','danield11','testeDaniel','Daniel knows his ways around the grill like no one else. His commitment to achieving the perfect sear and crafting the juiciest burgers for a consistently delicious experience. ','images/Daniel_Martins.jpg','Grill Expert');
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-29  9:51:51
