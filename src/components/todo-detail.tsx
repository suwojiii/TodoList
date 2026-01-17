"use client";

import { completedTodoAction } from "@/actions/completed-todo.action";
import style from "./todo-detail.module.css";
import { TodoItemData } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { editTodoAction } from "@/actions/edit-todo.action";
import { deleteTodoAction } from "@/actions/delete-todo.action";

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
    // imageUrl: "/imgs/mockImg.jpeg",
    isCompleted,
  };

  const handleToggle = async () => {
    await completedTodoAction(Number(id), !isCompleted);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("....");
    const file = e.target.files?.[0];
    console.log("----", file);
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setDraftImageUrl(previewUrl);
  };

  const editMemo = async () => {
    const res = await editTodoAction(todo);

    if (!res?.status) {
      alert(res?.error);
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
