import { ZodType, z as zod } from "zod";
import { PatientRecordFormData } from "../../types";

export const patientRecordSchema: ZodType<PatientRecordFormData> = zod.object({
    reason: zod.string().min(1, { message: "Reason cannot be empty" }),
    findings: zod.string().min(1, { message: "Findings cannot be empty" }),
    treatment: zod.string().min(1, { message: "Treatment cannot be empty" }),
});
