/*
SQLyog Ultimate v12.5.1 (64 bit)
MySQL - 10.4.14-MariaDB : Database - doorprize
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`doorprize` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `doorprize`;

/*Table structure for table `doorprizes` */

DROP TABLE IF EXISTS `doorprizes`;

CREATE TABLE `doorprizes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `event` varchar(255) DEFAULT NULL,
  `doorprize` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `sisa` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `doorprizes` */

insert  into `doorprizes`(`id`,`event`,`doorprize`,`qty`,`sisa`,`createdAt`,`updatedAt`,`deletedAt`) values 
(1,'berdikasi','Voucher E-Wallet senilai 100.000',3,0,'0000-00-00 00:00:00','2022-09-11 19:33:19',NULL),
(2,'berdikasi','Voucher E-Wallet senilai 200.000',1,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(3,'berdikasi','Doorprize Tambahan',5,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL);

/*Table structure for table `participants` */

DROP TABLE IF EXISTS `participants`;

CREATE TABLE `participants` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `event` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `doorprizeId` bigint(20) unsigned DEFAULT NULL,
  `skip` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doorprizeId` (`doorprizeId`),
  CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`doorprizeId`) REFERENCES `doorprizes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4;

/*Data for the table `participants` */

insert  into `participants`(`id`,`event`,`name`,`doorprizeId`,`skip`,`createdAt`,`updatedAt`,`deletedAt`) values 
(1,'berdikasi','Zeph',NULL,NULL,'0000-00-00 00:00:00','2022-09-11 19:33:19',NULL),
(2,'berdikasi','Zephan',NULL,NULL,'0000-00-00 00:00:00','2022-09-11 19:33:19',NULL),
(3,'berdikasi','Zephaniah',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(4,'berdikasi','Zeralda',NULL,NULL,'0000-00-00 00:00:00','2022-09-11 19:33:19',NULL),
(5,'berdikasi','Zerelda',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(6,'berdikasi','Zerk',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(7,'berdikasi','Zerla',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(8,'berdikasi','Zerlina',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(9,'berdikasi','Zerline',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(10,'berdikasi','Zeta',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(11,'berdikasi','Zetana',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(12,'berdikasi','Zetes',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(13,'berdikasi','Zetta',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(14,'berdikasi','Zeus',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(15,'berdikasi','Zhang',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(16,'berdikasi','Zia',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(17,'berdikasi','Ziagos',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(18,'berdikasi','Zicarelli',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(19,'berdikasi','Ziegler',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(20,'berdikasi','Zielsdorf',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(21,'berdikasi','Zigmund',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(22,'berdikasi','Zigrang',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(23,'berdikasi','Ziguard',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(24,'berdikasi','Zilber',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(25,'berdikasi','Zildjian',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(26,'berdikasi','Zilla',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(27,'berdikasi','Zillah',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(28,'berdikasi','Zilvia',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(29,'berdikasi','Zima',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(30,'berdikasi','Zimmer',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(31,'berdikasi','Zimmerman',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(32,'berdikasi','Zimmermann',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(33,'berdikasi','Zina',NULL,NULL,'0000-00-00 00:00:00','2022-09-11 18:58:16',NULL),
(34,'berdikasi','Zinah',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(35,'berdikasi','Zinck',NULL,NULL,'0000-00-00 00:00:00','2022-09-11 18:58:16',NULL),
(36,'berdikasi','Zindman',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(37,'berdikasi','Zingale',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(38,'berdikasi','Zingg',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(39,'berdikasi','Zink',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(40,'berdikasi','Zinn',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(41,'berdikasi','Zinnes',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(42,'berdikasi','Zins',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(43,'berdikasi','Zipah',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(44,'berdikasi','Zipnick',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(45,'berdikasi','Zippel',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(46,'berdikasi','Zippora',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(47,'berdikasi','Zipporah',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 17:24:33',NULL),
(48,'berdikasi','Zirkle',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(49,'berdikasi','Zischke',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:10',NULL),
(50,'berdikasi','Zita',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(51,'berdikasi','Zitah',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(52,'berdikasi','Zitella',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(53,'berdikasi','Zitvaa',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(54,'berdikasi','Ziwot',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(55,'berdikasi','Zoa',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(56,'berdikasi','Zoara',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:10',NULL),
(57,'berdikasi','Zoarah',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(58,'berdikasi','Zoba',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:20:59',NULL),
(59,'berdikasi','Zobe',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(60,'berdikasi','Zobias',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(61,'berdikasi','Zobkiw',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(62,'berdikasi','Zoe',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(63,'berdikasi','Zoeller',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(64,'berdikasi','Zoellick',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(65,'berdikasi','Zoes',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(66,'berdikasi','Zoha',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(67,'berdikasi','Zohar',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(68,'berdikasi','Zohara',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(69,'berdikasi','Zoi',NULL,NULL,'0000-00-00 00:00:00','2022-09-11 18:58:16',NULL),
(70,'berdikasi','Zoie',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(71,'berdikasi','Zoila',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 17:25:00',NULL),
(72,'berdikasi','Zoilla',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(73,'berdikasi','Zola',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(74,'berdikasi','Zoldi',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(75,'berdikasi','Zoller',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(76,'berdikasi','Zollie',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(77,'berdikasi','Zolly',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:10',NULL),
(78,'berdikasi','Zolnay',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(79,'berdikasi','Zolner',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(80,'berdikasi','Zoltai',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:09',NULL),
(81,'berdikasi','Zonda',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:10',NULL),
(82,'berdikasi','Zondra',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:10',NULL),
(83,'berdikasi','Zonnya',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(84,'berdikasi','Zora',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(85,'berdikasi','Zorah',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 12:52:09',NULL),
(86,'berdikasi','Zorana',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(87,'berdikasi','Zorina',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:17:59',NULL),
(88,'berdikasi','Zorine',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 12:52:09',NULL),
(89,'berdikasi','Zosema',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:19:10',NULL),
(90,'berdikasi','Zosi',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(91,'berdikasi','Zosima',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(92,'berdikasi','Zoubek',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(93,'berdikasi','Zrike',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(94,'berdikasi','Zsa',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(95,'berdikasi','ZsaZsa',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(96,'berdikasi','Zsazsa',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(97,'berdikasi','Zsolway',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(98,'berdikasi','Zubkoff',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(99,'berdikasi','Zucker',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 16:44:22',NULL),
(100,'berdikasi','Zuckerman',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(101,'berdikasi','Zug',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(102,'berdikasi','Zulch',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(103,'berdikasi','Zuleika',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(104,'berdikasi','Zulema',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(105,'berdikasi','Zullo',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:00:11',NULL),
(106,'berdikasi','Zumstein',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(107,'berdikasi','Zumwalt',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(108,'berdikasi','Zurek',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(109,'berdikasi','Zurheide',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(110,'berdikasi','Zurkow',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(111,'berdikasi','Zurn',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(112,'berdikasi','Zusman',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(113,'berdikasi','Zuzana',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(114,'berdikasi','Zwart',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 13:00:11',NULL),
(115,'berdikasi','Zweig',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 16:44:22',NULL),
(116,'berdikasi','Zwick',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
(117,'berdikasi','Zwiebel',NULL,NULL,'0000-00-00 00:00:00','2022-09-07 16:44:22',NULL),
(118,'berdikasi','Zysk',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
