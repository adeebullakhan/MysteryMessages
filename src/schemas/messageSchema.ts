import {z} from 'zod';

export const messageSchema = z.object({
  content:z.string().min(10, {message: "Message must be at least 1 character long"})
   .max(300, {message: "Message must be less than 300 characters long"})
});