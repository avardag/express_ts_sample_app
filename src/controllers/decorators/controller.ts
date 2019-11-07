import 'reflect-metadata'

import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { use } from './use';


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
      
      if(path){
        //express router
        //combine routes and pass route handler
        //and pass MW funcs before route handler
        router[httpMethod](`${routePrefix}${path}`, ...middlewares, routeHandler)
      }
      }
    }
  }
