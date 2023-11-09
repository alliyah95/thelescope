import { ZodType, z as zod } from "zod";
import { LoginFormData } from "../../types";

export const loginSchema: ZodType<LoginFormData> = zod.object({
    email: zod.string().min(1, {
        message: "Please enter your email address",
    }),
    password: zod.string().min(1, { message: "Please enter your password" }),
});
