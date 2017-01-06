USE `ProjetMajeure`;
DROP TABLE IF EXISTS `ProjetMajeure`.`screen`;
DROP TABLE IF EXISTS `ProjetMajeure`.`device`;
DROP TABLE IF EXISTS `ProjetMajeure`.`user`;


CREATE TABLE `ProjetMajeure`.`device` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `orientation` VARCHAR(45) NOT NULL,
 `longueur` INT NOT NULL,
 `hauteur` INT NOT NULL,
 `latitude` FLOAT NOT NULL,
 `longitude` FLOAT NOT NULL,
 `ville` VARCHAR(45) NOT NULL,
 `type` VARCHAR(45) NOT NULL,
 PRIMARY KEY (`id`));

INSERT INTO `ProjetMajeure`.`device` (`orientation`, `longueur`,`hauteur`, `latitude`, `longitude`,`ville`,`type`) 
VALUES 	('portrait', '1256','3256', '3.14957', '4.124569', 'lyon', 'smartphone'),
('paysage', '1256','3256', '9.145797','3.14957', 'lyon', 'television'),
('paysage', '1256' , '3256','3.14957','4.12457', 'paris', 'smartphone'),
('portrait','2023','1451','41.12457','54.12457','paysage', 'tablet' );

CREATE TABLE `ProjetMajeure`.`user` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `email` VARCHAR(45) NOT NULL,
 `password` VARCHAR(45) NOT NULL,
 `name` VARCHAR(45) NULL,
 `role` INT,
 `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`));


INSERT INTO `ProjetMajeure`.`user` ( `email`, `password`, `name`, `role`) 
VALUES 	('admin@admin.com', 'admin', 'Admin', '0'),
		('manager@manager.com', 'manager', 'Manager', '1'),
		('device@device.com', 'device', 'Device', '2'),
        ('blop@blop.com', 'blop', 'bloppy', '1'),
		('john@doe.com', 'john', 'John Doe', '1'),
		('tada@tada.com', 'tada', 'tada','0'),
		('qiuh@.com', 'sqsq', 'kqjsb', '0');
        
        
CREATE TABLE `ProjetMajeure`.`screen` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `id_manager` INT NOT NULL,
 `id_device` INT NOT NULL,
 `template` INT NOT NULL,
 PRIMARY KEY (`id`),
 CONSTRAINT fk_manager FOREIGN KEY (id_manager) REFERENCES user(id) ON DELETE CASCADE,
 CONSTRAINT fk_device FOREIGN KEY (id_device) REFERENCES device(id) ON DELETE CASCADE
);

INSERT INTO `ProjetMajeure`.`screen` ( `id_manager` , `id_device` , `template`) VALUES
( '1' , '1', '1'),
('1','2','2'),
('1','3','3'),
('1','4','4');