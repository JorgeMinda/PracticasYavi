import axios from "axios";

// ==========================================
// CONFIGURACIÓN DE INSTANCIAS (AXIOS)
// ==========================================

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bGpvYWxhZHB5dGZudXFyeXVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNDEyOTgsImV4cCI6MjA5NjYxNzI5OH0.Li0hnWB1qU3u_5G6Yy6VOv2nHJnrMJ6bqrcjeEYUJG0";

export const apiLocal = axios.create({
    baseURL: "http://192.168.3.19:3000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiSupabase = axios.create({
    baseURL: "https://ftljoaladpytfnuqryuq.supabase.co/rest/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
});

// ==========================================
// EXISTENTES (sin cambios)
// ==========================================
// ... (todas tus funciones anteriores se mantienen igual)


// ==========================================
// ROTATION PLANS (AGREGADO)
// ==========================================
export const getRotationPlans = async () => {
    const { data } = await apiSupabase.get("/rotation_plans");
    return data;
};

// Cambiado para usar de forma segura la instancia "apiSupabase" con sus headers por defecto
export const createRotationPlan = async (payload: any) => {
    const response = await apiSupabase.post("/rotation_plans", payload, {
        headers: {
            "Prefer": "return=representation" 
        }
    });
    return response.data;
};


export const getRotationPlanById = async (id: number) => {
    const { data } = await apiSupabase.get(`/rotation_plans?id=eq.${id}`);
    return data[0] || null;
};

export const updateRotationPlan = async (id: number, body: any) => {
    const { data } = await apiSupabase.put(`/rotation_plans?id=eq.${id}`, body);
    return data;
};

export const deleteRotationPlan = async (id: number) => {
    const { data } = await apiSupabase.delete(`/rotation_plans?id=eq.${id}`);
    return data;
};
export const getLearningResults = async () => {
    const { data } = await apiSupabase.get("/learning_results?select=*");
    return data;
};