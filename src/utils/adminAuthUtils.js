import adminAuthApi from "../api/adminAuthApi";

const adminAuthUtils = {
  isAutenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const res = await adminAuthApi.verifyToken();
      return res.adminuser;
    } catch {
      return false;
    }
  },
};

export default adminAuthUtils;
