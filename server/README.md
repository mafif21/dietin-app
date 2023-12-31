# History Feature RESTful API for DietIn Apps

## Description

This API provides a history feature for applications that require recording and retrieving historical data. Built using the Express.js framework, this API is designed to be easily integrated with various applications.

## Feature

- **Get All Histories**: Get all history data from user login
- **Get Spesific History**: Get spesific history data from user click
- **Create History**: Create history after scan the food
- **Delete Spesific History**: Delete one history
- **Auth Middleware JWT**: Get user login by firebase JWT ( tokenid )

## Tools

- Node.js
- Express.js
- Firestore
- Cloud Run
- Docker

## How to Install

1. git clone github repo
2. run `npm install` to install all depedencies
3. Configure file `.env` to set a port for server
4. Set your database in firestore
5. Get your service account key.json to access all resource in GCP
6. Run `npm run start` to start a server

## Cloud Computing Members

| Name                       | Bangkit ID  | Github                             |
| -------------------------- | ----------- | ---------------------------------- |
| Muhammad Nurul Afif Maliki | C012BSY3605 | [Afif](https://github.com/mafif21) |
| Shoraahatan Salsabila      | C676BSX3192 | [Shora](https://github.com/shor12) |
