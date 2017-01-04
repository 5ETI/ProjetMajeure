DROP TABLE IF EXISTS `ProjetMajeure`.`device`;
DROP TABLE IF EXISTS `ProjetMajeure`.`user`;

CREATE TABLE `ProjetMajeure`.`device` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `orientation` VARCHAR(45) NOT NULL,
 `longueur` INT NOT NULL,
 `hauteur` INT NOT NULL,
 `latitude` FLOAT NOT NULL,
 `longitude` FLOAT NOT NULL,
 PRIMARY KEY (`id`));

INSERT INTO `ProjetMajeure`.`device` (`orientation`, `longueur`,`hauteur`, `latitude`, `longitude`) 
VALUES 	('portrait', '1256','3256', '3.14957', '4.124569'),
		('paysage', '1256','3256', '9.145797','3.14957');

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