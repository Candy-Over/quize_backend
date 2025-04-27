## **This project uses Nodemailer for email verification. To make it work after cloning the repository:**

### 1. Enable 2-Step Verification on your Google account (if not already enabled).
### 2. Generate an App Password.
### 3. Put your email and app password in the `.env` file.
```
EMAIL_USER=xyz@example.com
EMAIL_PASS=ffwuztteldkdsaks
```
### 4. Nodemailer setup is done.
<br><br>
-
### Base URL: `http://localhost:8000/api`

# APIs for the followings:

## 1. User signup with email account verification

`POST /auth/register`
<br><br>

## 2. User login

`POST /auth/login`
<br><br>

## 3. View user profile

`GET /auth/profile`

```yml
Authorization: Bearer token
```
<br><br>
## 4. Edit user profile (with profile picture)

`PUT /auth/profile`

```yml
Authorization: Bearer token
Content-Type: multipart/form-data

Body( form data )

name: Abhijit Debnath,
profilePicture: picture

```
<br>

## 5. All Categories

`GET /categories`
<br><br>

## 6. List of questions for each category

```
GET /questions/question_id

Example: /questions/680d4a81e3e68d94c3821cd0
```
<br>

## 7. Add question in bulk against different category (using a CSV file import).

`POST /questions/bulk`

```yml
Body( form data )

file: CSV_File
```
### CSV Format:

| question | optionA | optionB |optionC | optionD | correctAnswer | categories |
|----------|---------|---------|--------|---------|---------------|------------|
<br><br>

## 8. User will be able to submit answers against respective questions.

`POST /answers`

```yml
Authorization: Bearer token

Body:
{
  "questionId": "680bd05357d3b03411acc473",
  "answer": "C"
}
```
<br>

## 9. Search By Question with answer submitted by user with submit time based on user's timezone.

`GET /answers/search?&questionText=w`

```yml
Authorization: Bearer Token
```
<br>

## 10. List of all categories along with total questions count of those category

`GET /categories`
