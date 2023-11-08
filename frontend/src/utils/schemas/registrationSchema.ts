import { ZodType, z as zod } from "zod";
import { RegistrationFormData } from "../../types";

export const registrationSchema: ZodType<RegistrationFormData> = zod
    .object({
        clinicName: zod
            .string()
            .min(5, {
                message: "Clinic name must be at least 5 characters",
            })
            .max(140, {
                message: "Clinic name must not exceed 140 characters",
            }),
        adminUsername: zod
            .string()
            .min(5, {
                message: "Username must be at least 5 characters",
            })
            .max(24, { message: "Username is too long" }),
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
