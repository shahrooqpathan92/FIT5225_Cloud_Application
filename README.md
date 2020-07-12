# FIT5225_Cloud_Application
Assignment 2 of FIT-5225, 2020 Semester 1

A serverless application that uses AWS Lambda, DynamoDB, S3, Amazon API gateway, AWS Cognito and ReactJS.

## Features
1. Authentication and Authorization
2. Authorized user can upload an image to S3 -> which triggers a lambda function to recgonise the objects in the image. The recognized objects are stored as tags in DynamoDB.
3. Authorized user can retrieve uploaded images based on one or more tags.

## System Architecture

![image](https://user-images.githubusercontent.com/49880531/87242566-34898e00-c471-11ea-9f2d-d982d9470c08.png)

## Screenshots

### Image Retrieval

![image](https://user-images.githubusercontent.com/49880531/87242597-892d0900-c471-11ea-9d8f-26d279f54814.png)

### Image Upload

![image](https://user-images.githubusercontent.com/49880531/87242607-a06bf680-c471-11ea-9bc6-4736716dce2b.png)

### Registration

![image](https://user-images.githubusercontent.com/49880531/87242615-be395b80-c471-11ea-90cd-f55b92212ea7.png)

### Verification Email

![image](https://user-images.githubusercontent.com/49880531/87242625-d4dfb280-c471-11ea-85c5-7e9e0cc46550.png)

### Login

![image](https://user-images.githubusercontent.com/49880531/87242637-e6c15580-c471-11ea-96ac-1b41b19200cd.png)
