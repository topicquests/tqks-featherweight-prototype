Here an example of the flow when confirming a new user’s email.

User creates an account

- Server sets a verifyToken on that user and sends the user an email with a link to the login form with that token in it
- User clicks the link in the email and is taken to the login page with the token in the url.
- Client code checks for that token and if available will send it to the server.
- Server will compare the token the client sent to the one stored in the user object, if they match it confirms that the user’s email is working.
  For resetting a password the process is similar

User requests to reset password

- Server sets a verifyReset token on the user and sends an email or text to the user with a link in it that contains the token.
- User clicks the link and is taken to the reset password page with the token in the url
- Client code reads that token and waits for the user to type in a new password.
- Client sends the new password and token to server.
- Server compares verifyReset token to the token the user provided and if they match will encrypt the password and save it to the user

## Example of config file

{
"host": "localhost",
"port": 8081,
"public": "../public/",
"paginate": {
"default": 10,
"max": 50
},
"emailconfig": {
"GMAIL": "gmail account",
"GMAIL_PASSWORD": "gmail password"
},
"mongodb": "mongodb://featherweight:UQg6qjGL9AmhRKF@ds237574.mlab.com:37574/featherweight",
"authentication": {
"secret": "0f8ebf6e754323f08852b38c6c4e6cb7442c179263f2887c0fa6a4485d312dbabac203fe103cafecef4d9d9f5b94f9da202d4b75d5ef7943afc17ad37cac8b7398905093ebb5610b9cb3c553cf558586e079d8e8be30f8a1c833e7757bd159965767ea65464188804f5808d90abe2a6bcd991ca612a6ec28694dd4316f827d9f2136bb9631004204908509f19b3c50d044536b4c322a42022f05c4dbe44d8e15129f7eb3585cc7b4fce7fa871b28ec6a9f081da914e8478676b86e48d4bc1ddcbb70672d267a310a8a3053f3151c64c453127360792e681b1cd06192084a25dd07ea3a24bcd3f4185ab52f66173da164a0023164055fbeac0d75f19a0242acba",
"strategies": ["jwt", "local"],
"path": "/authentication",
"service": "users",
"jwt": {
"header": {
"typ": "access"
},
"audience": "https://yourdomain.com",
"subject": "anonymous",
"issuer": "feathers",
"algorithm": "HS256",
"expiresIn": "1d"
},
"local": {
"entity": "user",
"usernameField": "email",
"passwordField": "password"
}
}
}
