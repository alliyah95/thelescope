import { ZodType, z as zod } from "zod";
import { ClinicMemberRegistrationData } from "../../types";

export const clinicMemberSchema: ZodType<ClinicMemberRegistrationData> =
    zod.object({
        name: zod.string().min(1, {
            message: "Name cannot be empty",
        }),
        email: zod.string().min(1, {
            message: "Email address required",
        }),
        password: zod.string().min(1, { message: "Password required" }),
        isAdmin: zod.string(),
    });
