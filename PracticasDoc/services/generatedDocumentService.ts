import { apiSupabase } from "./dataService";

export const createGeneratedDocument = async (
  body: any
) => {
  const { data } = await apiSupabase.post(
    "/generated_documents",
    body,
    {
      headers: {
        Prefer: "return=representation",
      },
    }
  );

  return data;
};

export const getGeneratedDocuments = async () => {
  const { data } = await apiSupabase.get(
    "/generated_documents?select=*"
  );

  return data;
};