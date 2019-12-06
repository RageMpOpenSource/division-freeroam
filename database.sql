DROP DATABASE IF EXISTS `division-freeroam`;
CREATE DATABASE `division-freeroam`;

DROP TABLE IF EXISTS `division-freeroam`.`accounts`;
CREATE TABLE `division-freeroam`.`accounts` (
	`ID` INT NOT NULL AUTO_INCREMENT,
    `Identity` VARCHAR(32) NOT NULL,
    `Username` VARCHAR(50),
    `Level` INT NOT NULL DEFAULT(1),
    `Outfit` JSON,
    `Money` INT NOT NULL DEFAULT(5000),
    PRIMARY KEY(`ID`)
);