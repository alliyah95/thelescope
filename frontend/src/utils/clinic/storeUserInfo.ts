import { ClinicMember } from "../../types";

export const storeUserInfo = (user: ClinicMember) => {
    localStorage.setItem("userId", user.userId);
    localStorage.setItem("name", user.name);
    localStorage.setItem("clinicId", `${user.clinicId}`);
    localStorage.setItem("clinicName", `${user.clinicName}`);
    localStorage.setItem("isAdmin", user.isAdmin.toString());
    localStorage.setItem("permissions", `${user.permissions}`);
};
