export const deleteUserInfo = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("clinicId");
    localStorage.removeItem("clinicName");
    localStorage.removeItem("clinicContract");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("permissions");
};
