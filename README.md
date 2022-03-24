# eLection API

This is the API of a dummy eLection website

## Database schema

users
----------
id bigint PK
districtId int FK >- districts.id
token UNIQUE varchar(255)
password varchar(255)
email UNIQUE varchar(255)
birthYear int
lastLogin date
createdAt date

votes
----------
userId bigint FK >- users.id
partyId int FK >- parties.id
candidateId int FK >- candidates.id
createdAt date


districts
----------
id int PK
name varchar(255)

parties
----------
id int PK
name varchar(255)
website varchar(255)
createdAt date
updatedAt date

candidates
----------
id int PK
partyId int FK >- parties.id
districtId int FK >- districts.id
firstname varchar(255)
lastname varchar(255)
title varchar(255) default=NULL
education varchar(255)
createdAt date
updatedAt date