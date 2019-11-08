import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

interface ReqHandlerDescriptor extends PropertyDescriptor{
  value?: RequestHandler //descriptor has to be of type RequestHandler from express
  //can not be some other mehtod or function
}
//decorator to save path string into metadata
// and HTTP method to metadata
/*
export function get(path:string) {
  return function (target: any, propKey: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata("path", path, target, propKey)
    Reflect.defineMetadata("httpMethod", 'get', target, propKey)
  }
}
*/

function routeBinder(httpMethod: string) {
  // /return function custom to http methods
  return function (path:string) {
    // decorator
   return function (target: any, propKey: string, desc: ReqHandlerDescriptor) {
    //save path string to metadata
    Reflect.defineMetadata(MetadataKeys.path, path, target, propKey)
    //save http method string to metadata
    Reflect.defineMetadata(MetadataKeys.httpMethod , httpMethod, target, propKey)
   }
 }
}

export const get = routeBinder(Methods.get)
export const put = routeBinder(Methods.put)
export const post = routeBinder(Methods.post)
export const del = routeBinder(Methods.del)
export const patch = routeBinder(Methods.patch)