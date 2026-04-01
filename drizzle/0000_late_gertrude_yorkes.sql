CREATE TABLE `clientes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(20) NOT NULL,
	`tipo` enum('pessoa_fisica','imobiliaria','advogado','empresa') NOT NULL,
	`cpfCnpj` varchar(20),
	`endereco` text,
	`totalVistorias` int DEFAULT 0,
	`totalGasto` decimal(15,2) DEFAULT '0',
	`leadId` int,
	`ativo` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `clientes_id` PRIMARY KEY(`id`),
	CONSTRAINT `clientes_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `laudos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vistoriaId` int NOT NULL,
	`leadId` int NOT NULL,
	`numero` varchar(100),
	`tipo` enum('vistoria','laudo_patologias','avaliacao','inspecao','pericia') NOT NULL,
	`conteudo` longtext,
	`pdfUrl` varchar(500),
	`status` enum('rascunho','em_revisao','finalizado','entregue') NOT NULL DEFAULT 'rascunho',
	`assinadoEm` timestamp,
	`assinadoPor` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `laudos_id` PRIMARY KEY(`id`),
	CONSTRAINT `laudos_numero_unique` UNIQUE(`numero`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(20) NOT NULL,
	`serviceType` enum('vistoria','laudo','pericia','avaliacao','inspecao','assistencia') NOT NULL,
	`propertyAddress` text,
	`propertyArea` decimal(10,2),
	`propertyType` varchar(100),
	`status` enum('novo','contatado','agendado','visitado','laudo_gerado','finalizado','descartado') NOT NULL DEFAULT 'novo',
	`priority` enum('baixa','media','alta') NOT NULL DEFAULT 'media',
	`message` longtext,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`source` varchar(100) DEFAULT 'website',
	`utmSource` varchar(100),
	`utmMedium` varchar(100),
	`utmCampaign` varchar(100),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE TABLE `vistorias` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int NOT NULL,
	`dataVistoria` timestamp,
	`endereco` text NOT NULL,
	`descricao` longtext,
	`status` enum('agendada','realizada','laudo_em_preparacao','laudo_pronto','entregue') NOT NULL DEFAULT 'agendada',
	`preco` decimal(10,2),
	`pago` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vistorias_id` PRIMARY KEY(`id`)
);
