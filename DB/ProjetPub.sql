-- -----------------------------------------------------
-- Schema projetmajeure
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projetmajeure` DEFAULT CHARACTER SET utf8 ;
USE `projetmajeure` ;

DROP TABLE IF EXISTS `projetmajeure`.`screen_content`;
DROP TABLE IF EXISTS `projetmajeure`.`content`;
DROP TABLE IF EXISTS `projetmajeure`.`screen`;
DROP TABLE IF EXISTS `projetmajeure`.`device`;
DROP TABLE IF EXISTS `projetmajeure`.`user`;

-- -----------------------------------------------------
-- Table `projetmajeure`.`content`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projetmajeure`.`content` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` INT(11) NOT NULL,
  `index` INT(11) NOT NULL,
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
  `template` INT(11) NULL DEFAULT '1',
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




INSERT INTO `projetmajeure`.`device` (`orientation`, `longueur`,`hauteur`, `latitude`, `longitude`,`ville`,`type`) VALUES
('portrait', '1256','3256', '3.14957', '4.124569', 'lyon', 'smartphone'),
('paysage', '1256','3256', '9.145797','3.14957', 'lyon', 'television'),
('paysage', '1256' , '3256','3.14957','4.12457', 'paris', 'smartphone'),
('portrait','2023','1451','41.12457','54.12457','paris', 'tablet' ),
('portrait','2023','1451','41.12457','54.12457','lyon', 'television' );


INSERT INTO `projetmajeure`.`user` ( `email`, `password`, `name`, `role`) VALUES 
('manager@manager.com', 'manager', 'Manager', '1'),
('admin@admin.com', 'admin', 'Admin', '0'),
('device1@device.com', 'device', 'Device', '2'),
('device2@device.com', 'device', 'Device', '2'),
('device3@device.com', 'device', 'Device', '2'),
('device4@device.com', 'device', 'Device', '2'),
('device5@device.com', 'device', 'Device', '2'),
('blop@blop.com', 'blop', 'bloppy', '1'),
('john@doe.com', 'john', 'John Doe', '1'),
('tada@tada.com', 'tada', 'tada','0'),
('qiuh@.com', 'sqsq', 'kqjsb', '0');
        
INSERT INTO `projetmajeure`.`screen` ( `id_manager` , `id_device` , `template`, `empty`) VALUES
( '1' , '1', '1', '1'),
('1','2','2','1'),
('1','3','3','1'),
('1','4','4','0'),
('1','5','5','0');

-- -- type
-- 1: image from url
-- 2: image from server
-- 3: 
-- 4: twitter
-- 5: youtube

INSERT INTO `projetmajeure`.`content` (`type`, `index`, `param1`) VALUES
('1','0','https://media.giphy.com/media/ydqa5IEFvZNT2/giphy.gif'),
('5', '0', 'CkTd-7myyEw'),
('1','0','https://s-media-cache-ak0.pinimg.com/originals/85/9c/8c/859c8c7d9393442fc83ae50107ef161b.gif'),
('4','1','ray_ban'),
('1','0','https://media.giphy.com/media/2H3HUJCJWVMcw/giphy.gif'),
('1','1','http://sneakerb0b.de/releases/wp-content/uploads/2015/02/xeno-zx-flux.gif'),
('4','2','adidas'),
('1','0','https://68.media.tumblr.com/0001fbc97153d5279b29e1f33827f332/tumblr_no2cpbqKzI1qlwl18o1_500.gif'),
('4','1','Nike'),
('5', '2', 'AK2U977acCE');


INSERT INTO `projetmajeure`.`screen_content` (`id_screen`, `id_content`) VALUES
('1','1'),
('2','2'),
('3','3'),
('3','4'),
('4', '5'),
('4', '6'),
('4', '7'),
('5','8'),
('5','9'),
('5','10');

INSERT INTO `projetmajeure`.`device` (`orientation`, `longueur`,`hauteur`, `latitude`, `longitude`,`ville`,`type`) VALUES
('portrait', '1256','3256', '45.7607', '4.8354', 'lyon', 'smartphone'),
('paysage', '1256','3256', '45.749','4.8417', 'lyon', 'television'),
('paysage', '1256' , '3256','45.782','4.8773', 'lyon', 'smartphone'),
('paysage', '1256' , '3256','48.8594','2.3416', 'paris', 'smartphone');


INSERT INTO `projetmajeure`.`user` ( `email`, `password`, `name`, `role`) VALUES 
('manager1@manager.com', 'manager1', 'Manager1', '1'),
('manager2@manager.com', 'manager2', 'Manager1', '1'),
('manager3@manager.com', 'manager3', 'Manager1', '1');


INSERT INTO `projetmajeure`.`screen` ( `id_manager` , `id_device` , `template`, `empty`) VALUES
( '1' , '1', '1', '1'),
('1','2','2','1'),
('1','3','3','1');