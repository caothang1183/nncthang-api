DROP DATABASE nncthang;
CREATE DATABASE nncthang with template=template0 owner=sp_admin;
DROP USER sp_admin;
CREATE USER sp_admin with password '66cdb722b12ca064dbc61b0445ab08d9';
ALTER DEFAULT PRIVILEGES GRANT ALL ON tables to sp_admin;
ALTER DEFAULT PRIVILEGES GRANT ALL ON sequences to sp_admin;

CREATE TABLE IF NOT EXISTS roles (
  id SERIAL UNIQUE PRIMARY KEY NOT NULL,
  name varchar(20),
  description text,
  created_at timestamp DEFAULT (now())
);

INSERT INTO roles (id, name, description) VALUES (0, 'Unknown', 'No Permission');
INSERT INTO roles (id, name, description) VALUES (1, 'Admin', 'Controling Full Permission');
INSERT INTO roles (id, name, description) VALUES (2, 'Develop', 'Maintain BE/FE');

CREATE TABLE IF NOT EXISTS users (
  id varchar(255) PRIMARY KEY NOT NULL,
  role_id int NOT NULL DEFAULT 0,
  first_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  email varchar(35) NOT NULL,
  password text NOT NULL,
  activated boolean DEFAULT false,
  blocked boolean DEFAULT false,
  updated_at timestamp,
  created_at timestamp DEFAULT (now())
);
ALTER TABLE users ADD CONSTRAINT users_roles_fk FOREIGN KEY (role_id) REFERENCES roles (id);

INSERT INTO users (uuid, role_id,first_name, last_name, email, password) 
VALUES ('5b557284-4f21-4223-950d-358120b9d3b4', 1, 'Nncthang', 'Dev', 'nncthang@gmail.com', '$2b$10$zjyEIiKe3a8feFTvNH0GVOP2Gkhij2dvaBJ7iiXZJqN/Rv./L2y6e');

