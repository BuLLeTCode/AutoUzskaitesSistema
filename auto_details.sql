-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2016 at 07:46 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `auto_details`
--

-- --------------------------------------------------------

--
-- Table structure for table `auto`
--

CREATE TABLE IF NOT EXISTS `auto` (
`ID` int(11) NOT NULL,
  `Razotajs` varchar(100) NOT NULL DEFAULT 'Audi',
  `Marka` varchar(100) NOT NULL DEFAULT '80',
  `Gads` varchar(15) NOT NULL DEFAULT '1992'
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auto`
--

INSERT INTO `auto` (`ID`, `Razotajs`, `Marka`, `Gads`) VALUES
(1, 'Audi', 'A4', '2000'),
(2, 'BMW', '530', '1998'),
(16, 'VW', 'Polo', '2001'),
(37, 'Volvo', 'XC90', '2006'),
(45, 'BMW', '530', '2002');

-- --------------------------------------------------------

--
-- Table structure for table `auto_details`
--

CREATE TABLE IF NOT EXISTS `auto_details` (
`ID` int(11) NOT NULL,
  `Auto_Marka` varchar(20) NOT NULL,
  `Auto_Razotajs` varchar(30) NOT NULL,
  `Auto_Gads` int(11) NOT NULL,
  `Apkopes_veids` varchar(50) NOT NULL,
  `Date` date NOT NULL,
  `Izmaksas` float NOT NULL,
  `Komentari` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auto`
--
ALTER TABLE `auto`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `auto_details`
--
ALTER TABLE `auto_details`
 ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auto`
--
ALTER TABLE `auto`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT for table `auto_details`
--
ALTER TABLE `auto_details`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
