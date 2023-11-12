import { ZodType, z as zod } from "zod";
import { Clinic } from "../../types";

export const clinicRegistrationSchema: ZodType<Clinic> = zod.object({
    name: zod.string().min(1, {
        message: "Clinic name cannot be empty",
    }),
});
