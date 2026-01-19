"use client"

import style from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={style.container}>
      <div className={style.box}>
        <h1 className={style.code}>404</h1>
        <p className={style.text}>페이지를 찾을 수 없어요.</p>

        <div className={style.buttons}>
          <button onClick={() => history.back()}>이전 페이지</button>
          <button onClick={() => location.reload()}>새로고침</button>
        </div>
      </div>
    </main>
  );
}
