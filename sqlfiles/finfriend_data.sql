CREATE TABLE USERS (
    username        VARCHAR(30) UNIQUE NOT NULL PRIMARY KEY,
    keypass         VARCHAR(30) NOT NULL,
    first_name      VARCHAR(20),
    last_name       VARCHAR(20),
    street          VARCHAR(30) NOT NULL,
    apt_num         VARCHAR(20),
    city            VARCHAR(20) NOT NULL,
    state           VARCHAR(50) NOT Null,
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

CREATE TABLE USER_CART (
	cart_item_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(30) NOT NULL,
    prod_name       VARCHAR(30) NOT NULL,
	inventory_type  VARCHAR(30) NOT NULL,
	quantity        INTEGER NOT NULL,
    FOREIGN KEY (username) REFERENCES USERS(username)
);

CREATE TABLE ORDERS(
	order_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    order_date	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total 		decimal(10,2),
    FOREIGN KEY (username) references users(username)
);

CREATE TABLE ITEMS_IN_ORDER(
	item_id      INTEGER AUTO_INCREMENT PRIMARY KEY,
    order_id    INTEGER,
    prod_name 	VARCHAR(30) NOT NULL,
    inventory_type varchar(30) NOT NULL,
    quantity	INTEGER NOT NULL,
	FOREIGN KEY (order_id) references orders(order_id)
);

INSERT INTO USERS (username, keypass, first_name, last_name, street, apt_num, city, state, zip, admin_perms)
VALUES ('dnieto', 'pass123', 'Daisy', 'Nieto', '123 Main', NULL, 'San Antonio', 'Texas', 12345, TRUE);
