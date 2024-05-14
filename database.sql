-- Active: 1699360075140@@194.28.86.87@5432@bsender
DROP TABLE user_sms_adjustments;

DROP TABLE sendler_name;

DROP TABLE recipients_status;

DROP TABLE transactions_history;

DROP TABLE sms_identificators;

DROP TABLE sending_members;

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
        user_create_date TIMESTAMPTZ DEFAULT NOW():: timestamp(0)
    );

CREATE TABLE clients (
    client_id SERIAL,
    tel TEXT NOT NULL,
    user_id INT REFERENCES users (user_id) ON DELETE CASCADE,
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
        PRIMARY KEY (group_id),
        group_create_date TIMESTAMPTZ DEFAULT NOW():: timestamp(0),
				automatically_generated BOOLEAN DEFAULT FALSE
				);

CREATE TABLE groups_members (
    group_id INT REFERENCES send_groups (group_id) ON DELETE CASCADE,
    client_id INT REFERENCES clients (client_id) ON DELETE CASCADE,
    PRIMARY KEY (group_id, client_id)
);

CREATE TABLE
    sending_history(
        history_id SERIAL,
        sending_group_date TIMESTAMPTZ DEFAULT NOW():: timestamp(0),
        PRIMARY KEY (history_id),
        send_method send_method_type DEFAULT 'api',
				text_sms TEXT NOT NULL,
				sending_permission BOOLEAN DEFAULT TRUE
    );

CREATE TYPE send_method_type AS ENUM('web', 'api');

CREATE TABLE sending_members (
    group_id INT REFERENCES send_groups (group_id) ON DELETE CASCADE,
    history_id INT REFERENCES sending_history (history_id) ON DELETE CASCADE,
    PRIMARY KEY (group_id, history_id)
);

CREATE TYPE status_type AS ENUM(
    'pending',
    'fullfield',
    'rejected'
);

CREATE TABLE
    recipients_status(
        recipient_id SERIAL,
        history_id INT REFERENCES sending_history(history_id) ON DELETE CASCADE,
        client_id INT REFERENCES clients(client_id) ON DELETE CASCADE,
				group_id INT REFERENCES send_groups (group_id) ON DELETE CASCADE,
        recipient_status status_type,
				identificator TEXT NOT NULL,
        PRIMARY KEY (recipient_id),
        status_changing_date TIMESTAMPTZ DEFAULT NOW():: timestamp(0)
    );

ALTER TABLE recipients_status
ADD group_id INT REFERENCES send_groups (group_id) ON DELETE CASCADE;

 
CREATE TABLE
    transactions_history(
        transaction_id SERIAL,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        --here is an a question: are we want to save this history regardless of user deletion??
        sms_count INT NOT NULL,
        money_count MONEY NOT NULL,
        PRIMARY KEY (transaction_id),
        transactions_date TIMESTAMPTZ DEFAULT NOW():: timestamp(0)
    );

CREATE TABLE sms_identificators (
    sms_id SERIAL,
    history_id INT REFERENCES sending_history (history_id) ON DELETE CASCADE,
    client_id INT REFERENCES clients (client_id) ON DELETE CASCADE,
    identificator TEXT NOT NULL,
    PRIMARY KEY (sms_id)
);

CREATE TABLE sendler_name (
    alfa_name_id SERIAL,
    alfa_name TEXT NOT NULL DEFAULT 'Outlet',
    user_id INT REFERENCES users (user_id) ON DELETE CASCADE,
    alfa_name_active BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (alfa_name_id)
);

CREATE TABLE user_sms_adjustments (
	adjustment_id SERIAL NOT NULL,
	create_time TIMESTAMPTZ DEFAULT NOW():: timestamp(0),
	user_id INT REFERENCES users (user_id) ON DELETE CASCADE,
	sms_count INTEGER
);

CREATE TABLE example_recipients_status (
    recipient_id SERIAL,
    history_id INT,
    recipient_status status_type,
    PRIMARY KEY (recipient_id)
);

CREATE OR REPLACE FUNCTION get_sms_by_user(id bigint
, smsType status_type) RETURNS bigint AS 
$$
	SELECT COUNT(*)
	FROM
	    send_groups sg
	    INNER JOIN users u ON u.user_id = sg.user_id
	    INNER JOIN groups_members gm ON gm.group_id = sg.group_id
	    INNER JOIN recipients_status rs ON rs.client_id = gm.client_id
	    AND rs.group_id = sg.group_id
	WHERE
	    u.user_id = id
	    AND recipient_status = smsType $$ LANGUAGE
SQL;

CREATE OR REPLACE FUNCTION get_sent_sms_by_user(id 
bigint) RETURNS bigint AS 
$$
	SELECT COUNT(*)
	FROM
	    send_groups sg
	    INNER JOIN users u ON u.user_id = sg.user_id
	    INNER JOIN groups_members gm ON gm.group_id = sg.group_id
	    INNER JOIN recipients_status rs ON rs.client_id = gm.client_id
	    AND rs.group_id = sg.group_id
	WHERE
	    u.user_id = id $$ LANGUAGE
SQL;

CREATE OR REPLACE FUNCTION get_delivered_sms_by_user_and_history_id
(id bigint, historyId bigint) RETURNS bigint AS 
$$
	SELECT COUNT(*)
	FROM
	    send_groups sg
	    INNER JOIN users u ON u.user_id = sg.user_id
	    INNER JOIN groups_members gm ON gm.group_id = sg.group_id
	    INNER JOIN sending_members sm ON sm.group_id = sg.group_id
	    INNER JOIN recipients_status rs ON rs.client_id = gm.client_id
	    AND rs.history_id = sm.history_id
	WHERE
	    u.user_id = id
	    AND rs.history_id = historyId
	    AND recipient_status = 'fullfield' $$ LANGUAGE
SQL;

-- CREATE OR REPLACE FUNCTION get_delivered_sms_by_user
-- (id bigint) RETURNS bigint AS
-- $$
-- 	SELECT COUNT(*)
-- 	FROM
-- 	    send_groups sg
-- 	    INNER JOIN users u ON u.user_id = sg.user_id
-- 	    INNER JOIN groups_members gm ON gm.group_id = sg.group_id
-- 	    INNER JOIN sending_members sm ON sm.group_id = sg.group_id
-- 	    INNER JOIN recipients_status rs ON rs.client_id = gm.client_id
-- 	    AND rs.history_id = sm.history_id
-- 	WHERE
-- 	    u.user_id = id
-- 	    AND recipient_status = 'fullfield' $$ LANGUAGE
-- SQL;

CREATE OR REPLACE FUNCTION get_rejected_sms_by_user_and_history_id
(id bigint, historyId bigint) RETURNS bigint AS 
$$
	SELECT COUNT(*)
	FROM
	    send_groups sg
	    INNER JOIN users u ON u.user_id = sg.user_id
	    INNER JOIN groups_members gm ON gm.group_id = sg.group_id
	    INNER JOIN sending_members sm ON sm.group_id = sg.group_id
	    INNER JOIN recipients_status rs ON rs.client_id = gm.client_id
	    AND rs.history_id = sm.history_id
	WHERE
	    u.user_id = id
	    AND rs.history_id = historyId
	    AND recipient_status = 'rejected' $$ LANGUAGE
SQL;

-- CREATE OR REPLACE FUNCTION get_rejected_sms_by_user_id
-- (id bigint) RETURNS bigint AS
-- $$
-- 	SELECT COUNT(*)
-- 	FROM
-- 	    send_groups sg
-- 	    INNER JOIN users u ON u.user_id = sg.user_id
-- 	    INNER JOIN groups_members gm ON gm.group_id = sg.group_id
-- 	    INNER JOIN sending_members sm ON sm.group_id = sg.group_id
-- 	    INNER JOIN recipients_status rs ON rs.client_id = gm.client_id
-- 	    AND rs.history_id = sm.history_id
-- 	WHERE
-- 	    u.user_id = id
-- 	    AND recipient_status = 'rejected' $$ LANGUAGE
-- SQL;

CREATE OR REPLACE FUNCTION get_pending_sms_by_user_and_history_id
(id bigint, historyId bigint) RETURNS bigint AS 
$$
	SELECT COUNT(*)
	FROM
	    send_groups sg
	    INNER JOIN users u ON u.user_id = sg.user_id
	    INNER JOIN groups_members gm ON gm.group_id = sg.group_id
	    INNER JOIN sending_members sm ON sm.group_id = sg.group_id
	    INNER JOIN recipients_status rs ON rs.client_id = gm.client_id
	    AND rs.history_id = sm.history_id
	WHERE
	    u.user_id = id
	    AND rs.history_id = historyId
	    AND recipient_status = 'pending' $$ LANGUAGE
SQL;

-- CREATE OR REPLACE FUNCTION get_pending_sms_by_user(
-- id bigint) RETURNS bigint AS
-- $$
-- 	SELECT COUNT(*)
-- 	FROM
-- 	    send_groups sg
-- 	    INNER JOIN users u ON u.user_id = sg.user_id
-- 	    INNER JOIN groups_members gm ON gm.group_id = sg.group_id
-- 	    INNER JOIN sending_members sm ON sm.group_id = sg.group_id
-- 	    INNER JOIN recipients_status rs ON rs.client_id = gm.client_id
-- 	    AND rs.history_id = sm.history_id
-- 	WHERE
-- 	    u.user_id = id
-- 	    -- AND rs.history_id = historyId
-- 	    AND recipient_status = 'pending' $$ LANGUAGE
-- SQL;

CREATE OR REPLACE FUNCTION get_paid_sms_by_user(id 
bigint) RETURNS bigint AS 
$$
	SELECT SUM(sms_count)
	FROM transactions_history
	WHERE
	    user_id = id
	GROUP BY
	    user_id $$ LANGUAGE
SQL;

CREATE OR REPLACE FUNCTION get_adjustment_sms_by_user
(id bigint) RETURNS bigint AS 
$$
	  SELECT SUM ( sms_count ) FROM user_sms_adjustments WHERE user_id = ${id} $$ LANGUAGE
	
SQL;

CREATE OR REPLACE FUNCTION get_user_balance(id bigint
, OUT result bigint) AS 
$$
DECLARE
	paid bigint; 
	delivered bigint;
	pending bigint;
	adjustment bigint;
BEGIN
	paid = get_paid_sms_by_user (id);
	delivered = get_delivered_sms_by_user (id);
	pending = get_pending_sms_by_user (id);
	adjustment = get_adjustment_sms_by_user (id);
	IF(paid IS NULL) THEN paid = 0;
END
	IF;
	IF(delivered IS NULL) THEN delivered = 0;
END
	IF;
	IF(pending IS NULL) THEN pending = 0;
END
	IF;
	IF(adjustment IS NULL) THEN adjustment = 0;
END
	IF;
	result = paid - delivered - pending - adjustment;
END
$$
LANGUAGE
plpgsql;

ALTER TYPE send_method_type RENAME VALUE 'veb' TO 'web';