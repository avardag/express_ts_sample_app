import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

export function use(MW: RequestHandler) {
  //decorator
  return function (target: any, propKey: string, desc: PropertyDescriptor) {
    // check if any MW exist on that route handler
    const middlewares = Reflect.getMetadata(
      MetadataKeys.middleware,
      target,
      propKey
    ) || [];

    // add MW passest to args
    middlewares.push(MW)

    Reflect.defineMetadata(MetadataKeys.middleware, middlewares, target, propKey)
  }
}