import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...args: string[]) {
  return function (target: any, propKey: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(
      MetadataKeys.validator,
      args,
      target,
      propKey
    )
  }
}