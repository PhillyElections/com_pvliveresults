SET FOREIGN_KEY_CHECKS = 0;
 
SELECT @@FOREIGN_KEY_CHECKS;

DROP TABLE IF EXISTS `#__pv_live_candidates`;
DROP TABLE IF EXISTS `#__pv_live_votes`;
DROP TABLE IF EXISTS `#__pv_live_divisions`;
DROP TABLE IF EXISTS `#__pv_live_election_years`;
DROP TABLE IF EXISTS `#__pv_live_offices`;
DROP TABLE IF EXISTS `#__pv_live_wards`;
 
SET FOREIGN_KEY_CHECKS = 1;