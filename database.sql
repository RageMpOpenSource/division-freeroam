DROP DATABASE IF EXISTS `division-freeroam`;
CREATE DATABASE `division-freeroam`;

DROP TABLE IF EXISTS `division-freeroam`.`accounts`;
CREATE TABLE `division-freeroam`.`accounts` (
	`ID` INT NOT NULL AUTO_INCREMENT,
    `Identity` VARCHAR(32) NOT NULL,
    `Username` VARCHAR(50),
    `RegDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `LastActive` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Password` VARCHAR(60),
    `Level` smallint(6) UNSIGNED NOT NULL DEFAULT 1,
    `Experience` int(11) UNSIGNED NOT NULL DEFAULT 0,
    `Group` tinyint UNSIGNED NOT NULL DEFAULT 0,
    `Outfit` JSON,
    `Money` INT NOT NULL DEFAULT(5000),
    `Prisoned` BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY(`ID`)
);

DROP TABLE IF EXISTS `division-freeroam`.`groups`;
CREATE TABLE `division-freeroam`.`groups` (
  `ID` tinyint UNSIGNED NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Protected` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY(`ID`)
);

INSERT INTO `division-freeroam`.`groups` (`id`, `name`, `protected`) VALUES
(255, 'Owner', 1),
(0, 'Guest', 1),
(1, 'Member', 1),
(2, 'Donator', 0),
(102, 'Admin', 1),
(100, 'Moderator', 1);