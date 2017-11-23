/*
Just used for creating the sessions table
 */

CREATE TABLE `pncdisneydb`.`sessions` (
  `session_id` VARCHAR(100) NOT NULL,
  `expires` VARCHAR(500) NOT NULL,
  `data` VARCHAR(500) NULL,
  PRIMARY KEY (`session_id`));
