SET FOREIGN_KEY_CHECKS = 0;
 
SELECT @@FOREIGN_KEY_CHECKS;

DROP TABLE IF EXISTS `#__pv_live_candidates`;
DROP TABLE IF EXISTS `#__pv_live_elections`;
DROP TABLE IF EXISTS `#__pv_live_offices`;
DROP TABLE IF EXISTS `#__pv_live_offices_to_votes`;
DROP TABLE IF EXISTS `#__pv_live_parties`;
DROP TABLE IF EXISTS `#__pv_live_votes`;
DROP TABLE IF EXISTS `#__pv_live_vote_types`;
 
SET FOREIGN_KEY_CHECKS = 1;