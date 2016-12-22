DROP TABLE `ProjetMajeure`.`device`;
DROP TABLE `ProjetMajeure`.`user`;

CREATE TABLE `ProjetMajeure`.`device` (
 `id` INT NOT NULL,
 `orientation` VARCHAR(45) NOT NULL,
 `longueur` INT NOT NULL,
 `hauteur` INT NOT NULL,
 `latitude` FLOAT NOT NULL,
 `longitude` FLOAT NOT NULL,
 PRIMARY KEY (`id`));

INSERT INTO `ProjetMajeure`.`device` (`id`, `orientation`, `longueur`,`hauteur`, `latitude`, `longitude`) VALUES ('0', 'portrait', '1256','3256', '3.14957', '4.124569');
INSERT INTO `ProjetMajeure`.`device` (`id`, `orientation`, `longueur`,`hauteur`, `latitude`,`longitude`) VALUES ('1', 'paysage', '1256','3256', '9.145797','3.14957');

CREATE TABLE `ProjetMajeure`.`user` (
 `id` VARCHAR(45) CHARACTER SET 'dec8' COLLATE 'dec8_swedish_ci' NOT NULL,
 `email` VARCHAR(45) NULL,
 `name` VARCHAR(45) NULL,
 `role` VARCHAR(45) NULL,
 `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`));



INSERT INTO `ProjetMajeure`.`user` (`id`, `email`, `name`, `role`) VALUES ('328bacc3', 'blop@blop.com', 'bloppy','manager');
INSERT INTO `ProjetMajeure`.`user` (`id`, `email`, `name`, `role`) VALUES ('5679GQ3R', 'john@doe.com', 'John Doe', 'manager');
INSERT INTO `ProjetMajeure`.`user` (`id`, `email`, `name`, `role`) VALUES ('124FGU98', 'tada@tada.com', 'tada','administrateur');
INSERT INTO `ProjetMajeure`.`user` (`id`, `email`, `name`, `role`) VALUES ('987HJAL', 'qiuh@.com', 'kqjsb', 'administrateur');
