import authApi from "./../api/authApi";
import { TOKEN_NAME } from "./constant";

export const isAuthenticated = async () => {
  const token = localStorage.getItem(TOKEN_NAME);
  if (!token) return false;
  try {
    await authApi.checkToken();
    return true;
  } catch (error) {
    return false;
  }
};

export const logout = (navigate) => {
  localStorage.removeItem(TOKEN_NAME);
  navigate("/login");
};
