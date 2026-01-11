import api from "./api";

// Login endpoint
export const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
};

// Signup endpoint
export const signup = async (name: string, email: string, password: string, role: string) => {
    const { data } = await api.post("/auth/signup", { name, email, password, role });
    return data;
};

// Logout helper
export const logout = () => {
    localStorage.removeItem("userInfo");
};

// Get all patients
export const fetchAllPatients = async () => {
    const { data } = await api.get("/auth/patients");
    return data;
};
