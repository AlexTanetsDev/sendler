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
        email TEXT NOT NULL,
        user_name TEXT NOT NULL ,
        user_active BOOLEAN DEFAULT true,
        tel BIGINT NOT NULL,
        user_password TEXT NOT NULL,
        balance INT NOT NULL DEFAULT 0,
        user_token TEXT,
        user_create_date TIMESTAMP DEFAULT NOW():: timestamp
    );

CREATE TABLE
    clients (
        client_id SERIAL,
        tel BIGINT NOT NULL,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        first_name TEXT,
        middle_name TEXT,
        last_name TEXT,
        date_of_birth DATE,
        parameter_1 TEXT,
        parameter_2 TEXT,
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
        sending_group_date TIMESTAMP DEFAULT NOW():: timestamp,
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
        status_changing_date TIMESTAMP DEFAULT NOW():: timestamp
    );

CREATE TABLE
    transactions_history(
        transaction_id SERIAL,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        --here is an a question: are we want to save this history regardless of user deletion??
        sms_count INT NOT NULL,
        money_count MONEY NOT NULL,
        PRIMARY KEY (transaction_id),
        transactions_date TIMESTAMP DEFAULT NOW():: timestamp
    );