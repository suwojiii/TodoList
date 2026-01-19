import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  const json = await handleUpload({
    body,
    request: request,

    onBeforeGenerateToken: async () => {
      return {
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
        maximumSizeInBytes: 5 * 1024 * 1024,
        addRandomSuffix: true,
      };
    },
  });

  return NextResponse.json(json);
}