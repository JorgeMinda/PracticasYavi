// 1. Cambiamos el import para usar apiSupabase
import { apiSupabase } from "./api";

// ==========================================
// EXPECTED ACHIEVEMENTS
// ==========================================
export const getExpectedAchievements = async () => {
  const { data } = await apiSupabase.get("/expected_achievements"); // Nota el guion bajo "_" como está en tu SQL
  return data;
};

export const getExpectedAchievementById = async (id: number) => {
  const { data } = await apiSupabase.get(`/expected_achievements?id=eq.${id}`);
  return data[0] || null; // Supabase devuelve un arreglo, tomamos el primer elemento
};

export const createExpectedAchievement = async (body: any) => {
  const { data } = await apiSupabase.post("/expected_achievements", body);
  return data;
};

export const updateExpectedAchievement = async (id: number, body: any) => {
  const { data } = await apiSupabase.put(`/expected_achievements?id=eq.${id}`, body);
  return data;
};

export const deleteExpectedAchievement = async (id: number) => {
  const { data } = await apiSupabase.delete(`/expected_achievements?id=eq.${id}`);
  return data;
};

// ==========================================
// USERS
// ==========================================
export const getUsers = async () => {
  const { data } = await apiSupabase.get("/users");
  return data;
};

export const getUserById = async (id: number) => {
  const { data } = await apiSupabase.get(`/users?id=eq.${id}`);
  return data[0] || null;
};

export const createUser = async (body: any) => {
  const { data } = await apiSupabase.post("/users", body);
  return data;
};

export const updateUser = async (id: number, body: any) => {
  const { data } = await apiSupabase.put(`/users?id=eq.${id}`, body);
  return data;
};

export const deleteUser = async (id: number) => {
  const { data } = await apiSupabase.delete(`/users?id=eq.${id}`);
  return data;
};

// ==========================================
// CAREERS
// ==========================================
export const getCareers = async () => {
  const { data } = await apiSupabase.get("/careers");
  return data;
};

export const getCareerById = async (id: number) => {
  const { data } = await apiSupabase.get(`/careers?id=eq.${id}`);
  return data[0] || null;
};

export const createCareer = async (body: any) => {
  const { data } = await apiSupabase.post("/careers", body);
  return data;
};

export const updateCareer = async (id: number, body: any) => {
  const { data } = await apiSupabase.put(`/careers?id=eq.${id}`, body);
  return data;
};

export const deleteCareer = async (id: number) => {
  const { data } = await apiSupabase.delete(`/careers?id=eq.${id}`);
  return data;
};

// ==========================================
// COMPANIES
// ==========================================
export const getCompanies = async () => {
  const { data } = await apiSupabase.get("/companies");
  return data;
};

export const getCompanyById = async (id: number) => {
  const { data } = await apiSupabase.get(`/companies?id=eq.${id}`);
  return data[0] || null;
};

export const createCompany = async (body: any) => {
  const { data } = await apiSupabase.post("/companies", body);
  return data;
};

export const updateCompany = async (id: number, body: any) => {
  const { data } = await apiSupabase.put(`/companies?id=eq.${id}`, body);
  return data;
};

export const deleteCompany = async (id: number) => {
  const { data } = await apiSupabase.delete(`/companies?id=eq.${id}`);
  return data;
};

// ==========================================
// LEARNING RESULTS
// ==========================================
export const getLearningResults = async () => {
  const { data } = await apiSupabase.get("/learning_results");
  return data;
};

export const getLearningResultById = async (id: number) => {
  const { data } = await apiSupabase.get(`/learning_results?id=eq.${id}`);
  return data[0] || null;
};

export const createLearningResult = async (body: any) => {
  const { data } = await apiSupabase.post("/learning_results", body);
  return data;
};

export const updateLearningResult = async (id: number, body: any) => {
  const { data } = await apiSupabase.put(`/learning_results?id=eq.${id}`, body);
  return data;
};

export const deleteLearningResult = async (id: number) => {
  const { data } = await apiSupabase.delete(`/learning_results?id=eq.${id}`);
  return data;
};

// ==========================================
// WEEKS
// ==========================================
export const getWeeks = async () => {
  const { data } = await apiSupabase.get("/weeks");
  return data;
};

export const getWeekById = async (id: number) => {
  const { data } = await apiSupabase.get(`/weeks?id=eq.${id}`);
  return data[0] || null;
};

export const createWeek = async (body: any) => {
  const { data } = await apiSupabase.post("/weeks", body);
  return data;
};

export const updateWeek = async (id: number, body: any) => {
  const { data } = await apiSupabase.put(`/weeks?id=eq.${id}`, body);
  return data;
};

export const deleteWeek = async (id: number) => {
  const { data } = await apiSupabase.delete(`/weeks?id=eq.${id}`);
  return data;
};

// ==========================================
// ROTATION PLANS
// ==========================================
export const getRotationPlans = async () => {
  const { data } = await apiSupabase.get("/rotation_plans");
  return data;
};

export const getRotationPlanById = async (id: number) => {
  const { data } = await apiSupabase.get(`/rotation_plans?id=eq.${id}`);
  return data[0] || null;
};

export const createRotationPlan = async (body: any) => {
  const { data } = await apiSupabase.post("/rotation_plans", body);
  return data;
};

export const updateRotationPlan = async (id: number, body: any) => {
  const { data } = await apiSupabase.put(`/rotation_plans?id=eq.${id}`, body);
  return data;
};

export const deleteRotationPlan = async (id: number) => {
  const { data } = await apiSupabase.delete(`/rotation_plans?id=eq.${id}`);
  return data;
};

// ==========================================
// TRAINING PLANS
// ==========================================
export const getTrainingPlans = async () => {
  const { data } = await apiSupabase.get("/training_plans");
  return data;
};

export const getTrainingPlanById = async (id: number) => {
  const { data } = await apiSupabase.get(`/training_plans?id=eq.${id}`);
  return data[0] || null;
};

export const createTrainingPlan = async (body: any) => {
  const { data } = await apiSupabase.post("/training_plans", body);
  return data;
};

export const updateTrainingPlan = async (id: number, body: any) => {
  const { data } = await apiSupabase.put(`/training_plans?id=eq.${id}`, body);
  return data;
};

export const deleteTrainingPlan = async (id: number) => {
  const { data } = await apiSupabase.delete(`/training_plans?id=eq.${id}`);
  return data;
};