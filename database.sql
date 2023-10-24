-- CREATE TABLE users (

--     user_id SERIAL PRIMARY KEY,

--     login TEXT UNIQUE NOT NULL,

--     tel INT NOT NULL,

--     password VARCHAR(32) NOT NULL,

--     balance INT NOT NULL DEFAULT 0,

--     token TEXT,

--     email TEXT NOT NULL,

--     timestamp TIMESTAMP DEFAULT NOW() :: timestamp

-- );

-- CREATE TABLE clients (

--     client_id SERIAL,

--     tel INT,

--     user_id INT REFERENCES users(user_id) ON DELETE CASCADE,

--     PRIMARY KEY (client_id, user_id)

-- );

-- CREATE TABLE send_groups (

--    group_id SERIAL,

--    name TEXT,

--    user_id INT REFERENCES users ON DELETE CASCADE,

--    clients INT[],

--    PRIMARY KEY (group_id, name)

-- );

-- CREATE UNIQUE INDEX send_groups_group_id_idx ON send_groups(group_id);

-- -- This is a logic for delete client_id from send_groups when client was remove from clients table

-- CREATE OR REPLACE FUNCTION update_clients_array()

-- RETURNS TRIGGER AS $$

-- BEGIN

--     UPDATE send_groups

--     SET clients = array_remove(clients, OLD.client_id)

--     WHERE OLD.client_id = ANY(clients);

--     RETURN NULL;

-- END;

-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER update_clients_array_trigger

-- AFTER DELETE ON clients

-- FOR EACH ROW

-- EXECUTE FUNCTION update_clients_array();

-- CREATE TABLE sending_history(

--    history_id SERIAL,

--    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,

--    group_id INT REFERENCES send_groups(group_id) ON DELETE CASCADE,

--    recipients INT[],

--    timestamp TIMESTAMP DEFAULT NOW() :: timestamp,

--    PRIMARY KEY (history_id, user_id)

-- );

-- CREATE TYPE status_type AS ENUM ('pending', 'fulfield', 'rejected');

-- CREATE UNIQUE INDEX clients_client_id_idx ON clients(client_id);

-- CREATE TABLE recipients_status(

--     recipient_id SERIAL,

--     user_id INT REFERENCES users(user_id) ON DELETE CASCADE,

--     client_id INT REFERENCES clients(client_id) ON DELETE CASCADE,

--     status status_type,

--     PRIMARY KEY (recipient_id, user_id, status),

--     timestamp TIMESTAMP DEFAULT NOW() :: timestamp

-- );

-- CREATE TABLE transactions_history(

-- transaction_id SERIAL,

-- user_id INT REFERENCES users(user_id) ON DELETE CASCADE, --here is an a question: are we want to save this history regardless of user deletion??

-- sms_count INT NOT NULL,

-- money_count MONEY NOT NULL,

-- timestamp TIMESTAMP DEFAULT NOW() :: timestamp

-- );

DROP TABLE recipients_status;

DROP TABLE transactions_history;

DROP TABLE sending_history;

DROP TABLE groups_members;

DROP TABLE send_groups;

DROP TABLE clients;

DROP TABLE users;

CREATE TABLE
    users (
        user_id SERIAL PRIMARY KEY,
        user_login TEXT UNIQUE NOT NULL,
        tel INT NOT NULL,
        user_password TEXT NOT NULL,
        balance INT NOT NULL DEFAULT 0,
        user_token TEXT,
        email TEXT NOT NULL,
        user_create_date TIMESTAMP DEFAULT NOW() :: timestamp
    );

CREATE TABLE
    clients (
        client_id SERIAL,
        tel INT NOT NULL,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        PRIMARY KEY (client_id)
    );

CREATE TABLE
    send_groups (
        group_id SERIAL,
        group_name TEXT NOT NULL,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        PRIMARY KEY (group_id)
    );

CREATE UNIQUE INDEX send_groups_group_id_idx ON send_groups(group_id);

-- This is a logic for delete client_id from send_groups when client was remove from clients table

-- CREATE OR REPLACE FUNCTION update_clients_array() RETURNS

-- TRIGGER AS $$

-- BEGIN

-- 	UPDATE send_groups

-- 	SET	clients = array_remove(clients, OLD.client_id)

-- 	WHERE OLD.client_id = ANY(clients);

--   RETURN NULL;

-- END;

-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER UPDATE_CLIENTS_ARRAY_TRIGGER

-- 	update_clients_array_trigger

-- 	AFTER

-- 	DELETE ON clients FOR EACH ROW

-- 	EXECUTE

-- 	    FUNCTION update_clients_array();

CREATE TABLE
    groups_members(
        group_id INT REFERENCES send_groups(group_id) ON DELETE CASCADE,
        client_id INT REFERENCES clients(client_id) ON DELETE CASCADE,
        PRIMARY KEY (group_id, client_id)
    );

CREATE TABLE
    sending_history(
        history_id SERIAL,
        group_id INT REFERENCES send_groups(group_id) ON DELETE CASCADE,
        sending_group_date TIMESTAMP DEFAULT NOW() :: timestamp,
        PRIMARY KEY (history_id)
    );

CREATE TYPE status_type AS ENUM ('pending', 'fulfield', 'rejected');

CREATE UNIQUE INDEX clients_client_id_idx ON clients(client_id);

CREATE TABLE
    recipients_status(
        recipient_id SERIAL,
        group_id INT REFERENCES send_groups(group_id) ON DELETE CASCADE,
        client_id INT REFERENCES clients(client_id) ON DELETE CASCADE,
        recipient_status status_type,
        PRIMARY KEY (recipient_id),
        status_changing_date TIMESTAMP DEFAULT NOW() :: timestamp
    );

CREATE TABLE
    transactions_history(
        transaction_id SERIAL,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        --here is an a question: are we want to save this history regardless of user deletion??
        sms_count INT NOT NULL,
        money_count MONEY NOT NULL,
        PRIMARY KEY (transaction_id),
        transactions_date TIMESTAMP DEFAULT NOW() :: timestamp
    );