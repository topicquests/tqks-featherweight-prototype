#!/usr/bin/env bash

echo "Welcome to Featherweight! I am Plume, your friends project helper."
echo "I am here to help you get your dev environment set up."
echo "What is your first name?"
read FIRST_NAME

echo ""

echo "Hello ${FIRST_NAME}"
echo "Please go to mailtrap.io and sign up for an account"
echo "Once your account is created, go into your Demo Inbox and find the lines marked 'username' and 'password'"
echo "These username and passwords should be like gibberish. (e.g. af9a8766d909b7)"
echo "I'll wait. :)"

echo ""

echo "Mailtrap Username:"
read MAILTRAP_USERNAME

echo ""

echo "Mailtrap Password:"
read MAILTRAP_PASSWORD

FIRST_NAME=$(echo $FIRST_NAME | tr '[:upper:]' '[:lower:]')

echo ""

echo "Finally, what is your e-mail address?"
read EMAIL_ADDRESS

echo ""

DEV_JSON="{
  \"host\": \"localhost\",
  \"port\": 8081,
  \"public\": \"../public/\",
  \"paginate\": {
    \"default\": 10,
    \"max\": 50
  },
  \"mongodb\": \"mongodb://localhost:27017/featherweight\",
  \"mongodb_bak\": \"\",
  \"emailconfig\": {
        \"SMTP_HOST\": \"smtp.mailtrap.io\",
        \"SMTP_PORT\": 2525,
        \"SMTP_USER\": \"${MAILTRAP_USERNAME}\",
        \"SMTP_PASS\": \"${MAILTRAP_PASSWORD}\"
  },
  \"baseURL\": \"http://localhost:8080\",
  \"authentication\": {
    \"secret\": \"0052fac3c747cf413041c5ace80140993038e2eee8adfc46344b3a248e2e4f69a00e977b0b81605181d0526431319a1821769ca87ca8948b05948efcdcafa03afc1d51ad05b06817cad64e7e817428c88dc868fea7fd4383b1eb2167a5dadf9507140d806b297397e23ab727f251edd37939e0b2250614d4899f2abaa339aeea85c336db153d7b1eea52053a8c4f187a189a13b22642507af03c9232587c154fd7905345e5317da4997e917ff4c4b769d0949e7700b7453bf776b057518559877239baded956528e55e5480501e351b71b0130e342a014d91498e04f967cb977cab3acd95d0272dc6ede9c9aba5e6d120e509e0ef7538e193648029da26e0719\",
    \"strategies\": [\"jwt\", \"local\"],
    \"path\": \"/authentication\",
    \"service\": \"users\",
    \"jwt\": {
      \"header\": {
        \"typ\": \"access\"
      },
      \"audience\": \"https://yourdomain.com\",
      \"subject\": \"anonymous\",
      \"issuer\": \"feathers\",
      \"algorithm\": \"HS256\",
      \"expiresIn\": \"1d\"
    },
    \"local\": {
      \"entity\": \"user\",
      \"usernameField\": \"email\",
      \"passwordField\": \"password\"
    }
  }
}
"

OVERRIDE_JSON="{\"isPrivatePortal\":\"1\",\"requiresInvite\":\"1\",\"adminEmail\":\"${EMAIL_ADDRESS}\"}"

echo "Creating files..."

echo $DEV_JSON > api/config/${FIRST_NAME}.json
echo "Created api/config/${FIRST_NAME}.json"

echo "api/config/${FIRST_NAME}.json" >> .gitignore
echo "Added api/config/${FIRST_NAME}.json to .gitignore"

echo $OVERRIDE_JSON > api/config/overrides.json
echo "Added your e-mail address to api/config/overrides.json"
echo "You are now an administrator :)"

echo ""
echo "Now go to https://docs.mongodb.com/manual/installation/#mongodb-community-edition and follow"
echo "your platform's instructions for installing MongoDB Community Edition"

echo "Would you like me to try and open the browser at this address? (y/n)"
read OPEN_BROWSER

if [ $(echo $OPEN_BROWSER | tr '[:upper:]' '[:lower:]') == 'y' ]; then
  git web--browse https://docs.mongodb.com/manual/installation/#mongodb-community-edition
fi

echo ""
echo "When MongoDB is installed, press enter and I can give further instructions"
read DUMMYA

echo ""
echo "Great! Now open a separate terminal and type: 'mongod'"
echo "Come back here when you're done and press enter"
read DUMMYB

echo "Now open two new terminals"
echo "In one terminal, navigate to $(pwd) and type 'npm install'"
echo "In another terminal, navigate to $(pwd)/api and type 'npm install'"
echo ""
echo "To run the backend, go to the '/api' directory and type 'NODE_ENV=${FIRST_NAME} npm run dev'"
echo "To run the frontend, type 'npm run dev' in the root of this project"

echo ""
echo "Have fun!"
















