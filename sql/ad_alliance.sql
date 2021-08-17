/* You must create a database called "ad_alliance" 
(CREATE DATABASE ad_alliance;) and then create the tables: */

CREATE TABLE `table1` (
`advert_id` int(11) NOT NULL PRIMARY KEY auto_increment, `priority` 
enum('1','2','3','4','5') NOT NULL DEFAULT '3', `position` int(1) NOT 
NULL DEFAULT '1',
`hour` int(2) NOT NULL,
`image` varchar(500) NOT NULL,
`link` varchar(500) NOT NULL,
`width` int(4) NOT NULL,
`height` int(4) NOT NULL,
`views` int(11) NOT NULL DEFAULT '0' 
) ENGINE=InnoDB DEFAULT CHARSET=latin1; 
INSERT INTO `table1` (`advert_id`, `priority`, `position`, `hour`, 
`image`, `link`, `width`, `height`, `views`) VALUES
(1, '5', 1, 1, 'https://box.adalliance.io/micha/gujtest/sk.png', 
'https://www.ad-alliance.de', 160, 600, 0), 
(2, '5', 2, 4, 'https://box.adalliance.io/micha/gujtest/mr.png', 
'https://www.ad-alliance.de', 300, 250, 0),
(3, '5', 1, 7, 'http://box.adalliance.io/micha/gujtest/sk.png', 
'https://www.ad-alliance.de', 160, 600, 0), 
(4, '3', 2, 11, 'https://box.adalliance.io/micha/gujtest/hp.png', 
'https://www.ad-alliance.de', 300, 600, 0),
(5, '3', 2, 12, 'https://box.adalliance.io/micha/gujtest/hp.png', 
'https://www.ad-alliance.de', 300, 600, 0), 
(6, '5', 2, 15, 'https://box.adalliance.io/micha/gujtest/mr.png', 
'https://www.ad-alliance.de', 300, 250, 0),
(7, '3', 2, 20, 'https://box.adalliance.io/micha/gujtest/sb.png', 
'https://www.ad-alliance.de', 728, 90, 0), 
(8, '4', 1, 23, 'https://box.adalliance.io/micha/gujtest/sk.png', 
'https://www.ad-alliance.de', 160, 600, 0); 

CREATE TABLE `table2` (
`advert_id` int(11) NOT NULL PRIMARY KEY auto_increment, `priority` 
enum('1','2','3','4','5') NOT NULL DEFAULT '3', `position` int(1) NOT 
NULL DEFAULT '1',
`hour` int(2) NOT NULL,
`image` varchar(500) NOT NULL,
`link` varchar(500) NOT NULL,
`width` int(4) NOT NULL,
`height` int(4) NOT NULL,
`views` int(11) NOT NULL DEFAULT '0' 
) ENGINE=InnoDB DEFAULT CHARSET=latin1; 
INSERT INTO `table2` (`advert_id`, `priority`, `position`, `hour`, 
`image`, `link`, `width`, `height`, `views`) VALUES
(1, '4', 2, 0, 'https://box.adalliance.io/micha/gujtest/mr.png', 
'https://www.ad-alliance.de', 300, 250, 0), 
(2, '4', 2, 1, 'https://box.adalliance.io/micha/gujtest/sk.png', 
'https://www.ad-alliance.de', 160, 600, 0),
(3, '1', 1, 3, 'https://box.adalliance.io/micha/gujtest/mr.png', 
'https://www.ad-alliance.de', 300, 250, 0), 
(4, '3', 2, 8, 'https://box.adalliance.io/micha/gujtest/hp.png', 
'https://www.ad-alliance.de', 300, 600, 0), 
(5, '5', 1, 9, 'https://box.adalliance.io/micha/gujtest/sk.png', 
'https://www.ad-alliance.de', 160, 600, 0),
(6, '4', 1, 10, 'https://box.adalliance.io/micha/gujtest/hp.png', 
'https://www.ad-alliance.de', 300, 600, 0), 
(7, '1', 2, 15, 'https://box.adalliance.io/micha/gujtest/sb.png', 
'https://www.ad-alliance.de', 728, 90, 0),
(8, '1', 2, 16, 'https://box.adalliance.io/micha/gujtest/hp.png', 
'https://www.ad-alliance.de', 300, 600, 0), 
(9, '4', 2, 17, 'https://box.adalliance.io/micha/gujtest/sb.png', 
'https://www.ad-alliance.de', 728, 90, 0),
(10, '4', 1, 18, 'https://box.adalliance.io/micha/gujtest/sk.png', 
'https://www.ad-alliance.de', 160, 600, 0), 
(11, '3', 1, 20, 'https://box.adalliance.io/micha/gujtest/hp.png', 
'https://www.ad-alliance.de', 300, 600, 0),
(12, '1', 1, 21, 'https://box.adalliance.io/micha/gujtest/sb.png', 
'https://www.ad-alliance.de', 728, 90, 0), 
(13, '3', 2, 22, 'https://box.adalliance.io/micha/gujtest/hp.png', 
'https://www.ad-alliance.de', 300, 600, 0); 