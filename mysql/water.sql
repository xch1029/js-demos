/*
Date: 2017-07-12 09:05:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for water_alarm
-- ----------------------------
DROP TABLE IF EXISTS `water_alarm`;
CREATE TABLE `water_alarm` (
  `alarm_id` int(11) NOT NULL AUTO_INCREMENT,
  `kind` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `device_id` int(6) NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`alarm_id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `water_alarm_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `water_device` (`device_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for water_company
-- ----------------------------
DROP TABLE IF EXISTS `water_company`;
CREATE TABLE `water_company` (
  `company_id` int(4) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(30) NOT NULL,
  `company_create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for water_device
-- ----------------------------
DROP TABLE IF EXISTS `water_device`;
CREATE TABLE `water_device` (
  `device_id` int(6) NOT NULL AUTO_INCREMENT,
  `sn` varchar(30) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `t1` float DEFAULT NULL,
  `t2` float DEFAULT NULL,
  `t1_alarm_value` float DEFAULT NULL,
  `t2_alarm_value` float DEFAULT NULL,
  `t1_state` int(1) DEFAULT '0',
  `t2_state` int(1) DEFAULT '0',
  `water_state` int(1) DEFAULT '0',
  `state` int(1) DEFAULT '0',
  `update_time` datetime NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `company_id` int(4) NOT NULL,
  PRIMARY KEY (`device_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `water_device_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `water_company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for water_history_data
-- ----------------------------
DROP TABLE IF EXISTS `water_history_data`;
CREATE TABLE `water_history_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `t1` float DEFAULT NULL,
  `t2` float DEFAULT NULL,
  `t1_state` int(1) DEFAULT NULL,
  `t2_state` int(1) DEFAULT NULL,
  `water_state` int(1) DEFAULT NULL,
  `state` int(1) DEFAULT NULL,
  `device_id` int(6) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `water_history_data_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `water_device` (`device_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for water_users
-- ----------------------------
DROP TABLE IF EXISTS `water_users`;
CREATE TABLE `water_users` (
  `user_id` int(6) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `rank` int(1) DEFAULT '2',
  `company_id` int(4) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `water_users_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `water_company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
