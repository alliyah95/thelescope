export const deleteUserInfo = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("clinicId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("permissions");
};
