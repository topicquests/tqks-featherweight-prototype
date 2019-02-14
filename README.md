# tqks-featherweight-prototype
Quasar Feathers Structured Conversation

A Simple experiment in Structured Conversation.

## Background

Given that this platform relies on both Feathers.js and Quasar-Framework, it's useful to install both as follows<br/>
* npm install -g @feathersjs/cli
* npm install -g quasar-cli

## Preparation

Install Node 10 on a *nix environment. We haven't tested this on Windows.

Assuming your name is Barney :/

### Clone config/dev.json

```cp /api/config/dev.json /api/config/barney.json```

#### Emails

In order to send emails, you need an SMTP server. 
You can use your personal Gmail too.

We prefer that you get a free account from: https://mailtrap.io/register/signup

Once you get your API keys, populate them in config/barney.json

#### Database

You can use your own MongoDB instance that you can pull using Docker.

We prefer that you get a free database from: https://mailtrap.io/register/signup

Update `mongodb` and `emailconfig` in `/api/config/barney.json`

### Make yourself admin

In `config/overrides.json`, change the adminEmail to your main test account email.


### Building
Two terminals. 
* Root: npm install
* /api: npm install
 

### Running 
* Root: npm run dev
* /api: npm run dev

### Production Mode
```
npm install -g pm2;

quasar build;
pm2 start ecosystem.config.js;
```

### Docker
```
docker-compose up
```

### Environmental Overrides
Pass the following env vars to override initial behavior
```
IS_PRIVATE_PORTAL=false,
REQUIRES_INVITE=false,
ADMIN_EMAIL="sue@sixpack.com"
```

### Other than Localhost
* /config/index.js proxyTable target must reflect the domain, not localhost
* /src/api.js socket must reflect the domain, not localhost

Made from [quasar-feathers-tutorial](https://github.com/claustres/quasar-feathers-tutorial)
