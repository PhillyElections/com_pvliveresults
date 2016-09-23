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
) ENGINE=MYISAM COLLATE='utf8_general_ci';

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
) ENGINE=MYISAM COLLATE='utf8_general_ci';

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
) ENGINE=MYISAM COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_office_election` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT
, `office_id` int(11) unsigned NOT NULL DEFAULT 0
, `election_id` int(11) unsigned NOT NULL DEFAULT 0
, `ordering` int(11) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
, INDEX `party_id_offices` (`party_id`)
) ENGINE=MYISAM COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_parties` (
  `id` int(11) NOT NULL AUTO_INCREMENT
, `name` varchar(100) NOT NULL
, `ordering` int(11) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, INDEX `name_parties` (`name`)
, PRIMARY KEY (`id`)
) ENGINE=MYISAM COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_votes` (
  `id` bigint(17) NOT NULL AUTO_INCREMENT
, `vote_type_id` int(11) NOT NULL DEFAULT 0
, `office_election_id` int(11) NOT NULL DEFAULT 0
, `candidate_id` int(11) NOT NULL DEFAULT 0
, `ward` smallint(5) NOT NULL DEFAULT 0
, `division` smallint(5) NOT NULL DEFAULT 0
, `votes` int(11) unsigned NOT NULL DEFAULT 0
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, INDEX `vote_type_id_votes` (`vote_type_id`)
, INDEX `office_election_id_votes` (`office_election_id`)
, INDEX `candidate_id_votes` (`candidate_id`)
, INDEX `ward_votes` (`ward`)
, INDEX `division_votes` (`division`)
, PRIMARY KEY (`id`)
) ENGINE=MYISAM COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_vote_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT
, `name` varchar(100) NOT NULL
, `ordering` int(11) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT '0'
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, INDEX `name_votetypes` (`name`)
, PRIMARY KEY (`id`)
) ENGINE=MYISAM COLLATE='utf8_general_ci';

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
