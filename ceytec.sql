-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 12-02-2020 a las 18:14:59
-- Versión del servidor: 5.7.23
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ceytec`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Contratante`
--

DROP TABLE IF EXISTS `Contratante`;
CREATE TABLE IF NOT EXISTS `Contratante` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ContratoComercializadora`
--

DROP TABLE IF EXISTS `ContratoComercializadora`;
CREATE TABLE IF NOT EXISTS `ContratoComercializadora` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Subvencion` decimal(10,2) DEFAULT NULL,
  `NumeroSolicitud` varchar(32) NOT NULL DEFAULT '',
  `Facturado` tinyint(1) DEFAULT NULL,
  `NumeroCertificacion` varchar(16) NOT NULL DEFAULT '',
  `FechaGrabCont` date DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ContratoDistribuidora`
--

DROP TABLE IF EXISTS `ContratoDistribuidora`;
CREATE TABLE IF NOT EXISTS `ContratoDistribuidora` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Campana` varchar(16) NOT NULL DEFAULT '',
  `FechaGrabCont` date DEFAULT NULL,
  `FechaGrabCert` date DEFAULT NULL,
  `Cups` varchar(32) NOT NULL DEFAULT '',
  `Regularizacion` decimal(10,2) DEFAULT NULL,
  `NumCertRegul` varchar(32) NOT NULL DEFAULT '',
  `Subvencion` decimal(10,2) DEFAULT NULL,
  `SubvFacturada` tinyint(1) DEFAULT NULL,
  `CobradoSubv` decimal(10,2) DEFAULT NULL,
  `NumCertSubv` varchar(32) NOT NULL DEFAULT '',
  `Colaboracion` decimal(10,2) DEFAULT NULL,
  `ColabFacturada` tinyint(1) DEFAULT NULL,
  `CobradoColab` decimal(10,2) DEFAULT NULL,
  `NumCertColab` varchar(32) NOT NULL DEFAULT '',
  `NumSolicitudZeus` varchar(32) NOT NULL DEFAULT '',
  `SubvencionIdi` decimal(10,2) DEFAULT NULL,
  `IdiFacturado` tinyint(1) DEFAULT NULL,
  `Tipo` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Estado`
--

DROP TABLE IF EXISTS `Estado`;
CREATE TABLE IF NOT EXISTS `Estado` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(16) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Instalacion`
--

DROP TABLE IF EXISTS `Instalacion`;
CREATE TABLE IF NOT EXISTS `Instalacion` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `EsBaja` tinyint(1) NOT NULL DEFAULT '0',
  `Direccion` varchar(128) NOT NULL DEFAULT '',
  `Id_Poblacion` int(11) DEFAULT NULL,
  `Id_Contratante` int(11) DEFAULT NULL,
  `FechaInstalacion` date DEFAULT NULL,
  `Agente` varchar(32) NOT NULL DEFAULT '',
  `Instaladores` varchar(64) NOT NULL DEFAULT '',
  `Presupuesto` decimal(10,2) DEFAULT NULL,
  `Observaciones` varchar(512) NOT NULL DEFAULT '',
  `IRC_NumLlaves` int(1) DEFAULT NULL,
  `IRC_Facturado` tinyint(1) DEFAULT NULL,
  `IRIS_Nombre` varchar(64) NOT NULL DEFAULT '',
  `IRIS_Apellidos` varchar(64) NOT NULL DEFAULT '',
  `IRIS_Dni` varchar(9) NOT NULL DEFAULT '',
  `IRIS_Telefonos` varchar(64) NOT NULL DEFAULT '',
  `IRIS_Cobrado` tinyint(1) DEFAULT NULL,
  `IRIS_AparatoExistente` varchar(32) NOT NULL DEFAULT '',
  `IRIS_AparatosVendidos` varchar(64) NOT NULL DEFAULT '',
  `IRISC_Id_Estado` int(11) DEFAULT NULL,
  `IRISC_FechaContrato` date DEFAULT NULL,
  `IRISC_Observaciones` varchar(512) NOT NULL DEFAULT '',
  `IRISGN_Id_Mercado` int(11) DEFAULT NULL,
  `IRISGN_FechaPuestaGas` date DEFAULT NULL,
  `IRISGN_TiposAparato` varchar(32) NOT NULL DEFAULT '',
  `IRISGN_Piezas` varchar(64) NOT NULL DEFAULT '',
  `IRISGN_TiroForzado` tinyint(1) DEFAULT NULL,
  `IRISGN_SoporteExterior` tinyint(1) DEFAULT NULL,
  `IRISGN_Idi` tinyint(1) DEFAULT NULL,
  `IRISGN_Facturado1` tinyint(1) DEFAULT NULL,
  `IRISGN_Facturado2` tinyint(1) DEFAULT NULL,
  `IRISGN_Id_ContCom` int(11) DEFAULT NULL,
  `IRISGN_Id_ContDist` int(11) DEFAULT NULL,
  `IRISGN_ContObservaciones` varchar(512) NOT NULL DEFAULT '',
  `IRISM_FechaMantenimiento` date DEFAULT NULL,
  `IRISB_Id_TipoTrabajo` int(11) DEFAULT NULL,
  `Tipo` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Direccion` (`Direccion`) USING BTREE,
  KEY `Id_Poblacion` (`Id_Poblacion`) USING BTREE,
  KEY `Id_Contratante` (`Id_Contratante`) USING BTREE,
  KEY `IRISApellidos` (`IRIS_Apellidos`) USING BTREE,
  KEY `IRIS_Id_Estado` (`IRISC_Id_Estado`) USING BTREE,
  KEY `IRISGN_Id_Mercado` (`IRISGN_Id_Mercado`),
  KEY `IRISB_Id_TipoTrabajo` (`IRISB_Id_TipoTrabajo`) USING BTREE,
  KEY `IRISGN_Id_ContCom` (`IRISGN_Id_ContCom`) USING BTREE,
  KEY `IRISGN_Id_ContDist` (`IRISGN_Id_ContDist`) USING BTREE,
  KEY `Tipo` (`Tipo`),
  KEY `FechaInstalacion` (`FechaInstalacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Mercado`
--

DROP TABLE IF EXISTS `Mercado`;
CREATE TABLE IF NOT EXISTS `Mercado` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(16) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Poblacion`
--

DROP TABLE IF EXISTS `Poblacion`;
CREATE TABLE IF NOT EXISTS `Poblacion` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Provincia` int(11) NOT NULL,
  `Nombre` varchar(32) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Nombre` (`Nombre`),
  KEY `Id_Provincia` (`Id_Provincia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Provincia`
--

DROP TABLE IF EXISTS `Provincia`;
CREATE TABLE IF NOT EXISTS `Provincia` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TipoTrabajo`
--

DROP TABLE IF EXISTS `TipoTrabajo`;
CREATE TABLE IF NOT EXISTS `TipoTrabajo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(16) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Instalacion`
--
ALTER TABLE `Instalacion`
  ADD CONSTRAINT `fk_contcom` FOREIGN KEY (`IRISGN_Id_ContCom`) REFERENCES `ContratoComercializadora` (`Id`),
  ADD CONSTRAINT `fk_contdist` FOREIGN KEY (`IRISGN_Id_ContDist`) REFERENCES `ContratoDistribuidora` (`Id`),
  ADD CONSTRAINT `fk_contratante` FOREIGN KEY (`Id_Contratante`) REFERENCES `Contratante` (`Id`),
  ADD CONSTRAINT `fk_estado` FOREIGN KEY (`IRISC_Id_Estado`) REFERENCES `Estado` (`Id`),
  ADD CONSTRAINT `fk_mercado` FOREIGN KEY (`IRISGN_Id_Mercado`) REFERENCES `Mercado` (`Id`),
  ADD CONSTRAINT `fk_poblacion` FOREIGN KEY (`Id_Poblacion`) REFERENCES `Poblacion` (`Id`),
  ADD CONSTRAINT `fk_tipotrabajo` FOREIGN KEY (`IRISB_Id_TipoTrabajo`) REFERENCES `TipoTrabajo` (`Id`);

--
-- Filtros para la tabla `Poblacion`
--
ALTER TABLE `Poblacion`
  ADD CONSTRAINT `fk_provincia` FOREIGN KEY (`Id_Provincia`) REFERENCES `Provincia` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
