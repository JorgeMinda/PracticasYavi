import axios from "axios";

// 1. Clave pública de tu Supabase (la copias de tu panel de control)
const SUPABASE_ANON_KEY = "tu_clave_anon_super_larga_que_empieza_con_eyJ...";

// 2. Conexión a tu Servidor Backend Propio (Local)
export const apiLocal = axios.create({
  baseURL: "http://192.168.3.19:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 3. Conexión Directa a la API de Supabase (Nube)
export const apiSupabase = axios.create({
  baseURL: "https://ftljoaladpytfnuqryuq.supabase.co/rest/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
  },
});