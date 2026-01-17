"use server";

import { revalidatePath } from "next/cache";

export async function createTodoAction(_: any, formData: FormData) {
  const name = formData.get("name")?.toString().trim();

  if (!name) {
    return { status: false, error: "할 일을 입력해주세요." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name }),
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidatePath("/");
  } catch (err) {
    return {
      status: false,
      error: `Todo 저장에 실패했습니다, : ${err}`,
    };
  }
}
