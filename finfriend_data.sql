CREATE TABLE USERS (
    username        VARCHAR(30) UNIQUE NOT NULL PRIMARY KEY,
    keypass         VARCHAR(30) NOT NULL,
    first_name      VARCHAR(20),
    last_name       VARCHAR(20),
    street          VARCHAR(30) NOT NULL,
    apt_num         VARCHAR(5),
    city            VARCHAR(20) NOT NULL,
    zip             INTEGER NOT NULL,
    admin_perms     BOOLEAN NOT NULL
);

CREATE TABLE FISH_INVENTORY (
    fish_id         INTEGER NOT NULL PRIMARY KEY,
    fish_name       VARCHAR(30),
    price           INTEGER,
    in_stock        BOOLEAN,
);

CREATE TABLE ALT_INVENTORY (
    alt_id         INTEGER NOT NULL PRIMARY KEY,
    alt_name       VARCHAR(30),
    price           INTEGER,
    in_stock        BOOLEAN
);

SELECT 1+1;

\copy USERS from 'finfriend_users.txt';

SELECT * FROM USERS;

\copy FISH_INVENTORY from 'finfriend_fish.txt';

SELECT * from FISH_INVENTORY;
