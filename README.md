# Table of contents
- [Installation Instructions](#installing-instructions)
- [Running Applications](#running-applications)

<a name="installing-instructions"/>

## Installation Instructions

- Copy this repository using HTTPS`https://github.com/projectKel1/be-node.git`

- Change directory `cd ./be-node/`

- Install dependencies `npm install`

- Create file `.env` on root project directory

- Copy file contents from `.env example` to `.env`

- Run application

<a name="running-applications"/>

## Running Applications

- `npm run dev` Running application in development
- `npm run build` Build application
- `npm run start` Running application

To run your application in production, we suggest you to using `pm2` with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks. For more information, you can visit [pm2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)