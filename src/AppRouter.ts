import express from 'express';

export class AppRouter{
  private static instance: express.Router;

  static getInstance(): express.Router{
    //check if there exist already instance of the class
    if(!AppRouter.instance){
      AppRouter.instance = express.Router()
    }
    return AppRouter.instance;
  }
}

//SINGLETON ^