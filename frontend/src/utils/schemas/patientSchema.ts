import { ZodType, z as zod } from "zod";
import { PatientFormData } from "../../types";

export const patientSchema: ZodType<PatientFormData> = zod.object({
    firstName: zod.string().min(1, { message: "First name cannot be empty" }),
    middleName: zod.string(),
    lastName: zod.string().min(1, { message: "Last name cannot be empty" }),
    age: zod.number().min(1),
    gender: zod.string().min(1, { message: "Please select patient's gender" }),
    contactNumber: zod
        .string()
        .min(1, { message: "Contact number cannot be empty" }),
    emailAddress: zod.string().email(),
    address: zod.string().min(1, { message: "Please enter patient's address" }),
});
