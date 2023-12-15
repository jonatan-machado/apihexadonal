create extension if not exists "uuid-ossp"

create database botwhatsapp;

create table users (
    id uuid primary key,
    name varchar(255) not null,
    password varchar(255) not null,
    email varchar(255) not null
);