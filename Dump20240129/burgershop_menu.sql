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
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `menu_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(25) DEFAULT NULL,
  `ingredients` varchar(200) DEFAULT NULL,
  `item_sign_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Hamburger','130g acém, ketchup, pickles','D1'),(2,'Hamburger','130g acém, ketchup, pickles, cheddar','D2'),(3,'Hamburger','130g acém, ketchup, pickles, bacon','D3'),(4,'Hamburger','130g acém, ketchup, pickles, alface, tomate, cheddar, bacon','D4'),(5,'Hamburger','130g acém, maionese de alho, pickles, cebola caramelizada','D5'),(6,'Hamburger','130g acém, ketchup, cheddar, aros de cebola','D6'),(7,'Hamburger','130g picanha, rucula, redução de balsamico, cheddar','D7'),(8,'Hamburger','130g frango panado, maionese picante, ketchup, bacon','D8'),(9,'Hamburger','Tofu marinado panado, maionese de alho, cebolinho, cogumelos shitake','D9'),(10,'Hamburger','Hamburguer de grão, maionese de abacate e lima, queijo vegan','D10'),(11,'Hamburger','260g acém, ketchup, pickles, cheddar, bacon','D11'),(12,'Acompanhamentos','Batatas Fritas com Cheddar e Bacon',NULL),(13,'Acompanhamentos','Batatas Fritas em rodela',NULL),(14,'Acompanhamentos','Aros de Cebola',NULL),(15,'Acompanhamentos','Nuggets de Frango',NULL),(16,'Bebidas','Água',NULL),(17,'Bebidas','Limonada',NULL),(18,'Bebidas','Groselha',NULL),(19,'Bebidas','Milkshake de Morango',NULL),(20,'Bebidas','Milkshake de Chocolate',NULL),(21,'Sobremesas','Cheesecake',NULL),(22,'Sobremesas','Crumble de maçã',NULL),(23,'Sobremesas','Crepe com chocolate',NULL),(24,'Sobremesas','Bolo de bolacha',NULL),(25,'Sobremesas','Bolo de chocolate',NULL),(26,'Sobremesas','Gelado morango/chocolate/baunilha',NULL);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
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
