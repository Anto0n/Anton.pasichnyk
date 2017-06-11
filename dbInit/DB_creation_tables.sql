-- MySQL Script generated by MySQL Workbench
-- 03/18/17 19:13:02
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema baglab
-- -----------------------------------------------------

# Drop SCHEMA baglab;
CREATE SCHEMA IF NOT EXISTS `baglab` DEFAULT CHARACTER SET utf8 ;
USE `baglab` ;
-- -----------------------------------------------------
-- Table `baglab`.`bag_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`bag_type` ;

CREATE TABLE IF NOT EXISTS `baglab`.`bag_type` (
  `idBagType` BIGINT NOT NULL AUTO_INCREMENT,
  `script` MEDIUMTEXT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`idBagType`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;

DROP TABLE IF EXISTS `baglab`.`palette` ;

CREATE TABLE IF NOT EXISTS `baglab`.`palette` (
  `idColor` BIGINT NOT NULL AUTO_INCREMENT,
  `rgb` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idColor`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `baglab`.`material`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`material` ;

CREATE TABLE IF NOT EXISTS `baglab`.`material` (
  `idmaterial` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `image` MEDIUMTEXT,
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`idmaterial`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `baglab`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`role` ;

CREATE TABLE IF NOT EXISTS `baglab`.`role` (
  `idRole` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`idRole`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `baglab`.`user_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`user_status` ;

CREATE TABLE IF NOT EXISTS `baglab`.`user_status` (
  `idstatus` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`idstatus`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `baglab`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`user` ;

CREATE TABLE IF NOT EXISTS `baglab`.`user` (
  `idUser` BIGINT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(254) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `roleId` BIGINT NULL DEFAULT NULL,
  `statusId` BIGINT NULL DEFAULT '1',
  `userCreate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userUpdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_user_role1_idx` (`roleId` ASC),
  INDEX `fk_user_status1_idx` (`statusId` ASC),
  CONSTRAINT `fk_user_role1`
    FOREIGN KEY (`roleId`)
    REFERENCES `baglab`.`role` (`idRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_status1`
    FOREIGN KEY (`statusId`)
    REFERENCES `baglab`.`user_status` (`idstatus`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `baglab`.`model`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`model` ;

CREATE TABLE IF NOT EXISTS `baglab`.`model` (
  `idModel` BIGINT NOT NULL AUTO_INCREMENT,
  `userId` BIGINT NOT NULL,
  `bagTypeId` BIGINT NOT NULL,
  `materialId` BIGINT NOT NULL,
  `mname` VARCHAR(45) NOT NULL,
  `config` MEDIUMTEXT,
  `approved` INTEGER(4) NOT NULL DEFAULT 0,
  `deleted` BOOLEAN DEFAULT FALSE,
  `modelCreate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modelUpdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idModel`),
  INDEX `fk_Model_User_idx` (`userId` ASC),
  INDEX `fk_model_bag_type1_idx` (`bagTypeId` ASC),
  CONSTRAINT `fk_Model_User`
    FOREIGN KEY (`userId`)
    REFERENCES `baglab`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Model_material`
  FOREIGN KEY (`materialId`)
  REFERENCES `baglab`.`material` (`idmaterial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_model_bag_type1`
    FOREIGN KEY (`bagTypeId`)
    REFERENCES `baglab`.`bag_type` (`idBagType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `baglab`.`orderStatus`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`order_status` ;

CREATE TABLE IF NOT EXISTS `baglab`.`order_status` (
  `idOrderStatus` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NOT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  `deleted` BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (`idOrderStatus`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `baglab`.`order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`order` ;

CREATE TABLE IF NOT EXISTS `baglab`.`order` (
  `idOrder` BIGINT NOT NULL AUTO_INCREMENT,
  `userId` BIGINT NOT NULL,
  `moderatorId` BIGINT DEFAULT 0,
  `orderStatusId` BIGINT NOT NULL,
  `orderCreate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `orderUpdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idOrder`),
  INDEX `fk_Order_User1_idx` (`userId` ASC),
  INDEX `fk_order_order_status1_idx` (`orderStatusId` ASC),
  CONSTRAINT `fk_Order_User1`
    FOREIGN KEY (`userId`)
    REFERENCES `baglab`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_order_status1`
    FOREIGN KEY (`orderStatusId`)
    REFERENCES `baglab`.`order_status` (`idOrderStatus`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `baglab`.`order_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`order_item` ;

CREATE TABLE IF NOT EXISTS `baglab`.`order_item` (
  `idOrderItem` BIGINT NOT NULL AUTO_INCREMENT,
  `modelId` BIGINT NOT NULL,
  `orderId` BIGINT NOT NULL,
  `count` INT(11) NOT NULL,
  `price` INT NOT NULL,
  PRIMARY KEY (`idOrderItem`),
  INDEX `fk_orderItem_order_idx` (`orderId` ASC),
  CONSTRAINT `fk_orderItem_model`
    FOREIGN KEY (`modelId`)
    REFERENCES `baglab`.`model` (`idModel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orderItem_order`
    FOREIGN KEY (`orderId`)
    REFERENCES `baglab`.`order` (`idOrder`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `baglab`.`panel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`panel` ;

CREATE TABLE IF NOT EXISTS `baglab`.`panel` (
  `idPanel` BIGINT  NOT NULL AUTO_INCREMENT,
  `pictureURL` VARCHAR(255) NULL,
  `colourRGB` INT(11) NOT NULL,
  `bagTypeId` BIGINT NOT NULL,
  `materialId` BIGINT NOT NULL,
  PRIMARY KEY (`idPanel`, `bagTypeId`),
  INDEX `fk_panel_bag_type1_idx` (`bagTypeId` ASC),
  INDEX `fk_panel_material1_idx` (`materialId` ASC),
  CONSTRAINT `fk_panel_bag_type1`
    FOREIGN KEY (`bagTypeId`)
    REFERENCES `baglab`.`bag_type` (`idBagType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_panel_material1`
    FOREIGN KEY (`materialId`)
    REFERENCES `baglab`.`material` (`idmaterial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `baglab`.`country`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`country` ;

CREATE TABLE IF NOT EXISTS `baglab`.`country` (
  `idcountry` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`idcountry`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `baglab`.`shipping_adress`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`shipping_adress` ;

CREATE TABLE IF NOT EXISTS `baglab`.`shipping_adress` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `contactName` VARCHAR(45) NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `apartment` VARCHAR(45) NULL DEFAULT NULL,
  `state` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `zipcode` VARCHAR(45) NULL DEFAULT NULL,
  `mobile` VARCHAR(45) NULL DEFAULT NULL,
  `userId` BIGINT NOT NULL,
  `countryId` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_shipping_adress_user1_idx` (`userId` ASC),
  INDEX `fk_shipping_adress_country1_idx` (`countryId` ASC),
  CONSTRAINT `fk_shipping_adress_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `baglab`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shipping_adress_country1`
    FOREIGN KEY (`countryId`)
    REFERENCES `baglab`.`country` (`idcountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `baglab`.`pages_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`pages_type` ;

CREATE TABLE IF NOT EXISTS `baglab`.`pages_type` (
  `idpages_type` BIGINT  NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idpages_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `baglab`.`pages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`pages` ;

CREATE TABLE IF NOT EXISTS `baglab`.`pages` (
  `idnews` BIGINT NOT NULL AUTO_INCREMENT,
  `body` MEDIUMTEXT NULL,
  `header` MEDIUMTEXT NULL,
  `newsCreate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `newsUpdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pagesTypeId` BIGINT NOT NULL,
  PRIMARY KEY (`idnews`),
  INDEX `fk_pages_pages_type1_idx` (`pagesTypeId` ASC),
  CONSTRAINT `fk_pages_pages_type1`
    FOREIGN KEY (`pagesTypeId`)
    REFERENCES `baglab`.`pages_type` (`idpages_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `baglab`.`feedback_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`feedback_status` ;

CREATE TABLE IF NOT EXISTS `baglab`.`feedback_status` (
  `idfeedback_status` BIGINT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idfeedback_status`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `baglab`.`feedback`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`feedback` ;

CREATE TABLE IF NOT EXISTS `baglab`.`feedback` (
  `idfeedback` BIGINT NOT NULL AUTO_INCREMENT,
  `text` MEDIUMTEXT NOT NULL,
  `userId` BIGINT NOT NULL,
  `userCreate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE ,
  `feedbackStatuIid` BIGINT NOT NULL,
  PRIMARY KEY (`idfeedback`),
  INDEX `fk_feedback_user1_idx` (`userId` ASC),
  INDEX `fk_feedback_feedback_status1_idx` (`feedbackStatuIid` ASC),
  CONSTRAINT `fk_feedback_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `baglab`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedback_feedback_status1`
    FOREIGN KEY (`feedbackStatuIid`)
    REFERENCES `baglab`.`feedback_status` (`idfeedback_status`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `baglab`.`bag_type_price`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`bag_type_price`;
CREATE TABLE `bag_type_price` (
  `idbag_type_price` BIGINT    NOT NULL AUTO_INCREMENT,
  `bag_type_id`      BIGINT   NOT NULL,
  `date`             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `price`            INT(11)            DEFAULT NULL,
  PRIMARY KEY (`idbag_type_price`),
  CONSTRAINT `bag_type_id`
  FOREIGN KEY (`bag_type_id`)
  REFERENCES `baglab`.`bag_type` (`idBagType`)
)
  ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `baglab`.`material_price`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `baglab`.`material_price`;
CREATE TABLE `baglab`.`material_price` (
  `idmaterial_price` BIGINT    NOT NULL AUTO_INCREMENT,
  `materialId`       BIGINT       NOT NULL,
  `price`            INT       NULL,
  `date`             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idmaterial_price`),
  CONSTRAINT `materialId`
  FOREIGN KEY (`materialId`)
  REFERENCES `baglab`.`material` (`idmaterial`))
  ENGINE = InnoDB;

/*
create index model_price_modelId_date_index
  on model_price (modelId, date DESC)
;*/

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

