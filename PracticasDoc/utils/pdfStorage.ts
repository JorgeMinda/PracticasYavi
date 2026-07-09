import * as Print from "expo-print";

import { supabase }
  from "../services/supabase";

import {
  createGeneratedDocument,
} from "../services/generatedDocumentService";

export const imprimirPlanPDF =
  async (
    htmlContent: string,
    internshipId: number,
    userId: number
  ) => {

    try {

      const pdf =
        await Print.printToFileAsync({
          html: htmlContent,
        });

      const fileName =
        `plan_${Date.now()}.pdf`;

      const response =
        await fetch(pdf.uri);

      const blob =
        await response.blob();

      const { data, error } =
        await supabase.storage
          .from("documents")
          .upload(
            fileName,
            blob,
            {
              contentType:
                "application/pdf",
            }
          );

      if (error) {
        throw error;
      }

      const {
        data: publicUrl,
      } = supabase.storage
        .from("documents")
        .getPublicUrl(
          data.path
        );

      await createGeneratedDocument({
        internship_id:
          internshipId,

        type:
          "PLAN_ROTACION",

        generated_by:
          userId,

        file_path:
          publicUrl.publicUrl,

        generated_at:
          new Date()
            .toISOString(),
      });

      return publicUrl.publicUrl;

    } catch (error) {

      console.error(error);

      throw error;

    }
  };