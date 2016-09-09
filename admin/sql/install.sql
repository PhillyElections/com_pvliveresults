
CREATE TABLE IF NOT EXISTS `#__pv_live_candidates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `office_id` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `published` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `live_office_id` (`office_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `#__pv_live_divisions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `office_id` int(11) unsigned NOT NULL,
  `ward_id` int(11) unsigned NOT NULL,
  `name` tinyint(2) unsigned NOT NULL,
  `published` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `live_office_id` (`office_id`),
  KEY `live_ward_id` (`ward_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `#__pv_live_election_years` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `e_year` varchar(100) NOT NULL,
  `election_date` date NOT NULL DEFAULT '0000-00-00',
  `published` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `#__pv_live_offices` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `election_id` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `order` smallint(4) unsigned NOT NULL DEFAULT '1',
  `published` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `live_election_id` (`election_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `#__pv_live_votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `e_year` varchar(100) NOT NULL DEFAULT '',
  `office` varchar(100) NOT NULL DEFAULT '',
  `ward` tinyint(2) NOT NULL DEFAULT '0',
  `division` tinyint(2) NOT NULL DEFAULT '0',
  `vote_type` char(1) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL DEFAULT '',
  `party` varchar(50) NOT NULL DEFAULT '',
  `votes` smallint(5) unsigned NOT NULL DEFAULT '0',
  `published` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `live_office` (`office`),
  KEY `live_ward` (`ward`),
  KEY `live_division` (`division`),
  KEY `live_vote_type` (`vote_type`),
  KEY `live_e_year` (`e_year`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `#__pv_live_wards` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `office_id` int(11) unsigned NOT NULL DEFAULT '0',
  `name` int(2) unsigned NOT NULL,
  `published` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `live_office_id` (`office_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;
