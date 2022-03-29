# eLection API

This is the API of a dummy eLection website

## Use case

### Steps of registration

1. ask citizen data
    - throw error if invalid data given or already voting citizen
2. ask email and password
    - register voting citizen by generating token with payload (citizen id and fullname)
3. show token

### Steps of voting

1. ask token and password
2. ask which party and candidate the citizen is voting for
3. success

### Steps of verify previous voting

1. ask token and password
2. show chosen party and candidate

## Endpoints

The base uri is **/api**

| method  | uri                       | desc |
| ------- | ------------------------- | ---- |
| **Test**                                                             |
| GET     | /test/citizen             | Gets all the test citizen data |
| POST    | /test/citizen/generate    | Generates a new test citizen   |
| **Authorization**                                                    |
| POST    | /auth/citizen-validate    | Check if the given citizen's data is valid and have not registered yet |
| POST    | /auth/register            | Generates a new voting citizen with token |
| POST    | /auth/login               | Logins the voting citizen by using token and password |

## Database schema

citizens
----------
id int PK
identity_number UNIQUE varchar(8)
firstname varchar(255)
lastname varchar(255)
birth_date date
district_id int FK >- districts.id

voting_citizens
----------
id int PK
token UNIQUE varchar(255)
password varchar(255)
email UNIQUE varchar(255)
last_login date default=NOW()
citizen_id int FK >- citizens.id

votes
----------
id int PK
created_at date
voting_citizen_id UNIQUE int FK >- voting_citizens.id
party_id UNIQUE int FK >- parties.id
candidate_id UNIQUE int FK >- candidates.id


districts
----------
id int PK
name UNIQUE varchar(255)

parties
----------
id int PK
name UNIQUE varchar(255)
website varchar(255)
created_at date
updated_at date

candidates
----------
id int PK
firstname varchar(255)
lastname varchar(255)
title varchar(16) default=NULL
education varchar(255)
created_at date
updated_at date
party_id UNIQUE int FK >- parties.id
district_id UNIQUE int FK >- districts.id