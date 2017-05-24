-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 23, 2017 at 10:34 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.0.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newpam`
--

-- --------------------------------------------------------

--
-- Table structure for table `fields`
--

CREATE TABLE `fields` (
  `id_field` int(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `name` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fields`
--

INSERT INTO `fields` (`id_field`, `type`, `name`, `description`, `price`) VALUES
(3, 'radio', 'крест', 'отсутствует', 0),
(4, 'radio', 'крест', 'стандартный крест в углу памятника', 80);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id_img` int(30) NOT NULL,
  `id_pam` int(30) NOT NULL,
  `image` varchar(90) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id_img`, `id_pam`, `image`) VALUES
(1, 1, 'carriage_wood_night_wolves_flight_32010_1920x1080.jpg'),
(2, 1, 'cliffs_destruction_city_landscape_waterfall_69033_1920x1080.jpg'),
(3, 1, 'crows_fog_haze_tree_death_21730_1920x1080.jpg'),
(4, 2, 'crows_fog_haze_tree_death_21730_1920x1080.jpg'),
(5, 2, 'deer_horns_moon_stars_4795_1920x1080.jpg'),
(6, 3, 'fantasy_art_armor_104751_1920x1080.jpg'),
(7, 3, 'girl_elfeyka_demon_hand_hair_69023_1920x1080.jpg'),
(8, 4, 'girl_guns_blood_hand_bones_protection_69195_1920x1080.jpg'),
(9, 4, 'girl_wings_angel_black_white_63046_1920x1080.jpg'),
(10, 5, 'lock_mountains_city_fog_3479_1920x1080.jpg'),
(11, 5, 'rider_horse_wizard_art_103971_1920x1080.jpg'),
(12, 6, 'transcendence_film_johnny_depp_94264_1920x1080.jpg'),
(13, 6, 'transport_city_rings_spaceships_planets_plants_crater_fantasy_100490_1920x1080.jpg'),
(14, 7, 'undead_demon_skeletons_soldiers_battle_horses_69201_1920x1080.jpg'),
(15, 7, 'warrior_dragon_weapons_fantasy_96211_1920x1080.jpg'),
(16, 8, 'zombies_fantasy_art_89548_1920x1080.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id_item` int(11) NOT NULL,
  `menu_name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id_item`, `menu_name`) VALUES
(1, 'Главное меню'),
(3, 'Памятники');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id_prod` int(30) NOT NULL,
  `id_pam` int(30) NOT NULL,
  `id_type` int(30) NOT NULL,
  `price` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id_prod`, `id_pam`, `id_type`, `price`) VALUES
(1, 12, 1, 1233),
(2, 11, 1, 5000),
(3, 10, 1, 3000),
(4, 13, 1, 4444),
(5, 15, 1, 6000),
(6, 16, 1, 7000),
(7, 17, 1, 3000),
(8, 20, 1, 2000);

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `id_type` int(11) NOT NULL,
  `name` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `folder` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `parent` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`id_type`, `name`, `folder`, `parent`) VALUES
(1, 'Гранит Одинарный', 'single/', '1'),
(2, 'Двойной', 'double/', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fields`
--
ALTER TABLE `fields`
  ADD PRIMARY KEY (`id_field`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id_img`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_item`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_prod`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fields`
--
ALTER TABLE `fields`
  MODIFY `id_field` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id_img` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id_prod` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `id_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
