import { z } from "zod";

export const registerFormSchema = z
  .object({
    email: z
      .string({
        required_error:
          "You must fill in your email address to complete registration.",
      })
      .email({
        message: "Please provide a valid email address.",
      }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    password: z
      .string({
        invalid_type_error: "Your password must contain at least 8 characters.",
        required_error: "You must fill in this field.",
      })
      .min(8),
    confirmPassword: z.string({
      required_error: "You must fill in this field.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export type RegisterFormFields = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error:
        "You must fill in your email address to complete registration.",
    })
    .email({
      message: "Please provide a valid email address.",
    }),
  password: z.string({
    required_error: "You must fill in this field.",
  }),
});

export type LoginFormFields = z.infer<typeof loginFormSchema>;
