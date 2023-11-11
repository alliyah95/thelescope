import { ZodType, z as zod } from "zod";
import { RegistrationFormData } from "../../types";

export const registrationSchema: ZodType<RegistrationFormData> = zod
    .object({
        adminName: zod
            .string()
            .min(5, {
                message: "Admin name must be at least 5 characters",
            })
            .max(140, {
                message: "Clinic name must not exceed 140 characters",
            }),
        adminEmail: zod.string().email(),
        adminPassword: zod
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .max(30, { message: "Password is too long" }),
        adminConfirmPassword: zod.string(),
    })
    .refine(
        (data: RegistrationFormData) =>
            data.adminPassword.length >= 8 &&
            data.adminPassword === data.adminConfirmPassword,
        {
            message: "Passwords do not match",
            path: ["adminConfirmPassword"],
        }
    );
