SET FOREIGN_KEY_CHECKS = 0;
SELECT @@FOREIGN_KEY_CHECKS;

DROP TABLE IF EXISTS `#__pv_live_candidates`;
DROP TABLE IF EXISTS `#__pv_live_votes`;
DROP TABLE IF EXISTS `#__pv_live_divisions`;
DROP TABLE IF EXISTS `#__pv_live_election_years`;
DROP TABLE IF EXISTS `#__pv_live_offices`;
DROP TABLE IF EXISTS `#__pv_live_wards`;

CREATE TABLE IF NOT EXISTS `#__pv_live_elections` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT
, `name` varchar(100) NOT NULL
, `date` date NOT NULL DEFAULT '0000-00-00'
, `order` smallint(4) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
) ENGINE=INNODB COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_parties` (
  `id` int(11) NOT NULL AUTO_INCREMENT
, `name` varchar(100) NOT NULL
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
) ENGINE=INNODB COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_vote_types` (
  `id` int(2) NOT NULL AUTO_INCREMENT
, `name` varchar(100) NOT NULL
, `published` tinyint(1) unsigned NOT NULL DEFAULT '0'
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
) ENGINE=INNODB COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_candidates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT
, `party_id` int(11) unsigned NOT NULL DEFAULT 0
, `name` varchar(100) NOT NULL
, `order` smallint(4) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
, CONSTRAINT `fk_party_id_candidates` FOREIGN KEY (`party_id`) REFERENCES `#__pv_live_parties` (`id`) ON UPDATE CASCADE
) ENGINE=INNODB COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_offices` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT
, `party_id` int(11) unsigned NOT NULL DEFAULT 0
, `name` varchar(255) NOT NULL
, `order` smallint(4) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
) ENGINE=INNODB COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_votes` (
  `id` int(17) NOT NULL AUTO_INCREMENT
, `vote_type_id` tinyint(2) NOT NULL DEFAULT 0
, `election_id` int(11) NOT NULL DEFAULT 0
, `office_id` int(11) NOT NULL DEFAULT 0
, `candidate_id` int(11) NOT NULL DEFAULT 0
, `ward` tinyint(2) NOT NULL DEFAULT 0
, `division` tinyint(2) NOT NULL DEFAULT 0
, `votes` smallint(5) unsigned NOT NULL DEFAULT 0
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
) ENGINE=INNODB COLLATE='utf8_general_ci';

ALTER TABLE #__pv_live_candidates
  ADD CONSTRAINT `fk_party_id_candidates`
  FOREIGN KEY (party_id) REFERENCES #__pv_live_parties(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE;
ALTER TABLE #__pv_live_offices
  ADD CONSTRAINT `fk_party_id_offices`
  FOREIGN KEY (party_id) REFERENCES #__pv_live_parties(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE;
ALTER TABLE #__pv_live_votes
  ADD CONSTRAINT `fk_vote_type_id_votes`
  FOREIGN KEY (vote_type_id) REFERENCES #__pv_live_vote_types(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE;
, ADD CONSTRAINT `fk_election_id_votes`
  FOREIGN KEY (election_id) REFERENCES #__pv_live_elections(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE;
, ADD CONSTRAINT `fk_office_id_votes`
  FOREIGN KEY (office_id) REFERENCES #__pv_live_offices(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE;
, ADD CONSTRAINT `fk_candidate_id_votes`
  FOREIGN KEY (candidate_id) REFERENCES #__pv_live_candidates(id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;
