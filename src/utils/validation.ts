import { ZodType, z } from 'zod';

export const validate = <
  Schema extends ZodType<any, any, any>,
  FormData = z.infer<Schema>,
>(
  data: FormData,
  schema: Schema
) => {
  const result = schema.safeParse(data) as z.SafeParseReturnType<
    FormData,
    FormData
  >;
  return result;
};
