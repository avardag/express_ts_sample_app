import 'reflect-metadata'
import express from 'express';

export const router = express.Router();

// decorator to be applied on class
//iterates over metadata inside classes methods 
export function controller(routePrefix:string) {
  return function (target: Function) {
    for (const k in target.prototype) {
      //method of the class(routeHandler methods in our case)
      const routeHandler = target.prototype[k];
      //get metadata(if exists) attached to the methods
      const path = Reflect.getMetadata('path', target.prototype, k)

      if(path){
        //express router
        //combine routes and pass route handler
        router.get(`${routePrefix}${path}`, routeHandler)
      }
      }
    }
  }
