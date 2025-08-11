const express = require("express");
const morgan = require("morgan");

// controllers

// routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

const app = express();

// this middleware handles all incoming request
app.use(express.json());

// this is the middleware for making an HTTP request
app.use(morgan("dev"));

// auth side
app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/users", userRoutes);
app.use("/v1/api/conversation", conversationRoutes);

module.exports = app;

/* 
for apollo we are going to create the following
- User Route : (/v1/api/login),  (/v1/api/signup)
when they sign up{first name, last name, country, email, password}
when they want to log in = {email and password}
oauth with google
when the user first signs up he has to do a 2fa an email is sent to him  (/v1/api/2fa)
when the user wants to do a forgot password he first put in his email to verify email(/v1/api/verifyemail)
then the user receives a verification email that redirects him to the new password page (/v1/api/newpassword)

the sign up flow is this 
- user inputs details 
- then receive otp 
- then is redirected to the sign up page to login 
- then user logs in


- Message route:  (/v1/api/messages)
this route handles individual messages between the user and the bot

- Conversation routes  (/v1/api/conversations)
this route handles previous and present conversations which is stored in an array between the user and the bot
- in the message page there is a plus button that can be used for creating a new conversations
i am thinking of a route for a temporary conversation


- Settings Route  (/v1/api/settings)
user can change their name, password and email
upload a profile picture
- Logout route
(/v1/api/logout)

*/
