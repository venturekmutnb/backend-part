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
-- Table structure for table `package_plan`
--

CREATE TABLE `package_plan` (
  `plan_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `day_number` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `activities` text DEFAULT NULL,
  `meal_info` varchar(100) DEFAULT NULL,
  `hotel_info` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package_plan`
--

INSERT INTO `package_plan` (`plan_id`, `package_id`, `day_number`, `title`, `activities`, `meal_info`, `hotel_info`) VALUES
(2, 2, 1, '1', 'eiei', 'eiei', 'eiei'),
(3, 2, 2, '2', 'eiei', 'eiei', 'eiei');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `package_plan`
--
ALTER TABLE `package_plan`
  ADD PRIMARY KEY (`plan_id`),
  ADD KEY `package_plan_ibfk_1` (`package_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `package_plan`
--
ALTER TABLE `package_plan`
  MODIFY `plan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `package_plan`
--
ALTER TABLE `package_plan`
  ADD CONSTRAINT `package_plan_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `package` (`package_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
