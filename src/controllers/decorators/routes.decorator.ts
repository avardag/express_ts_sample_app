import 'reflect-metadata';

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
   return function (target: any, propKey: string, desc: PropertyDescriptor) {
    //save path string to metadata
    Reflect.defineMetadata("path", path, target, propKey)
    //save http method string to metadata
    Reflect.defineMetadata("httpMethod", httpMethod, target, propKey)
   }
 }
}

export const get = routeBinder('get')
export const put = routeBinder('put')
export const post = routeBinder('get')
export const del = routeBinder('delete')
export const patch = routeBinder('patch')