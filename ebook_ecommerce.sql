-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 26, 2024 lúc 11:04 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ebook_ecommerce`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `books`
--

CREATE TABLE `books` (
  `id` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `author` varchar(50) NOT NULL,
  `publisher` varchar(50) NOT NULL,
  `published_at` date NOT NULL,
  `category_ID` varchar(50) NOT NULL,
  `inventory_ID` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `discount_ID` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` varchar(50) NOT NULL,
  `session_ID` varchar(50) NOT NULL,
  `book_ID` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categorys`
--

CREATE TABLE `categorys` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `conversations`
--

CREATE TABLE `conversations` (
  `id` varchar(50) NOT NULL,
  `user_IDs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`user_IDs`)),
  `name` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `discounts`
--

CREATE TABLE `discounts` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `discount_percent` decimal(10,0) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` varchar(50) NOT NULL,
  `book_ID` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `star` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inventorys`
--

CREATE TABLE `inventorys` (
  `id` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `id` varchar(50) NOT NULL,
  `sender_ID` varchar(50) NOT NULL,
  `conversation_ID` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `type` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `payment_ID` varchar(50) NOT NULL,
  `total` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` varchar(50) NOT NULL,
  `order_ID` varchar(50) NOT NULL,
  `book_ID` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment_details`
--

CREATE TABLE `payment_details` (
  `id` varchar(50) NOT NULL,
  `order_ID` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `provider` varchar(20) NOT NULL,
  `status` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permissions`
--

CREATE TABLE `permissions` (
  `id` varchar(50) NOT NULL,
  `can_create_account` tinyint(1) NOT NULL DEFAULT 0,
  `can_modify_account` tinyint(1) NOT NULL DEFAULT 0,
  `can_delete_account` tinyint(1) NOT NULL DEFAULT 0,
  `can_create_book` tinyint(1) NOT NULL DEFAULT 0,
  `can_modify_book` tinyint(1) NOT NULL DEFAULT 0,
  `can_delete_book` tinyint(1) NOT NULL DEFAULT 0,
  `can_modify_payment` tinyint(1) NOT NULL DEFAULT 0,
  `can_delete_feedback` tinyint(1) NOT NULL DEFAULT 0,
  `can_reply_message` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `id` varchar(50) NOT NULL,
  `role_ID` varchar(50) NOT NULL,
  `permission_ID` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shoping_sessions`
--

CREATE TABLE `shoping_sessions` (
  `id` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `total` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tokens`
--

CREATE TABLE `tokens` (
  `id` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `access_token` text NOT NULL,
  `refresh_token` text NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT 1,
  `expire_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone_number` varchar(12) NOT NULL,
  `address_line` text DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_has_roles`
--

CREATE TABLE `user_has_roles` (
  `id` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `role_ID` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_payments`
--

CREATE TABLE `user_payments` (
  `id` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `payment_type` varchar(30) NOT NULL,
  `provider` varchar(30) NOT NULL,
  `account_no` int(11) NOT NULL,
  `expiri_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_BOOKS_CATEGORYS` (`category_ID`),
  ADD KEY `foreign_key_constraints_BOOKS_INVENTORYS` (`inventory_ID`),
  ADD KEY `foreign_key_constraints_BOOKS_DISCOUNTS` (`discount_ID`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_CART_ITEMS_SESSION` (`session_ID`),
  ADD KEY `foreign_key_constraints_CART_ITEMS_BOOKS` (`book_ID`);

--
-- Chỉ mục cho bảng `categorys`
--
ALTER TABLE `categorys`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_FEEDBACKS_USERS` (`user_ID`),
  ADD KEY `foreign_key_constraints_FEEDBACKS_BOOKS` (`book_ID`);

--
-- Chỉ mục cho bảng `inventorys`
--
ALTER TABLE `inventorys`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_MESSAGES_CONVERSATIONS` (`conversation_ID`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_ORDER_ITEMS_ORDER_DETAILS` (`order_ID`);

--
-- Chỉ mục cho bảng `payment_details`
--
ALTER TABLE `payment_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_PAYMENT_DETAILS_ORDER_DETAILS` (`order_ID`);

--
-- Chỉ mục cho bảng `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD KEY `foreign_key_constraints_ROLE_PERMISSION` (`role_ID`),
  ADD KEY `foreign_key_constraints_PERMISSION_ROLE` (`permission_ID`);

--
-- Chỉ mục cho bảng `shoping_sessions`
--
ALTER TABLE `shoping_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_SHOPING_SESSIONS_USERS` (`user_ID`);

--
-- Chỉ mục cho bảng `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_TOKENS_USERS` (`user_ID`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_number` (`phone_number`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `user_has_roles`
--
ALTER TABLE `user_has_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_USER_ROLE` (`user_ID`),
  ADD KEY `foreign_key_constraints_ROLE_USER` (`role_ID`);

--
-- Chỉ mục cho bảng `user_payments`
--
ALTER TABLE `user_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_USER_PAYMENT_USERS` (`user_ID`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `foreign_key_constraints_BOOKS_CATEGORYS` FOREIGN KEY (`category_ID`) REFERENCES `categorys` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign_key_constraints_BOOKS_DISCOUNTS` FOREIGN KEY (`discount_ID`) REFERENCES `discounts` (`id`),
  ADD CONSTRAINT `foreign_key_constraints_BOOKS_INVENTORYS` FOREIGN KEY (`inventory_ID`) REFERENCES `inventorys` (`id`);

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `foreign_key_constraints_CART_ITEMS_BOOKS` FOREIGN KEY (`book_ID`) REFERENCES `books` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign_key_constraints_CART_ITEMS_SESSION` FOREIGN KEY (`session_ID`) REFERENCES `shoping_sessions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `foreign_key_constraints_FEEDBACKS_BOOKS` FOREIGN KEY (`book_ID`) REFERENCES `books` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign_key_constraints_FEEDBACKS_USERS` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `foreign_key_constraints_MESSAGES_CONVERSATIONS` FOREIGN KEY (`conversation_ID`) REFERENCES `conversations` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `foreign_key_constraints_ORDER_ITEMS_ORDER_DETAILS` FOREIGN KEY (`order_ID`) REFERENCES `order_details` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `payment_details`
--
ALTER TABLE `payment_details`
  ADD CONSTRAINT `foreign_key_constraints_PAYMENT_DETAILS_ORDER_DETAILS` FOREIGN KEY (`order_ID`) REFERENCES `order_details` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `foreign_key_constraints_PERMISSION_ROLE` FOREIGN KEY (`permission_ID`) REFERENCES `permissions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign_key_constraints_ROLE_PERMISSION` FOREIGN KEY (`role_ID`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `shoping_sessions`
--
ALTER TABLE `shoping_sessions`
  ADD CONSTRAINT `foreign_key_constraints_SHOPING_SESSIONS_USERS` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `foreign_key_constraints_TOKENS_USERS` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `user_has_roles`
--
ALTER TABLE `user_has_roles`
  ADD CONSTRAINT `foreign_key_constraints_ROLE_USER` FOREIGN KEY (`role_ID`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign_key_constraints_USER_ROLE` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `user_payments`
--
ALTER TABLE `user_payments`
  ADD CONSTRAINT `foreign_key_constraints_USER_PAYMENT_USERS` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
