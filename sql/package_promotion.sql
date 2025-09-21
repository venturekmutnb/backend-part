-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2025 at 03:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `venture`
--

-- --------------------------------------------------------

--
-- Table structure for table `package_promotion`
--

CREATE TABLE `package_promotion` (
  `package_id` int(11) NOT NULL,
  `promo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package_promotion`
--

INSERT INTO `package_promotion` (`package_id`, `promo_id`) VALUES
(2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `package_promotion`
--
ALTER TABLE `package_promotion`
  ADD PRIMARY KEY (`package_id`,`promo_id`),
  ADD KEY `promo_id` (`promo_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `package_promotion`
--
ALTER TABLE `package_promotion`
  ADD CONSTRAINT `package_promotion_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `package` (`package_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `package_promotion_ibfk_2` FOREIGN KEY (`promo_id`) REFERENCES `promotion` (`promo_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
