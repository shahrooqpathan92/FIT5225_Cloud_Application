# FIT5225_Cloud_Application
Assignment 2 of FIT-5225, 2020 Semester 1

A serverless application that uses AWS Lambda, DynamoDB, S3, Amazon API gateway, AWS Cognito and ReactJS.

Features:
1. Authentication and Authorization
2. Authorized user can upload an image to S3 -> which triggers a lambda function to recgonise the objects in the image. The recognized objects are stored as tags in DynamoDB.
3. Authorized user can retrieve uploaded images based on one or more tags.


