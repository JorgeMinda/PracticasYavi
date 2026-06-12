import axios from "axios";

// Clave pública (anon) correcta y verificada
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
    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`, // Verifica que haya un espacio después de Bearer
  },
});