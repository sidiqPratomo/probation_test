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

 INSERT INTO composers (composer_name) VALUES
('Adam'),
('Bono');

-- Insert into songs
INSERT INTO songs (title, duration, release_date) VALUES
('Song A', 320, '2022-01-15'),
('Song B', 280, '2022-03-10'),
('Song C', 150, '2023-02-20'),
('Song D', 350, '2022-05-01');

-- Insert into contracts
INSERT INTO contracts (song_id, composer_id, contract_date, royalty_rate) VALUES
(1, 1, '2022-02-01', 0.25),
(2, 2,  '2022-04-01', 0.15),
(3, 1,  '2023-03-01', 0.12),
(4, 2,  '2023-06-01', 0.30);


SELECT
    s.title AS "Song Title",
    s.duration AS "Song Duration",
    s.release_date AS "Song Release Date",
    c.composer_name AS "Composer Name",
    ctr.contract_date AS "Contract Date",
    CASE
        WHEN s.duration > 300 AND ctr.royalty_rate > 0.2 THEN s.duration * ctr.royalty_rate * 1.2
        WHEN s.duration <= 300 AND ctr.royalty_rate > 0.1 THEN s.duration * ctr.royalty_rate
        ELSE s.duration * ctr.royalty_rate * 0.8
    END AS "Calculated Royalty"
FROM
    songs s
JOIN
    contracts ctr ON s.song_id = ctr.song_id
JOIN
    composers c ON ctr.composer_id = c.composer_id
WHERE
    s.release_date <= '2021-02-20'
    AND ctr.contract_date >= '2021-01-01'
    AND (
        (c.composer_name = 'Adam') OR
        (c.composer_name = 'Bono')
    );