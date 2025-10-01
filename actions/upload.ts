"use server";

import { uploadToCloudinary } from "@/lib/cloudinary";

export async function uploadImage(
  formData: FormData
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image" };
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      return { success: false, error: "Image must be less than 2MB" };
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const imageUrl = await uploadToCloudinary(buffer, file.name);

    return { success: true, imageUrl };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
