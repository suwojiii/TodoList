"use server";

import { revalidatePath } from "next/cache";

export async function deleteTodoAction(id: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return {
        status: false,
        error: text
          ? `삭제에 실패했습니다: ${text}`
          : `삭제에 실패했습니다: ${response.statusText}`,
      };
    }

    revalidatePath("/");
    return { status: true };
  } catch (err) {
    return {
      status: false,
      error: `Todo 삭제에 실패했습니다: ${err}`,
    };
  }
}
