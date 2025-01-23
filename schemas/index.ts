import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Please enter a valid password" }),
});

export const SignUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  name: z.string().min(1, { message: "Please enter a valid name" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const ChatSchema = z.object({
  prompt: z.string().min(1, { message: "Please enter a valid prompt" }),
  // chatId: z.string().min(1, { message: "Please enter a valid chat ID" }),
  model: z.string().min(1, { message: "Please enter a valid model" }),
  file: (typeof window === "undefined"
    ? z.any()
    : z.instanceof(FileList)
  ).refine((files) => files.length > 0, "A file is required."),
  // session: z.object({
  //   user: z.object({
  //     email: z.string().email({ message: "Please enter a valid email" }),
  //     name: z.string().min(1, { message: "Please enter a valid name" }),
  //     image: z.string().optional(),
  //   }),
  // }),
});

export type ChatSchemaType = z.infer<typeof ChatSchema>;
