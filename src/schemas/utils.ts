import { z } from 'zod';

// This function takes in a type, and returns a type to Zod
export const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };
