create table subdistricts(id SERIAL primary key, subdisctrict_code varchar(255), district_code int, name varchar(255),created_by varchar(255), updated_by varchar(255), created_time DATE, updated_time DATE, status tinyint);

 CREATE TABLE songs (
 song_id SERIAL PRIMARY KEY,
 title VARCHAR(255),
 duration INT,-- duration in seconds, for example
 release_date DATE
 );
 CREATE TABLE composers (
 composer_id SERIAL PRIMARY KEY,
 composer_name VARCHAR(255)
 );
 CREATE TABLE contracts (
 contract_id SERIAL PRIMARY KEY,
 song_id INT REFERENCES songs(song_id),
 composer_id INT REFERENCES composers(composer_id),
 contract_date DATE,
 royalty_rate DECIMAL(5, 2)-- assuming royalty rate as a decimal value
 );