import 'reflect-metadata'
import {Request, Response, RequestHandler, NextFunction} from 'express'
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { use } from './use';

// MW func to check req.body values
function bodyValidator(keys:string[]): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction){
    if(!req.body){
      res.status(422).send("Invalid request");
      return
    }
    //loop over keys array(argument to MW func) and check if they exist
    for (const key of keys) {
      if(!req.body[key]){
        res.status(422).send(`You need to provide ${key}`);
        return;
      }
    }
    next()
  }
}

// decorator to be applied on class
//iterates over metadata inside classes methods 
export function controller(routePrefix:string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (const k in target.prototype) {
      //method of the class(routeHandler methods in our case)
      const routeHandler = target.prototype[k];
      //get metadata(if exists) attached to the methods
      const path = Reflect.getMetadata(
        MetadataKeys.path, 
        target.prototype, 
        k
      )
      //get http method metadata attached to the methods
      const httpMethod: Methods = Reflect.getMetadata(
        MetadataKeys.httpMethod,
        target.prototype, 
        k
      )

      const middlewares = Reflect.getMetadata(
        MetadataKeys.middleware, 
        target.prototype,
        k
      ) || [];
      //array of required boy properties(email, password, conffirmPassword etc)
      const requiredBodyProps = Reflect.getMetadata(
        MetadataKeys.validator, 
        target.prototype,
        k
      ) || [];
      const validator = bodyValidator(requiredBodyProps);
      
      if(path){
        //express router
        //combine routes and pass route handler
        //and pass MW funcs before route handler
        router[httpMethod](
          `${routePrefix}${path}`, 
          ...middlewares,
          validator, 
          routeHandler
        )
      }
      }
    }
  }
