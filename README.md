# eLection API

This is the API of a dummy eLection website

## Database schema

users
----------
id int PK
token UNIQUE varchar(255)
password varchar(255)
email UNIQUE varchar(255)
birthYear int
lastLogin date
createdAt date
districtId int FK >- districts.id
voteId int FK - votes.id

votes
----------
id int PK
createdAt date
partyId int FK >- parties.id
candidateId int FK >- candidates.id


districts
----------
id int PK
name UNIQUE varchar(255)

parties
----------
id int PK
name UNIQUE varchar(255)
website varchar(255)
createdAt date
updatedAt date

candidates
----------
id int PK
firstname varchar(255)
lastname varchar(255)
title varchar(16) default=NULL
education varchar(255)
createdAt date
updatedAt date
partyId int FK >- parties.id
districtId int FK >- districts.id