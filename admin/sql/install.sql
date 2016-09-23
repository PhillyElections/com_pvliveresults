SET FOREIGN_KEY_CHECKS = 0;
SELECT @@FOREIGN_KEY_CHECKS;

DROP TABLE IF EXISTS `#__pv_live_candidates`;
DROP TABLE IF EXISTS `#__pv_live_elections`;
DROP TABLE IF EXISTS `#__pv_live_election_offices`;
DROP TABLE IF EXISTS `#__pv_live_offices`;
DROP TABLE IF EXISTS `#__pv_live_parties`;
DROP TABLE IF EXISTS `#__pv_live_votes`;
DROP TABLE IF EXISTS `#__pv_live_vote_types`;

CREATE TABLE IF NOT EXISTS `#__pv_live_candidates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT
, `party_id` int(11) unsigned NOT NULL DEFAULT 1
, `name` varchar(100) NOT NULL
, `ordering` int(11) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
, INDEX `party_id_candidates` (`party_id`)
, INDEX `name_candidates` (`name`)
) ENGINE=ARIA COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_elections` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT
, `name` varchar(100) NOT NULL
, `date` date NOT NULL DEFAULT '0000-00-00'
, `ordering` int(11) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, INDEX `name_elections` (`name`)
, PRIMARY KEY (`id`)
) ENGINE=ARIA COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_offices` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT
, `party_id` int(11) unsigned NOT NULL DEFAULT 1
, `name` varchar(100) NOT NULL
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
, INDEX `party_id_offices` (`party_id`)
, INDEX `name_offices` (`name`)
) ENGINE=ARIA COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_election_offices` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT
, `election_id` int(11) unsigned NOT NULL DEFAULT 0
, `office_id` int(11) unsigned NOT NULL DEFAULT 0
, `ordering` int(11) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
, INDEX `election_id_election_offices` (`election_id`)
, INDEX `office_id_election_offices` (`office_id`)
) ENGINE=ARIA COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_parties` (
  `id` int(11) NOT NULL AUTO_INCREMENT
, `name` varchar(100) NOT NULL
, `ordering` int(11) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, INDEX `name_parties` (`name`)
, PRIMARY KEY (`id`)
) ENGINE=ARIA COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_votes` (
  `id` bigint(17) NOT NULL AUTO_INCREMENT
, `vote_type_id` int(11) NOT NULL DEFAULT 0
, `election_office_id` int(11) NOT NULL DEFAULT 0
, `candidate_id` int(11) NOT NULL DEFAULT 0
, `ward` smallint(5) NOT NULL DEFAULT 0
, `division` smallint(5) NOT NULL DEFAULT 0
, `votes` int(11) unsigned NOT NULL DEFAULT 0
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, INDEX `vote_type_id_votes` (`vote_type_id`)
, INDEX `election_office_id_votes` (`election_office_id`)
, INDEX `candidate_id_votes` (`candidate_id`)
, INDEX `ward_votes` (`ward`)
, INDEX `division_votes` (`division`)
, PRIMARY KEY (`id`)
) ENGINE=ARIA COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_vote_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT
, `name` varchar(100) NOT NULL
, `ordering` int(11) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT '0'
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, INDEX `name_votetypes` (`name`)
, PRIMARY KEY (`id`)
) ENGINE=ARIA COLLATE='utf8_general_ci';

ALTER TABLE `#__pv_live_candidates`
  ADD CONSTRAINT `fk_party_id_candidates`
  FOREIGN KEY (`party_id`) REFERENCES `#__pv_live_parties`(`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;
ALTER TABLE `#__pv_live_offices`
  ADD CONSTRAINT `fk_party_id_offices`
  FOREIGN KEY (`party_id`) REFERENCES `#__pv_live_parties`(`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;
ALTER TABLE `#__pv_live_election_offices`
  ADD CONSTRAINT `fk_election_id_election_offices`
  FOREIGN KEY (`election_id`) REFERENCES `#__pv_live_elections`(`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;
  ADD CONSTRAINT `fk_office_id_election_offices`
  FOREIGN KEY (`office_id`) REFERENCES `#__pv_live_offices`(`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;
ALTER TABLE `#__pv_live_votes`
  ADD CONSTRAINT `fk_vote_type_id_votes`
  FOREIGN KEY (`vote_type_id`) REFERENCES `#__pv_live_vote_types`(`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE
, ADD CONSTRAINT `fk_election_office_id_votes`
  FOREIGN KEY (`election_id`) REFERENCES `#__pv_live_election_offices`(`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE
, ADD CONSTRAINT `fk_candidate_id_votes`
  FOREIGN KEY (`candidate_id`) REFERENCES `#__pv_live_candidates`(`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `#__pv_live_parties` VALUES
('', '',            '', 1, NOW(), '0000-00-00 00:00:00'),
('', 'DEMOCRATIC',  '', 1, NOW(), '0000-00-00 00:00:00'),
('', 'REPUBLICAN',  '', 1, NOW(), '0000-00-00 00:00:00'),
('', 'LIBERTARIAN', '', 1, NOW(), '0000-00-00 00:00:00'),
('', 'GREEN',       '', 1, NOW(), '0000-00-00 00:00:00');

INSERT INTO `#__pv_live_vote_types` VALUES
('', 'ABSENTEE',    '', 1, NOW(), '0000-00-00 00:00:00'),
('', 'MACHINE',     '', 1, NOW(), '0000-00-00 00:00:00'),
('', 'PROVISIONAL', '', 1, NOW(), '0000-00-00 00:00:00');

INSERT INTO `#__pv_live_elections` VALUES
('', '2015 Primary Election', '2015-04-28', '', 1, NOW(), '0000-00-00 00:00:00'),
('', '2015 General Election', '2015-11-03', '', 1, NOW(), '0000-00-00 00:00:00'),
('', '2016 Primary Election', '2016-04-26', '', 1, NOW(), '0000-00-00 00:00:00');
