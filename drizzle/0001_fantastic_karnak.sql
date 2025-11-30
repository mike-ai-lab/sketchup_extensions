CREATE TABLE `extensions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(100) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`version` varchar(50) NOT NULL,
	`downloadUrl` text,
	`iconUrl` text,
	`price` int NOT NULL DEFAULT 0,
	`trialDays` int NOT NULL DEFAULT 7,
	`isActive` boolean NOT NULL DEFAULT true,
	`features` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `extensions_id` PRIMARY KEY(`id`),
	CONSTRAINT `extensions_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `generatedLeads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(320),
	`company` varchar(255),
	`website` text,
	`linkedinUrl` text,
	`industry` varchar(100),
	`location` varchar(255),
	`notes` text,
	`source` varchar(100) NOT NULL,
	`quality` enum('high','medium','low') NOT NULL DEFAULT 'medium',
	`status` enum('new','contacted','converted','archived') NOT NULL DEFAULT 'new',
	`generatedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `generatedLeads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(320) NOT NULL,
	`company` varchar(255),
	`phone` varchar(50),
	`message` text,
	`source` varchar(100) NOT NULL DEFAULT 'website',
	`status` enum('new','contacted','converted','archived') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `licenses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`extensionId` int NOT NULL,
	`licenseKey` varchar(64) NOT NULL,
	`status` enum('trial','active','expired','cancelled') NOT NULL DEFAULT 'trial',
	`expiresAt` timestamp,
	`activatedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `licenses_id` PRIMARY KEY(`id`),
	CONSTRAINT `licenses_licenseKey_unique` UNIQUE(`licenseKey`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`extensionId` int NOT NULL,
	`licenseId` int,
	`paypalOrderId` varchar(255),
	`paypalPayerId` varchar(255),
	`amount` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'USD',
	`status` enum('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
	`paymentMethod` varchar(50) NOT NULL DEFAULT 'paypal',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`),
	CONSTRAINT `transactions_paypalOrderId_unique` UNIQUE(`paypalOrderId`)
);
