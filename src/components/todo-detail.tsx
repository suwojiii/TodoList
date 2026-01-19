"use client";

import { completedTodoAction } from "@/actions/completed-todo.action";
import style from "./todo-detail.module.css";
import { TodoItemData } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { editTodoAction } from "@/actions/edit-todo.action";
import { deleteTodoAction } from "@/actions/delete-todo.action";
import { upload } from "@vercel/blob/client";

export function TodoDetail({
  id,
  name,
  memo,
  imageUrl,
  isCompleted,
}: TodoItemData) {
  const router = useRouter();

  const [draftMemo, setDraftMemo] = useState(memo ?? "");
  const [draftImageUrl, setDraftImageUrl] = useState(imageUrl ?? "");

  const todo: TodoItemData = {
    id,
    name,
    memo: draftMemo,
    imageUrl: draftImageUrl,
    isCompleted,
  };

  const handleToggle = async () => {
    await completedTodoAction(Number(id), !isCompleted);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const type = file.type?.toLowerCase();

    const okType =
      !type ||
      ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(type);

    const ext = file.name.split(".").pop()?.toLowerCase();
    const okExt = ["jpg", "jpeg", "png", "webp"].includes(ext ?? "");
    console.log(file);
    if (!okType || !okExt) {
      alert("JPEG/PNG/WEBP 이미지만 가능합니다.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("이미지 파일 크기는 5MB 이하만 가능합니다.");
      e.target.value = "";
      return;
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
      alert("이미지 파일 이름은 영문만 사용할 수 있습니다.");
      e.target.value = "";
      return;
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "");
    const key = `todos/${Date.now()}-${safeName}`;

    try {
      const { url } = await upload(key, file, {
        handleUploadUrl: "/upload",
        access: "public",
      });

      setDraftImageUrl(url);
    } catch (err) {
      setDraftImageUrl("");
      alert("이미지 업로드에 실패했습니다.");
      console.log(err);
    }
  };

  const editMemo = async () => {
    const response = await editTodoAction(todo);

    if (!response?.status) {
      alert(response?.error);
      return;
    }

    alert("수정이 완료되었습니다.");
    router.refresh();
  };

  const deleteTodo = async () => {
    const ok = confirm("해당 TODO를 삭제하시겠습니까?");
    if (!ok) return;

    const response = await deleteTodoAction(id);
    if (!response?.status) {
      alert(response?.error);
      return;
    }

    alert("해당 TODO가 삭제되었습니다.");
    router.replace("/");
  };

  return (
    <div className={`${style.container} ${isCompleted ? style.completed : ""}`}>
      <section className={style.todoCheck}>
        <button onClick={handleToggle} />
        <p>{name}</p>
      </section>

      <section className={style.todoContainer}>
        <div className={style.content}>
          <div
            className={`${style.image} ${draftImageUrl ? style.hasImage : ""}`}
          >
            {draftImageUrl && (
              <img src={draftImageUrl} alt="" className={style.preview} />
            )}
            <input
              id={`image-input-${id}`}
              type="file"
              accept="image/*"
              className={style.fileInput}
              onChange={handleImageChange}
            />
            <label
              htmlFor={`image-input-${id}`}
              className={style.imageActionBtn}
            />
          </div>

          <div className={style.memo}>
            Memo
            <textarea
              value={draftMemo}
              onChange={(e) => setDraftMemo(e.target.value)}
              placeholder="메모를 입력하세요"
            />
          </div>
        </div>

        <div className={style.btns}>
          <button className={style.editBtn} onClick={editMemo}>
            <img src={"/icons/check.png"} />
            수정 완료
          </button>
          <button className={style.deleteBtn} onClick={deleteTodo}>
            <img src={"/icons/x.png"} />
            삭제하기
          </button>
        </div>
      </section>
    </div>
  );
}
