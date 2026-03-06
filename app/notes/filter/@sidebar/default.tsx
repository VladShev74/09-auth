// import React from 'react'
import css from "./SidebarNotes.module.css";
import Link from "next/link";

const tagArray = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All Notes
        </Link>
      </li>
      {tagArray.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SidebarNotes;
