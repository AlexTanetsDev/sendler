-- Active: 1699360075140@@194.28.86.87@5432@bsender

DROP TABLE sendler_name;
DROP TABLE recipients_status;

DROP TABLE transactions_history;

DROP TABLE sms_identificators;

DROP TABLE sending_history;

DROP TABLE groups_members;

DROP TABLE send_groups;

DROP TABLE clients;

DROP TABLE users;

CREATE TYPE user_role AS ENUM('admin', 'user', 'superAdmin');

CREATE TABLE
    users (
        user_id SERIAL PRIMARY KEY,
        user_login TEXT UNIQUE NOT NULL,
        email TEXT NOT NULL,
        user_name TEXT NOT NULL,
        user_role text NOT NULL DEFAULT 'user':: character varying,
        user_active BOOLEAN DEFAULT true,
        tel TEXT UNIQUE NOT NULL,
        user_password TEXT NOT NULL,
        balance INT NOT NULL DEFAULT 0,
        user_token TEXT,
        user_create_date TIMESTAMP DEFAULT NOW():: timestamp
    );

CREATE TABLE clients (
    client_id SERIAL, tel TEXT NOT NULL, user_id INT REFERENCES users (user_id) ON DELETE CASCADE, first_name TEXT, middle_name TEXT, last_name TEXT, date_of_birth DATE, parameter_1 TEXT, parameter_2 TEXT, PRIMARY KEY (client_id)
);

CREATE TABLE
    send_groups (
        group_id SERIAL,
        group_name TEXT NOT NULL,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        PRIMARY KEY (group_id),
        group_create_date TIMESTAMP DEFAULT NOW():: timestamp(0)
    );

CREATE UNIQUE INDEX send_groups_group_id_idx ON send_groups (group_id);

CREATE TABLE groups_members (
    group_id INT REFERENCES send_groups (group_id) ON DELETE CASCADE, client_id INT REFERENCES clients (client_id) ON DELETE CASCADE, PRIMARY KEY (group_id, client_id)
);

CREATE TABLE
    sending_history(
        history_id SERIAL,
        group_id INT REFERENCES send_groups(group_id) ON DELETE CASCADE,
        sending_group_date TIMESTAMP DEFAULT NOW():: timestamp,
        PRIMARY KEY (history_id),
        send_method send_method_type DEFAULT 'api',
				text_sms TEXT NOT NULL
    );

CREATE TYPE send_method_type AS ENUM('veb', 'api');

CREATE TYPE status_type AS ENUM(
    'pending', 'fullfield', 'rejected'
);

CREATE UNIQUE INDEX clients_client_id_idx ON clients (client_id);

CREATE TABLE
    recipients_status(
        recipient_id SERIAL,
        history_id INT REFERENCES sending_history(history_id) ON DELETE CASCADE,
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
        transactions_date TIMESTAMP DEFAULT NOW():: timestamp(0)
    );

CREATE TABLE sms_identificators (
    sms_id SERIAL, history_id INT REFERENCES sending_history (history_id) ON DELETE CASCADE, client_id INT REFERENCES clients (client_id), identificator TEXT NOT NULL, PRIMARY KEY (sms_id)
);

CREATE TABLE sendler_name (
    alfa_name_id SERIAL, alfa_name TEXT NOT NULL DEFAULT 'Outlet', user_id INT REFERENCES users (user_id) ON DELETE CASCADE, PRIMARY KEY (alfa_name_id)
);

SELECT clients.client_id, clients.tel
FROM clients
    JOIN groups_members ON groups_members.client_id = clients.client_id
    AND groups_members.group_id = 90;

INSERT INTO
    sms_identificators (
        history_id, client_id, identificator
    )
VALUES (5, 174, '12345'),
    (5, 174, '123456') RETURNING *

update recipients_status
set
    recipient_status = case client_id
        when 174 then 'rejected'
        when 175 then 'rejected'
        when 176 then 'rejected'
        else recipient_status
    end
where
    history_id = 22;