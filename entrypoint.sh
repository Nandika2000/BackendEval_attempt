#!/bin/sh
sleep 20
npx sequelize-cli db:migrate
npm start