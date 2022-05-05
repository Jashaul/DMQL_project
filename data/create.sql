create table domains
(
    domain_id serial primary key,
    domain text not null
);

create table authors
(
    author_id serial primary key,
    author varchar(255) not null,
    join_date date
);

create table articles
(
    article_id serial primary key,
    author_id int not null,
    title text not null,
    subtitle text,
    url text not null,
    date_posted date,
    domain_id int not null,
    foreign key (domain_id) references domains(domain_id),
    foreign key (author_id) references authors(author_id) on delete set null
);

create table article_meta
(
    article_id int primary key,
    claps int,
    responses int,
    reading_time int,
    tags int,
    title_len int,
    subtitle_len int,
    prev_mon_topic_rate float,
    foreign key (article_id) references articles(article_id) on delete cascade
);

create table author_trend
(
    author_id int primary key,
    clap_sum int,
    response_sum int,
    read_time_sum int,
    foreign key (author_id) references authors(author_id) on delete cascade
);

create table site_trend
(
    domain_id int primary key,
    clap_sum int,
    response_sum int,
    read_time_sum int,
    foreign key (domain_id) references domains(domain_id)
);