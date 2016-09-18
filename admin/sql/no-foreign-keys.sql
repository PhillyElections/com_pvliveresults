CREATE TABLE IF NOT EXISTS `#__pv_live_elections` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT
, `name` varchar(100) NOT NULL
, `date` date NOT NULL DEFAULT '0000-00-00'
, `order` smallint(4) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
) ENGINE=MYISAM COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_parties` (
  `id` int(11) NOT NULL AUTO_INCREMENT
, `name` varchar(100) NOT NULL
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
) ENGINE=MYISAM COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_vote_types` (
  `id` int(2) NOT NULL AUTO_INCREMENT
, `name` varchar(100) NOT NULL
, `published` tinyint(1) unsigned NOT NULL DEFAULT '0'
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
) ENGINE=MYISAM COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_candidates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT
, `party_id` int(11) unsigned NOT NULL DEFAULT 0
, `name` varchar(100) NOT NULL
, `order` smallint(4) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
, INDEX `party_id_candidates` (`party_id`)
) ENGINE=MYISAM COLLATE='utf8_general_ci';

CREATE TABLE IF NOT EXISTS `#__pv_live_offices` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT
, `party_id` int(11) unsigned NOT NULL DEFAULT 0
, `name` varchar(255) NOT NULL
, `order` smallint(4) unsigned NOT NULL DEFAULT 1
, `published` tinyint(1) unsigned NOT NULL DEFAULT 0
, `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
, PRIMARY KEY (`id`)
, INDEX `party_id_offices` (`party_id`)
) ENGINE=MYISAM COLLATE='utf8_general_ci';

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
, INDEX `vote_type_id_votes` (`vote_type_id`)
, INDEX `election_id_votes` (`election_id`)
, INDEX `office_id_votes` (`office_id`)
, INDEX `candidate_id_votes` (`candidate_id`)
, INDEX `ward_votes` (`ward`)
, INDEX `division_votes` (`division`)
) ENGINE=MYISAM COLLATE='utf8_general_ci';
