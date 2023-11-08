import { ZodType, z as zod } from "zod";
import { LoginFormData } from "../../types";

export const loginSchema: ZodType<LoginFormData> = zod.object({
    username: zod.string().min(1, {
        message: "Please enter your username",
    }),
    password: zod.string().min(1, { message: "Please enter your password" }),
});
