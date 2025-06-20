-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2025 at 08:17 AM
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
-- Database: `nitf`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2a$10$nH0L/nmivV20tFc/cKI0xuJ11jbyR/QAtfE5jXCZWChrEM5KkOwLa');

-- --------------------------------------------------------

--
-- Table structure for table `dependents`
--

CREATE TABLE `dependents` (
  `did` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nic` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(255) NOT NULL,
  `relationship` varchar(255) NOT NULL,
  `member_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dependents`
--

INSERT INTO `dependents` (`did`, `name`, `nic`, `dob`, `gender`, `relationship`, `member_id`) VALUES
(1, 'Jake ', '200045369821', '2000-01-15', 'Male', 'Spouse', 1),
(2, 'Samson', '9245783256', '1992-11-25', 'Male', 'Sibling', 1),
(3, 'John', '991234567V', '1999-06-01', 'Male', 'Son', 1),
(4, 'Nissanka Senadheera', '692662989V', '1969-09-22', 'Male', 'Father', 2),
(5, 'Yasintha Senadheera', '199970569874', '1999-03-10', 'Male', 'Sibling', 2),
(6, 'Prinyaka Perera', '698134100V', '1696-11-08', 'Female', 'Mother', 2),
(7, 'Moneesha Aravindi', '200365478963', '2003-12-16', 'Female', 'Sibling', 3),
(8, 'Dewmi Senusha', '', '2012-09-07', 'Female', 'Sibling', 3),
(9, 'Jonny', '871234567V', '1987-06-01', 'Female', 'Daughter', 1),
(10, 'Roman', '887996243V', '1988-04-02', 'Male', 'Son', 1),
(12, 'Chaminda Saman Kumara', '7154236598v', '1971-12-31', 'Male', 'Father', 3);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `mid` int(11) NOT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`mid`, `nic`, `full_name`, `email`, `mobile`, `password`) VALUES
(1, '123456789V', 'John Doe', 'john.doe@example.com', '0771234567', '$2a$10$Iwe2cO0RECDuYdQvjZDDaeCZDAZkfR6X9ZZdrwFRWC.KHFGj9EIMm'),
(2, '200106902534', 'Chethiya Nimesha Senadheera', 'chethiyanimesha19@gmail.com', '0762240099', '$2a$10$V/88J6yKAZb4H19o/eAzD.C9OOqzJQ9HCbSZ7YPCE4v3LNkyiMC5q'),
(3, '200162304406', 'Tamasha Kavindi', 'tamashakavindi674@gmail.com', '0764243674', '$2a$10$iXkEokfOYlD7cHp.6OnSFeLWu2sQtN2ugQhmW3HgB2a9jFNd1aS76'),
(4, '895642574V', 'Saman Fernando', 'samanfernando@gmail.com', '0771968903', '$2a$10$NT53gv0LLH4e3k9csTq7fuZgr/TdoL2tEJYAdQCAxRdPQT9vDB.ZW'),
(5, '698134100V', 'Perera', 'perera@gmail.com', '0771313990', '$2a$10$hszht8cyDKtSG/lGpbFILOaRqMyHz95JXp0As0T/g45k/sIp9zpq.'),
(8, '997095687V', 'Yasintha Shanika', 'yasinthashanika18@gmail.com', '0762130099', '$2a$10$f6a327w.fKQARrcj1fMJruV2HCQEQtX5JEp.majPVZCcIiuVaeVg6');

-- --------------------------------------------------------

--
-- Table structure for table `member_details`
--

CREATE TABLE `member_details` (
  `id` int(11) NOT NULL,
  `initials` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `account_no` varchar(255) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `civil_status` varchar(255) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member_details`
--

INSERT INTO `member_details` (`id`, `initials`, `dob`, `account_no`, `bank`, `branch`, `address`, `city`, `civil_status`, `member_id`) VALUES
(1, 'D.G.M.', '1995-07-21', '1234567890', 'Sampath Bank', 'Colombo', '456 New Street', 'Colombo', 'Married', 1),
(2, 'K.G.C.N.Senadheera', '2001-03-09', '8004563587', 'Commercial Bank', 'Kotikawatta', '326 Kotikawatta', 'Mulleriyawa New Town', 'Divorced', 2),
(3, 'A.M.T.Kavindi', '2001-05-02', '8004563587', 'Commercial Bank', 'Piliyandala', '99 Polgasowita', 'Kahathuduwa', 'Single', 3),
(4, 'P.D.Perera', '1999-04-22', '8004563587', 'Commercial Bank', 'Dematagoda', '140 Dematagoda ', 'Colombo 9', 'Single', 5),
(5, 'M.D.S.Fernando', '2003-09-16', '8004563587', 'Commercial Bank', 'Kottawa', '125 Kottawa', 'Kottawa', 'Single', 4),
(6, 'K.G.Y.S.Senadheera', '1999-03-10', '8004563587', 'Commercial Bank', 'Kotikawatta', '326 Kotikawatta', 'Colombo', 'Single', 8);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `file_name`, `title`, `member_id`) VALUES
(1, 'NITF AR 2021 English.pdf', 'NITF AR 2021 English', 2),
(2, 'NITF AR 2020 English.pdf', 'NITF AR 2020 English', 2),
(3, 'Audited Financial Statements 2023.pdf', 'Audited Financial Statements 2023', 2),
(4, 'NITF Annual Report 2007 English.pdf', 'NITF Annual Report 2007 English', 3),
(5, 'NITF - Annual Report 2019 [  Sinhala ].pdf', 'NITF - Annual Report 2019 [  Sinhala ]', 2),
(6, 'NITF Annual Report 2010 English.pdf', 'NITF Annual Report 2010 English', 3),
(7, 'NITF - Annual Report 2019 [  Sinhala ].pdf', 'NITF - Annual Report 2019 [  Sinhala ]', 3),
(8, 'NITF - Annual Report 2019 [  Sinhala ].pdf', 'NITF - Annual Report 2019 [  Sinhala ]', 1),
(9, 'Audited Financial Statements 2022.pdf', 'Audited Financial Statements 2022', 1),
(10, 'NITF Annual Report 2010 English.pdf', 'NITF Annual Report 2010 English', 2);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `sid` int(11) NOT NULL,
  `nic` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`sid`, `nic`, `full_name`, `email`, `mobile`, `password`) VALUES
(1, '200120012001', 'Namal', 'namal@gmail.com', '0779876543', '$2a$10$GJgT3.6gDbs5glkY6t6ZdeRtTEYPtudHJETBI7rHFuKWLGr2Y9cIK'),
(2, '200106902534', 'Chethiya', 'chethiya@gmail.com', '0762240099', '$2a$10$WnoGap9/0KlHB8sWvtUequ1/R70xHm.tMiNTG1ub9v82po6crcble');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_gfn44sntic2k93auag97juyij` (`username`);

--
-- Indexes for table `dependents`
--
ALTER TABLE `dependents`
  ADD PRIMARY KEY (`did`),
  ADD UNIQUE KEY `UK6b6g4sod16tbvl26k06sag6l` (`member_id`,`nic`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`mid`),
  ADD UNIQUE KEY `UK_ilq1r7iik5fjf2wcxoydhb092` (`nic`);

--
-- Indexes for table `member_details`
--
ALTER TABLE `member_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_ql31ssvkbhljcpsygkghl4ute` (`member_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKgiv37hvt28l1t3oo2likkc1l6` (`member_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`sid`),
  ADD UNIQUE KEY `UK_egb75imgb73il933bi88k92s7` (`nic`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dependents`
--
ALTER TABLE `dependents`
  MODIFY `did` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `member_details`
--
ALTER TABLE `member_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dependents`
--
ALTER TABLE `dependents`
  ADD CONSTRAINT `FKmsh1ukewwm9ldn0hn1c4hya0u` FOREIGN KEY (`member_id`) REFERENCES `members` (`mid`);

--
-- Constraints for table `member_details`
--
ALTER TABLE `member_details`
  ADD CONSTRAINT `FK5m3pjr5dmrj33f49slrfrgb8g` FOREIGN KEY (`member_id`) REFERENCES `members` (`mid`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `FKgiv37hvt28l1t3oo2likkc1l6` FOREIGN KEY (`member_id`) REFERENCES `members` (`mid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
