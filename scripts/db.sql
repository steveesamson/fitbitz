DROP DATABASE fitbitz;
DROP ROLE fituser ;

DROP USER fituser;

CREATE USER fituser WITH PASSWORD 'fituser';
CREATE DATABASE fitbitz OWNER = fituser;



GRANT CONNECT ON DATABASE fitbitz TO fituser ;
GRANT ALL PRIVILEGES ON DATABASE fitbitz TO fituser;

\c fitbitz


CREATE TABLE users (
  id serial PRIMARY KEY,
  fullname varchar(50) NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  password varchar(50) NOT NULL
);

CREATE TABLE measurements (
  id serial PRIMARY KEY,
  userid integer NOT NULL,
  time varchar(50) NOT NULL,
  weight real NOT NULL
);
		
ALTER TABLE measurements ADD FOREIGN KEY(userid) REFERENCES users (id) ON DELETE CASCADE;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO fituser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO fituser;

