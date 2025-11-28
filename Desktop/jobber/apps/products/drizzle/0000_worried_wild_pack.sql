CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"category" text,
	"price" real,
	"stock" integer,
	"rating" real,
	"description" text
);
