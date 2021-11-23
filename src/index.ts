import express from 'express';
import * as dotenv from 'dotenv';
import apiRouter from './Api-Router/routes.js';
import path from 'path';
import './Api-Router/routes';
dotenv.config({});
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection, Connection } from 'typeorm';
import cookieParser from 'cookie-parser';

createConnection().then((connect: Connection) => {
  const app = express();
  app.set('view engine', 'ejs');

  app.use(express.static(path.join(__dirname, 'views')));
  app.use(express.static('uploads'));
  app.use(cookieParser());

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(cors());
  app.use(express.json());

  const PORT = process.env.PORT || 3001;
  app.use(apiRouter);

  app.listen(PORT, () => {
    console.log(`server listen on port - ${PORT}`);
  });
});
