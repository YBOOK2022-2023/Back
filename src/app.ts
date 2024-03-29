import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import express from 'express';
import {Server } from 'socket.io'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import router from './routes/router';
import cors from 'cors';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req: Request, res:  Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
