CREATE TABLE `checkups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`type` text NOT NULL,
	`result` text,
	`image_uri` text,
	`audio_uri` text,
	`created_at` text DEFAULT '2026-02-09T11:47:04.795Z',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` integer,
	`gender` text,
	`pin` text,
	`created_at` text DEFAULT '2026-02-09T11:47:04.794Z'
);
