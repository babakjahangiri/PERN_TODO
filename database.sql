-- database creation and settings 

CREATE DATABASE tododb;
CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255),
);
