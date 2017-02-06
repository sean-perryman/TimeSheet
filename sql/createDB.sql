CREATE DATABASE timeSheet;
USE timeSheet;

CREATE TABLE employees (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	phone int,
	email varchar(255),
	access_code varchar(6) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE clients (
	id int NOT NULL AUTO_INCREMENT,
	site_name varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE jobcodes (
	id int NOT NULL AUTO_INCREMENT,
	code int NOT NULL,
	description varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE timeentry (
	id int NOT NULL AUTO_INCREMENT,
	employee_id int NOT NULL,
	client_id int NOT NULL,
	jobcode_id int NOT NULL,
	date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
