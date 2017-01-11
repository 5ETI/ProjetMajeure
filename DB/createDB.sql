-- -----------------------------------------------------
-- Schema projetmajeure
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projetmajeure` DEFAULT CHARACTER SET utf8 ;
USE `projetmajeure` ;

DROP TABLE IF EXISTS `ProjetMajeure`.`screen_content`;
DROP TABLE IF EXISTS `ProjetMajeure`.`content`;
DROP TABLE IF EXISTS `ProjetMajeure`.`screen`;
DROP TABLE IF EXISTS `ProjetMajeure`.`device`;
DROP TABLE IF EXISTS `ProjetMajeure`.`user`;

-- -----------------------------------------------------
-- Table `projetmajeure`.`content`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projetmajeure`.`content` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` INT(11) NOT NULL,
  `param1` VARCHAR(200) NULL DEFAULT NULL,
  `param2` VARCHAR(100) NULL DEFAULT NULL,
  `param3` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `projetmajeure`.`device`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projetmajeure`.`device` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `orientation` VARCHAR(45) NOT NULL,
  `longueur` INT(11) NOT NULL,
  `hauteur` INT(11) NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `ville` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `projetmajeure`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projetmajeure`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `role` INT(11) NULL DEFAULT NULL,
  `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `projetmajeure`.`screen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projetmajeure`.`screen` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_manager` INT(11) NOT NULL,
  `id_device` INT(11) NOT NULL,
  `template` INT(11) NOT NULL,
  `empty` INT(11) NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  INDEX `fk_manager` (`id_manager` ASC),
  INDEX `fk_device` (`id_device` ASC),
  CONSTRAINT `fk_device`
    FOREIGN KEY (`id_device`)
    REFERENCES `projetmajeure`.`device` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_manager`
    FOREIGN KEY (`id_manager`)
    REFERENCES `projetmajeure`.`user` (`id`)
    ON DELETE CASCADE);


-- -----------------------------------------------------
-- Table `projetmajeure`.`screen_content`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projetmajeure`.`screen_content` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_screen` INT(11) NOT NULL,
  `id_content` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_screen` (`id_screen` ASC),
  INDEX `fk_content` (`id_content` ASC),
  CONSTRAINT `fk_content`
    FOREIGN KEY (`id_content`)
    REFERENCES `projetmajeure`.`content` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_screen`
    FOREIGN KEY (`id_screen`)
    REFERENCES `projetmajeure`.`screen` (`id`)
    ON DELETE CASCADE);




INSERT INTO `ProjetMajeure`.`device` (`orientation`, `longueur`,`hauteur`, `latitude`, `longitude`,`ville`,`type`) VALUES
('portrait', '1256','3256', '3.14957', '4.124569', 'lyon', 'smartphone'),
('paysage', '1256','3256', '9.145797','3.14957', 'lyon', 'television'),
('paysage', '1256' , '3256','3.14957','4.12457', 'paris', 'smartphone'),
('portrait','2023','1451','41.12457','54.12457','paris', 'tablet' );
('portrait','2023','1451','41.12457','54.12457','lyon', 'television' );


INSERT INTO `ProjetMajeure`.`user` ( `email`, `password`, `name`, `role`) VALUES 
('admin@admin.com', 'admin', 'Admin', '0'),
('manager@manager.com', 'manager', 'Manager', '1'),
('device@device.com', 'device', 'Device', '2'),
('blop@blop.com', 'blop', 'bloppy', '1'),
('john@doe.com', 'john', 'John Doe', '1'),
('tada@tada.com', 'tada', 'tada','0'),
('qiuh@.com', 'sqsq', 'kqjsb', '0');
        
INSERT INTO `ProjetMajeure`.`screen` ( `id_manager` , `id_device` , `template`, `empty`) VALUES
( '1' , '1', '1', '1'),
('1','2','2','1'),
('1','3','3','1'),
('1','4','4','0');

-- -- type
-- 1: image from url
-- 2: image from server
-- 3: 
INSERT INTO `ProjetMajeure`.`content` (`type`, `param1`) VALUES
('1','https://2.bp.blogspot.com/-1uomnDoZnL4/VvxZ8b48FQI/AAAAAAAAAA4/enA1I3kI0EI7ksBUUKKY9JAv-s63av3Og/s1600/adidas-trefoil-logo.png'),
('1','https://s-media-cache-ak0.pinimg.com/originals/21/30/92/213092bb095740f64911a9d1cae408c9.jpg'),
('2','path/to/define'),
('1','514454');

INSERT INTO `projetmajeure`.`screen_content` (`id_screen`, `id_content`) VALUES
('4', '1'),
('4', '2'),
('3','3'),
('3','4');
