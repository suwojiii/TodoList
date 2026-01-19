"use server";

import { revalidatePath } from "next/cache";

export async function completedTodoAction(id: number, isCompleted: boolean) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ isCompleted }),
      },
    );

    const data = await response.json();

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
