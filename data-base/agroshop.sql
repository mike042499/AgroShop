-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2025 a las 19:37:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agroshop`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedidos` int(11) NOT NULL,
  `fecha_pedido` date NOT NULL,
  `fecha_salida` date NOT NULL,
  `direccion_entrega` varchar(100) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `valor_total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedidos`, `fecha_pedido`, `fecha_salida`, `direccion_entrega`, `id_usuario`, `valor_total`) VALUES
(1, '2025-05-20', '2025-05-21', 'Calle Falsa 123, Ciudad A', 1, 1000),
(2, '2025-05-21', '2025-05-23', 'Cra 10 #20-30, Ciudad Bolivar', 2, 750.5),
(3, '2025-05-22', '2025-05-24', 'Av. 1 de Mayo #11-22, Ciudad Bolivar', 3, 560.25),
(4, '2025-05-23', '2025-05-26', 'Av. Libertador 456, Ciudad D', 4, 890),
(5, '2025-05-24', '2025-05-27', 'Cra 8 #70-90, Ciudad Bolivar', 5, 430.75);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` double NOT NULL,
  `descripcion` varchar(80) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `precio`, `descripcion`, `cantidad`, `imagen`) VALUES
(1, 'Zanahoria', 2500, 'Zanahoria fresca por libra', 100, 'zanahoria.jpg'),
(2, 'Tomate Chonto', 3200, 'Tomate rojo ideal para ensaladas', 80, 'tomate_chonto.jpg'),
(3, 'Papa Criolla', 2800, 'Papa criolla por libra', 120, 'papa_criolla.jpg'),
(4, 'Lechuga Batavia', 1800, 'Lechuga fresca unidad', 60, 'lechuga_batavia.jpg'),
(5, 'Cebolla Larga', 2000, 'Cebolla larga en manojos', 75, 'cebolla_larga.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_pedido`
--

CREATE TABLE `producto_pedido` (
  `id_producto_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_pedidos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `producto_pedido`
--

INSERT INTO `producto_pedido` (`id_producto_pedido`, `id_producto`, `id_pedidos`) VALUES
(1, 1, 3),
(2, 2, 1),
(3, 4, 5),
(4, 3, 2),
(5, 5, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `localidad` varchar(70) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `correo` varchar(70) NOT NULL,
  `contraseña` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `direccion`, `localidad`, `telefono`, `correo`, `contraseña`) VALUES
(1, 'Laura Martínez', 'Calle 123 #45-67', 'Ciudad Bolivar', '3101234567', 'laura.martinez@email.com', 'clave123'),
(2, 'Carlos Gómez', 'Cra 10 #20-30', 'Ciudad Bolivar', '3009876543', 'carlos.gomez@email.com', 'segura456'),
(3, 'Sofía Ramírez', 'Av. 1 de Mayo #11-22', 'Ciudad Bolivar', '3115553322', 'sofia.ramirez@email.com', 'miClave789'),
(4, 'Juan Torres', 'Calle 50 #30-40', 'Ciudad Bolivar', '3126667788', 'juan.torres@email.com', 'pass321'),
(5, 'María Fernández', 'Cra 8 #70-90', 'Ciudad Bolivar', '3014443322', 'maria.fernandez@email.com', 'claveSegura!');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedidos`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `producto_pedido`
--
ALTER TABLE `producto_pedido`
  ADD PRIMARY KEY (`id_producto_pedido`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_pedidos` (`id_pedidos`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedidos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `producto_pedido`
--
ALTER TABLE `producto_pedido`
  MODIFY `id_producto_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `producto_pedido`
--
ALTER TABLE `producto_pedido`
  ADD CONSTRAINT `producto_pedido_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `producto_pedido_ibfk_2` FOREIGN KEY (`id_pedidos`) REFERENCES `pedidos` (`id_pedidos`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
