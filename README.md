# CRUD Operations on Policies

## Description
This project provides a web interface for performing CRUD (Create, Read, Update, Delete) operations on insurance policies. It allows users to create new policies, update existing ones, delete policies, and fetch details of a specific policy by its ID.

## Features
- Create a new policy
- Update an existing policy
- Delete a policy
- Fetch policy details by ID

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js (Backend)
- Express.js (Backend Framework)
- MySQL (Database)

## Usage
1. Start the server:
    cd Hackathon-CRUD-4 
    node app.js
    
2. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints
- `GET /api/policies`: Fetch all policies
- `GET /api/policies/:id`: Fetch a policy by ID
- `POST /api/policies`: Create a new policy
- `PUT /api/policies/:id`: Update an existing policy
- `DELETE /api/policies/:id`: Delete a policy