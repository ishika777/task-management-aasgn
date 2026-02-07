

# Task Routes


## Get All Tasks
GET /tasks  

Fetches all tasks for the authenticated user.

---

## Create Task
POST /tasks  

Creates a new task.

Request Body:
{
  "title": "string",
  "description": "string",
  "status": "string"
}

---

## Update Task
PUT /tasks/:id  

Updates an existing task.

Request Body:
{
  "title": "string",
  "description": "string",
}

---

## Update Task Status
PATCH /tasks/:id/status  

Updates only the status of a task.

Request Body:
{
  "status": "string"
}

---

## Delete Task
DELETE /tasks/:id  

Deletes a task.




# Authentication Routes


## Register User
POST /auth/register  

Creates a new user account.

Request Body:
{
  "username": "string",
  "email": "string",
  "password": "string"
}

---

## Login User
POST /auth/login  

Authenticates a user.

Request Body:
{
  "email": "string",
  "password": "string"
}

---

## Logout User
POST /auth/logout  

Logs out the authenticated user.
