-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 08 mars 2024 à 13:31
-- Version du serveur : 10.3.29-MariaDB-0+deb10u1
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sae401`
--

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse_1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reponse_3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reponse_4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `themes_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`id`, `question`, `reponse_1`, `reponse_2`, `reponse_3`, `reponse_4`, `image`, `themes_id`) VALUES
(1, 'Quelle structure permet d’obtenir de l\'électricité avec le vent ?\r\n', 'eolienne', NULL, NULL, NULL, NULL, 3),
(2, 'Quelle structure permet d’obtenir de l\'électricité avec de l’eau ?\r\n', 'Barrage', NULL, NULL, NULL, NULL, 3),
(3, 'Quelle est le pourcentage d\'énergie renouvelable consommée en France ?', '-12,3', '-21,4', '-19,3', '-17,1', NULL, 3),
(4, 'À quelle vitesse le vent doit-il souffler pour faire fonctionner une éolienne ?\r\n', 'entre 10 et 70 km/h\r\n', 'entre 14 et 90 km/h', 'au dessus de 90 km/', 'entre 10 et 30 km/h', NULL, 3),
(5, 'Comment appelle-t-on un carburant produit à partir de matières premières végétales ou animales ?', 'agrocarburant', NULL, NULL, NULL, NULL, 3),
(6, 'Dans quel pays se situe la plus grande centrale hydroélectrique ?\r\n', 'Chine', NULL, NULL, NULL, NULL, 3),
(7, 'Quel est le pays d\'Europe le plus écologique ?\r\n', 'Norvège', NULL, NULL, NULL, NULL, 3),
(8, 'Combien de centrales nucléaires en France ?\r\n', '55 ', NULL, NULL, NULL, NULL, 3),
(9, 'De quel pourcentage et  la production d\'énergie nucléaire est en france ?\r\n', '60%', NULL, NULL, NULL, NULL, 3),
(10, 'Quelle est l\'utilité la plus courante de l\'énergie géothermique dans nos foyers ?\r\n', 'chauffage', NULL, NULL, NULL, NULL, 3),
(11, 'quelle est cette structure ?', 'centrale nucléaire', NULL, NULL, NULL, 'https://static.actu.fr/uploads/2023/07/usine-golfech-centrale-nucleaire-tarn-et-garonne-energie.png', 3),
(12, 'Quel est le premier pays producteur d’énergies renouvelables dans le monde ?\r\n', 'chine', NULL, NULL, NULL, NULL, 3),
(13, 'quel est le pays le moins écologique ?\r\n', 'chine', NULL, NULL, NULL, NULL, 3),
(14, 'L’effet photovoltaïque, qui désigne la production d’électricité à partir du rayonnement solaire a été découvert par ?', 'Edmond Becquerel', NULL, NULL, NULL, NULL, 3),
(15, 'Au sein de l’Union européenne, quelle position occupe la France pour la part d’énergies renouvelables dans la consommation finale d’énergie? \r\n', '17', NULL, NULL, NULL, NULL, 3),
(16, 'Quelle est la première énergie renouvelable utilisée en France ?\r\n', 'bois', NULL, NULL, NULL, NULL, 3),
(17, 'Combien existe-t-il de familles d\'énergies renouvelables?\r\n', '5', NULL, NULL, NULL, NULL, 3),
(18, 'quelle est l\'énergie renouvelable la plus rentable ?\r\n', 'solaire', NULL, NULL, NULL, NULL, 3),
(19, 'quel est le nom de l\'énergie renouvelable produite grâce au soleil ?\r\n', 'Energie solaire', NULL, NULL, NULL, NULL, 3),
(20, 'quelle capitale marche à 100% à l\'énergie renouvelable en europe ?\r\n', 'Oslo', NULL, NULL, NULL, NULL, 3),
(21, 'Comment appelle-t-on le phénomène qui permet au plante de produire de l’oxygène ?\r\n', 'la photosynthèse ', NULL, NULL, NULL, NULL, 1),
(22, 'Combien d\'espèces d’animaux sont menacées d’extinction dans le monde ?\r\n', '1000', '4000', '10000', '40000', NULL, 1),
(23, 'qu\'est ce que c\'est ?', 'gande barriere de corail', NULL, NULL, NULL, 'https://odysseedelaterre.fr/wp-content/uploads/2021/09/grande-barriere-corail-australie.jpg', 1),
(24, 'Qu’est ce qui constitue la biodiversité ?', 'Tous les animaux vivant sur Terre\r\n', 'Toutes les plantes et arbres', 'La grande diversité des bactéries et micro-organismes', 'L\'ensemble des êtres vivants de la planète Terre', NULL, 1),
(25, 'Combien d\'espèces vivantes ont été identifiées actuellement ?\r\n', '2 millions', NULL, NULL, NULL, NULL, 1),
(26, 'qu’appelle-t-on le poumon de la terre ?', 'Amazonie ', NULL, NULL, NULL, NULL, 1),
(27, 'Combien de parcs nationaux possèdent la France ?\r\n', '11', NULL, NULL, NULL, NULL, 1),
(28, 'Que signifie OFB ?', 'Office français de la biodiversité', NULL, NULL, NULL, NULL, 1),
(29, 'Qu’est ce que « Yellowstone » ?', 'le premier Parc National ', NULL, NULL, NULL, NULL, 1),
(30, 'Quel est cet animal ? ', 'lynx boréal ', NULL, NULL, NULL, 'https://www.jaitoutcompris.com/img/encyclo/lynx.jpg', 1),
(31, 'Ou trouve t-on le renard du tibet ? \r\n', 'Nepal ', 'France ', 'Etat-unis ', 'Egypte ', NULL, 1),
(32, 'les reptiles sont des animaux à sang ?', 'froid', NULL, NULL, NULL, NULL, 1),
(33, 'Quelle est la troisième forme de vie avec les plantes et les animaux ?\r\n', 'Les champignons', NULL, NULL, NULL, NULL, 1),
(34, 'Quelle est ce poisson ?', 'thon rouge', NULL, NULL, NULL, 'https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/images/actu/thon-rouge.jpg', 1),
(35, 'Quelle est l’animal le plus grand du monde ?\r\n', 'Baleine bleu ', NULL, NULL, NULL, NULL, 1),
(36, 'Que représente ce schéma ?', 'La chaîne alimentaire ', NULL, NULL, NULL, 'https://img31.ccm2.net/YhFWlextjf4S9A6eGRJNAAa5ej8=/910x/smart/176f9190aed642a3b5ab0e5a5db17ef4/ccmcms-hugo/26059886.jpg', 1),
(37, 'Comment appelle-t-on les animaux qui vivent aussi bien dans l’eau que sur terre ?\r\n', 'amphibiens', NULL, NULL, NULL, NULL, 1),
(38, 'Qui produit le plus d’oxygène sur terre ?', 'les animaux ', 'les plantes ', 'les océans', 'l’homme', NULL, 1),
(39, 'Comment appelle-t-on la famille des araignées ?', 'arachnides', NULL, NULL, NULL, 'https://www.aquaportail.com/aquabdd/photos/pterinopelma-sazimai.jpg', 1),
(40, 'Quelle est l\'animal le plus rapide du monde ?', 'Le faucon pèlerin ', NULL, NULL, NULL, NULL, 1),
(41, 'Quelle est l\'espérance de vie d’un chêne ?', '900 ans', NULL, NULL, NULL, NULL, 1),
(42, 'Combien de litres d’eau utilisons-nous lorsque nous prenons un bain ?\r\n', '150 à 200 litres', NULL, NULL, NULL, NULL, 2),
(43, 'Chaque année, en moyenne, nous jetons 288 kg de déchets dans nos poubelles. Une partie de ces déchets pourrait être réutilisée, compostée ou recyclée. Combien en % ?\r\n', '70 % ', NULL, NULL, NULL, NULL, 2),
(44, 'Quelle est la température recommandée à l’intérieur d’un logement ?\r\n', '19 °C\r\n', NULL, NULL, NULL, NULL, 2),
(45, 'Un logement bien isolé conserve mieux la chaleur. Quelle est la principale source de déperdition de chaleur dans une habitation ?\r\n', 'le toit', NULL, NULL, NULL, NULL, 2),
(46, 'combien économise-t-on d\'eau en urinant sous la douche?', '15 litres ', NULL, NULL, NULL, NULL, 2),
(47, 'En moyenne, combien de kilogrammes de déchets une personne produit-elle chaque année en France ?', '354 kg', '31 kg ', '107 kg', '747 kg', NULL, 2),
(48, 'Quel est le moyen le plus efficace pour économiser de l\'électricité avec les appareils électroniques ?\r\n', 'Laisser les appareils en veille', 'Éteindre complètement les appareils lorsqu\'ils ne sont pas utilisés', 'Utiliser des rallonges électriques pour connecter plusieurs appareils ensemble', NULL, NULL, 2),
(49, 'Quelle est le meilleur moment de la journée pour arroser son jardin ?\r\n', 'matin ou soir ', NULL, NULL, NULL, NULL, 2),
(50, 'Quelles types déchets vont dans cette poubelle ?', 'les déchets recyclables ', NULL, NULL, NULL, 'poubelle.png', 2),
(51, 'Comment appelle-t-on ce genre de sac ?', 'tote bag', NULL, NULL, NULL, 'tode.png', 2),
(52, 'un lave vaisselle permet en moyenne d\'économiser\r\n', '20 et 30 litre d’eau  ', NULL, NULL, NULL, NULL, 2),
(53, 'Combien d\'énergie en moins consomment les éclairages LED par rapport aux lampes à incandescence traditionnelles ?', '30%', '10%', '90%', '60%', NULL, 2),
(54, 'Quelle est la consommation moyenne d\'électricité par personne et par an en kWh ?', '2200 kWh', NULL, NULL, NULL, NULL, 2),
(55, 'a quoi correspond ce logo:', 'recyclage \r\n', NULL, NULL, NULL, 'recyclage.png', 2),
(56, 'quel appareil d\'électroménager consomme le plus d’énergie en moyenne ?\r\n', 'Frigo', NULL, NULL, NULL, NULL, 2),
(57, 'Combien coûte par an la consommation électrique d’un appareil en veille ?\r\n', '5', NULL, NULL, NULL, NULL, 2),
(58, 'combien d’euros  peut-on  économiser en ne prenant que des douches ?', '200', NULL, NULL, NULL, NULL, 2),
(59, 'Que peut-on faire pour recycler nos vêtements qui ne nous vont plus ?', 'Les donner', NULL, NULL, NULL, NULL, 2),
(60, 'quelle est cette entreprise de seconde main ?', 'vinted', NULL, NULL, NULL, 'vinted.png', 2),
(61, 'complète cette phrase tiré d’une pub d’engie:\r\nC’est pas …… ici \r\n', 'Versaille ', NULL, NULL, NULL, NULL, 2),
(62, 'quel est la marque de voiture électrique la plus vendue ?\r\n', 'tesla', NULL, NULL, NULL, NULL, 4),
(63, 'quel est le moyen de transport le moins polluant au monde ?', 'La marche ', NULL, NULL, NULL, NULL, 4),
(64, 'Quel est le carburant le plus écologique ?\r\n', 'gpl', NULL, NULL, NULL, NULL, 4),
(65, 'quel est la voiture électrique la plus rapide du monde ?\r\n', 'rimac nevera', NULL, NULL, NULL, NULL, 4),
(66, 'quel autre carburant peux connu n\'a aucun impact environnemental ?\r\n', 'Hydrogène', NULL, NULL, NULL, NULL, 4),
(67, 'En quelle année a été inventée la première voiture électrique ?\r\n', '1834 ', NULL, NULL, NULL, NULL, 4),
(68, 'A qui appartient se logo ?\r\n', 'tesla', NULL, NULL, NULL, 'tesla.png', 4),
(69, 'comment s’appelle cet inventeur?', 'Robert anderson', 'Nicola Tesla ', 'Albert Einstein', 'Elon Musk', 'robert.png', 4),
(70, 'quelle vitesse peut atteindre la voiture electricque la plus rapide ?', '415km', NULL, NULL, NULL, NULL, 4),
(71, 'Qui c’est ?', 'Elon Musk', NULL, NULL, NULL, 'Elon.png', 4),
(72, 'moyen le plus propre pour des longue distance ?\r\n', 'train', NULL, NULL, NULL, NULL, 4),
(73, 'quelle est le moyen de transport le plus polluant ?\r\n', 'Avion ', NULL, NULL, NULL, NULL, 4),
(74, 'Quelle est la ville la plus congestionnée de France, apres Paris ?\r\n', 'Bordeaux', NULL, NULL, NULL, NULL, 4),
(75, 'En France, sur 10 salariés combien utilisent la voiture pour se rendre sur leur lieu de travail ?', '6', '7', '8', '9', NULL, 4),
(76, 'Parmi les émissions de CO2 dues au transport routier en Europe, quelle est la part liée aux voitures individuelles ?\r\n', '20%', '40%', '60%', '70%', NULL, 4),
(77, 'Combien coûte un trajet de 10 km en ville en voiture ?\r\n', '5', NULL, NULL, NULL, NULL, 4),
(78, 'Dans quelle ville européenne, la proportion d\'habitants qui se déplacent principalement à vélo est-elle la plus importante ?\r\n', 'Copenhague ', NULL, NULL, NULL, NULL, 4),
(79, 'D’après vous, pour des marchandises, quel est le mode de transport le plus économe en carburant ?\r\n', 'camion', NULL, NULL, NULL, NULL, 4),
(80, 'pays avec le plus de voiture électrique ?', 'Chine', NULL, NULL, NULL, NULL, 4),
(81, 'qui a inventer la batterie rechargeable ?', 'akira yoshino', 'elon musk', 'nikola tesla', 'grégoire arbsteit', NULL, 4),
(82, 'quelle a été la première énergie renouvelable ?', 'energie eolienne', NULL, NULL, NULL, NULL, 5),
(83, 'A quelle période a été exploitée l\'énergie éolienne pour la première fois ?\r\n', 'antiquité', NULL, NULL, NULL, NULL, 5),
(84, 'En quelle année est apparu le terme écologie pour la première fois ?\r\n', '1945', '2001', '1866', '1780', NULL, 5),
(85, 'Qu’est ce que c’est ', 'moulin', NULL, NULL, NULL, 'moulin.png', 5),
(86, 'Le terme écologie vient du grec « oikos » qui signifie\r\n', 'plante', 'mere', 'terre', 'maison', NULL, 5),
(87, 'en quelle année a été crée le parti eelv(Europe Ecologie Les Verts)\r\n', '1984', NULL, NULL, NULL, NULL, 5),
(88, 'Quel élève d\'Aristote est considéré comme l\'un des premiers écologistes\r\n?', 'Théophraste', NULL, NULL, NULL, NULL, 5),
(89, 'Quand a eu lieu la première cop mondiale ?', '1995', NULL, NULL, NULL, NULL, 5),
(90, 'En quelle année fut instauré le premier « Jour de la Terre » ? \r\n', '1970', NULL, NULL, NULL, NULL, 5),
(91, 'Quand a été créé le premier parc national aux États-Unis, Yellowstone ?\r\n', '1872', NULL, NULL, NULL, NULL, 5),
(92, 'Quel est le bilan carbone de la France en 2022 en millions ?', '441', NULL, NULL, NULL, NULL, 5),
(93, 'de quelle marque vient ce logo ?\r\n', 'shell', NULL, NULL, NULL, 'shell.png', 5),
(94, 'qui est ce ?\r\n', 'greta Thunberg', NULL, NULL, NULL, 'greta.png', 5),
(95, 'comment s\'appelle la ville ou une centrale nucléaire  a explosé ?\r\n', 'Tchernobyl', NULL, NULL, NULL, NULL, 5),
(96, 'comment se nommer le mouvement contre l\'augmentation de l\'essence en France ?', 'gilet jaune', NULL, NULL, NULL, NULL, 5),
(97, 'combien un arbre produit de feuille de papier ?', '10000', '3988', '6666', '8333', NULL, 5),
(98, 'Quelle est la ville la plus pollue au monde ?', 'Avhaz', NULL, NULL, NULL, NULL, 5),
(99, 'Fleuve le plus pollué en inde ?', 'Gange', NULL, NULL, NULL, NULL, 5);

-- --------------------------------------------------------

--
-- Structure de la table `stat`
--

CREATE TABLE `stat` (
  `id` int(11) NOT NULL,
  `nb_game` int(11) NOT NULL,
  `nb_victoire` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `themes`
--

CREATE TABLE `themes` (
  `id` int(11) NOT NULL,
  `nom_themes` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `themes`
--

INSERT INTO `themes` (`id`, `nom_themes`) VALUES
(1, 'Biodiversité '),
(2, 'Eco-geste'),
(3, 'Energie-renouvelable '),
(4, 'Eco-transport '),
(5, 'Commun ');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mdp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_B6F7494E94F4A9D2` (`themes_id`);

--
-- Index pour la table `stat`
--
ALTER TABLE `stat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_20B8FF21A76ED395` (`user_id`);

--
-- Index pour la table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT pour la table `stat`
--
ALTER TABLE `stat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `themes`
--
ALTER TABLE `themes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `FK_B6F7494E94F4A9D2` FOREIGN KEY (`themes_id`) REFERENCES `themes` (`id`);

--
-- Contraintes pour la table `stat`
--
ALTER TABLE `stat`
  ADD CONSTRAINT `FK_20B8FF21A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
