import 'reflect-metadata';

//decorator to save path string into metadata
export function get(path:string) {
  return function (target: any, propKey: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata("path", path, target, propKey)
  }
}