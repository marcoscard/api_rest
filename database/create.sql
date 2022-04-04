create schema shelf;

create table shelf.books (
    id serial primary key,
    title text not null,
    sinopse text not null,
    author varchar(255) not null,
    ano_pub date not null,
    date timestamp default now()   
);