// 2. all files

import {z} from 'zod';

export const acceptMessageSchema = z.object({
   acceptMessages: z.boolean(),
   
});