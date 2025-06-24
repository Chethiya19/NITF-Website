-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2025 at 12:21 PM
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
(11, 'Roman', '887996243V', '1988-04-02', 'Male', 'Son', 4),
(12, 'Chaminda Saman Kumara', '7154236598v', '1971-12-31', 'Male', 'Father', 3);

-- --------------------------------------------------------

--
-- Table structure for table `garage`
--

CREATE TABLE `garage` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `garage`
--

INSERT INTO `garage` (`id`, `name`, `address`) VALUES
(1, 'NEW CHANDRA MOTORS', 'No.190, Dr.N.M.Perera Mawatha,Colombo 08'),
(2, 'LIYANAGE MOTORS', 'No.164/F,Main Street,Battaramulla'),
(3, 'CHANDRASIRI MOTOR WORKS', 'No.125, Rajagiriya Road,Rajagiriya'),
(4, 'NEW RANJITH MOTORS', 'No.197/5, Rajagiriya road,Rajagiriya'),
(5, 'SANJEEWA MOTORS', 'No.1177/1, Kotte Road,Rajagiriya'),
(6, 'ORIENTAL MOTOR GARAGE', 'No.135, D.R.Wijewardena Mawatha,Colombo 10'),
(7, 'POPULAR HOUSE', 'No.189, Colombo Road,Divulapitiya,Boralasgamuwa'),
(8, 'AJITH AUTO ENGINEERING', 'No.122, Buthgamuwa Road, Rjagiriya'),
(9, 'MATARA GARAGE', 'No.287/5, Highlevel Road,Kirillapona,Colombo 05'),
(10, 'SDH ENTERPRISE', 'No.18/6 A,Vidyakara Mawatha,Maharagama'),
(11, 'DS MOTORS', 'No.206/4, Dehiwala Road,Maharagama'),
(12, 'RATHNA MOTORS', 'No.128/4, Galwala Road,Katuwawala,Boralasgamuwa'),
(13, 'JAYA MOTORS', 'No.194, Colombo Road,Divulpitiya,Boaralasgamuwa'),
(14, 'UD MOTORS ENGINEERING', 'No.108/3, Pelenwatta, Pannipitiya'),
(15, 'DULRAN MOTORS', 'No.286/3, Makumbura, Pannipitiya'),
(16, 'RDS MOTORS', 'No.56/2, Thalawathugoda Road,Colombo'),
(17, 'NEW SUSIL MOTORS', 'No.506/B,Anagarika Dharmapala Mawatha,Thalawathugoda'),
(18, 'NEW NETHMINI MOTORS', 'No.12, Rajamalwatta Road,Battaramulla'),
(19, 'AUTO FORCE', 'No.49/2, Sri Saranankara Road,Dehiwala'),
(20, 'GRND AUTO –TECH', 'No.1/B/2,Horana Road,Kahathuduwa,polgasowita'),
(21, 'HIRUSHI AUTO', 'Kidelpitiya,Wemilla Junction,Bandaragama'),
(22, 'SAJITH MOTOR WORKS', 'No.61, Dibbedda Road,Panadura'),
(23, 'WEST END MOTORS', 'No.144, Ward Place,Colombo 07'),
(24, 'KUMASARU AUTO MOBILE', 'No.32, Nawala Road,narahenpita,Colombo 05'),
(25, 'ASIRI MOTORS', 'No.25/5, Buwanekabahu Mawatha,Mirihana,Kotte'),
(26, 'SISHAN MOTORS', 'No.253, Rajasinghe Mawatha,Kothalawala,Kaduwela'),
(27, 'S.L.MOTORS', 'No.4/5, Walpola, Aggona, Angoda'),
(28, 'CHAMUDINI MOTORS', 'No.510, Gamage Wtta,Gothatuwa'),
(29, 'MR.PAINT', 'No.175, Vauxhall Street,Colombo 02'),
(30, 'EURO CAR MART', 'No.06, Staition Road,Colombo 02'),
(31, 'U.D.P.FERNANDO & CO.(PVT) LTD', 'No.265/2, Sri Saddharma Mawatha,Colombo 10'),
(32, '505 MOTORS', 'No.885, Danister De Silva Mawatha,P.O.Box 1862,Colombo 14'),
(33, 'CEYLON MOTOR WORKS', 'No.761/1, Kandy Road,Kelaniya'),
(34, 'B M D ENGINEERING PVT LIMITED', 'No.69, Athurugiriya road,Homagama'),
(35, 'Dissanayaka Motors', 'No.64/188, Santhananpitiya Rd,3rd step,Embuldeniya,Kelaniya'),
(36, 'Shameera Garage', 'No.26/1 Malini Bulathsinhala Rd, Borelasgamuwa'),
(37, 'Padmini Motors', 'No.120/D/6,Galwala Rd,Katuwawala,Boralesgamuwa'),
(38, 'B.M.D Engineering Works (PVT.)Ltd', 'No.69,Athurugiriya Rd,Homagama'),
(39, 'Samantha Motors Center', 'No .412/18/B,Pitipana North, Homagama'),
(40, 'Reliable Motor Traders (Pvt) Ltd', 'No:94/1,Vijaya Kumaranatunga Mw,Polhengoda,Colombo 05'),
(41, 'Dayasri Auto Tech (PVT) Ltd', 'No.48/B,Kolamunna,Piliyandala'),
(42, 'Jayantha Motors & Fiber Glass', '50,Jaya Mawatha,Battaramulla'),
(43, 'New Perera Motors', '645,Subithipura Road,Battaramulla'),
(44, 'Thilakarathna Motors', 'No.115A,Rabarwatta Rd,Gangodawila,Nugegoda'),
(45, 'Goldway Motor Engineers', 'No.Horana Rd,Honnanthara,Kesbewa'),
(46, 'Sriya Ananda Motors', 'No.252,High Level Rd,Kirulapona,Colombo 06'),
(47, 'Italian Thoroughbred Motor Company (pvt) Ltd', 'No.268B,Ariyasighala Mawatha,Kalapaluwawa,Rajagiriya'),
(48, 'Preethi Motors', 'Galle Rd,Pambrana,Matara,sri Lanka'),
(49, 'Matara Auto Tec', 'No.363A,Anagarika Dharmapala Rd,Nupe,Matara'),
(50, 'Samrasinghe Motors (Pvt) Ltd', 'No.21,Dumriyapola Rd,Matara'),
(51, 'Siri Motors', '512B,Maithripala senanayaka Mawatha,New Town,Anuradhapura'),
(52, 'Wheel Masters Private Limited', 'No:514/A3A,Mithreepala Senanayaka Mawatha,Anuradhapura'),
(53, 'New Jayasekera Automotors(PVT)Ltd', 'No.209,Wilgoda Circular Road,Yantampalawa,Kurunegala');

-- --------------------------------------------------------

--
-- Table structure for table `institute`
--

CREATE TABLE `institute` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `institute`
--

INSERT INTO `institute` (`id`, `name`, `address`, `contact`) VALUES
(1, 'Ministry of Finance, Planning and Economics Development', 'The Secretariat, Colombo 01', '0112484510'),
(2, 'Ministry of Defence', '15/5 Baladaksha Mawatha, Colombo 03', '0112430860'),
(3, 'Ministry of Education', 'Isurupaya, Battaramulla', '0112785141'),
(4, 'Ministry of Health', 'No.385, Rev. Baddegama Wimalawansa Thero Mawatha, Colombo 10', '0112698507'),
(5, 'Ministry of Power and Energy', '72 Ananda Coomaraswamy Mawatha, Colombo 07', '0112574922'),
(6, 'Department of Motor Traffic', 'No.341, Elvitigala Mawatha, Colombo 05', '0112694331'),
(7, 'Department of Examinations', 'Pelawatta, Battaramulla', '0112786200'),
(8, 'Ceylon Electricity Board (CEB)', 'Sir Chittampalam A. Gardiner Mawatha, Colombo 02', '0112329672'),
(9, 'Sri Lanka Transport Board (SLTB)', 'No.200, Kirula Road, Colombo 05', '0112581120'),
(10, 'National Water Supply and Drainage Board', 'Galle Road, Ratmalana', '0112638999'),
(11, 'Urban Development Authority (UDA)', 'Sethsiripaya Stage 1, Battaramulla', '0112873646'),
(12, 'Central Bank of Sri Lanka', 'No.30, Janadhipathi Mawatha, Colombo 01', '0112477000'),
(13, 'Board of Investment of Sri Lanka (BOI)', 'Level 26, West Tower, World Trade Center, Colombo 01', '0112434403'),
(14, 'Department of Labour', 'No. 11, Castle Street, Colombo 08', '0112368501'),
(15, 'Sri Lanka Ports Authority', 'No.19, Chaithya Road, Colombo 01', '0112421201'),
(16, 'Department of Immigration and Emigration', 'Suhurupaya, Battaramulla', '0115329000');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `mid` int(11) NOT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`mid`, `nic`, `full_name`, `email`, `mobile`, `password`) VALUES
(1, '123456789V', 'John Doe', 'john.doe@example.com', '0771234567', '$2a$10$Iwe2cO0RECDuYdQvjZDDaeCZDAZkfR6X9ZZdrwFRWC.KHFGj9EIMm'),
(2, '200106902534', 'Chethiya Nimesha Senadheera', 'chethiyanimesha19@gmail.com', '0762240099', '$2a$10$P9O7Gf1CJ1yuFtt9XW0MC.UoH7Mx435FblJD6D92T9yLgrBO9bdpa'),
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
(2, 'K.G.C.N.Senadheera', '2001-03-09', '8004563587', 'Commercial Bank', 'Kotikawatta', '326 Kotikawatta', 'Mulleriyawa New Town', 'Single', 2),
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
(5, 'NITF Annual Report 2019 Sinhala.pdf', 'NITF Annual Report 2019 Sinhala', 2),
(6, 'NITF Annual Report 2010 English.pdf', 'NITF Annual Report 2010 English', 3),
(7, 'NITF Annual Report 2019 Sinhala.pdf', 'NITF Annual Report 2019 Sinhala', 3),
(8, 'NITF Annual Report 2019 Sinhala.pdf', 'NITF Annual Report 2019 Sinhala', 1),
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
  `mobile` varchar(50) NOT NULL,
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
-- Indexes for table `garage`
--
ALTER TABLE `garage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `institute`
--
ALTER TABLE `institute`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `garage`
--
ALTER TABLE `garage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `institute`
--
ALTER TABLE `institute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
