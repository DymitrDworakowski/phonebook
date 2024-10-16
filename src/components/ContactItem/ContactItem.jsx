import React from "react";
import css from "./ContactItem.module.css";
// import { NavLink } from "react-router-dom";

const ContactItem = React.memo(
  ({
    name,
    email,
    phone,
    favorite,
    onEdit,
    onDelete,
    onChangeFavorite,
    _id,
  }) => {
    return (
      <div className={css.list}>
        <ul className={css.ul_contact}>
          <li className={css.name}>{name}</li>
          <li className={css.other}>{phone}</li>
          <li className={css.other}>E-mail: {email}</li>
        </ul>
        <div className={css.fav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            color={"#000000"}
            fill={"none"}
            className={`${css.favorites} ${favorite ? css.isTrue : css.isFalse}`}
            
          >
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.672"
              d="M11.245 4.174c.232-.666.347-.999.518-1.091a.5.5 0 01.475 0c.171.092.287.425.518 1.091l1.53 4.402c.066.19.1.285.159.355a.5.5 0 00.195.142c.085.034.185.036.386.04l4.66.096c.705.014 1.057.021 1.198.155a.5.5 0 01.146.452c-.035.191-.315.404-.877.83l-3.714 2.816c-.16.12-.24.181-.289.26a.5.5 0 00-.074.229c-.007.092.022.188.08.38l1.35 4.46c.204.676.306 1.013.222 1.188a.5.5 0 01-.384.28c-.193.025-.482-.176-1.06-.579l-3.826-2.662c-.165-.114-.247-.172-.337-.194a.5.5 0 00-.24 0c-.09.022-.173.08-.337.194L7.718 19.68c-.579.403-.868.604-1.06.578a.5.5 0 01-.385-.279c-.084-.175.018-.512.222-1.187l1.35-4.461c.058-.192.087-.288.08-.38a.5.5 0 00-.074-.23c-.049-.078-.128-.138-.288-.26l-3.714-2.815c-.562-.426-.843-.639-.878-.83a.5.5 0 01.147-.452c.14-.134.493-.141 1.198-.155l4.66-.095c.2-.005.3-.007.386-.041a.5.5 0 00.195-.142c.059-.07.092-.165.158-.355l1.53-4.402z"
            ></path>
          </svg>
        </div>
        <div className={css.checkbox}>
          <p>Add to favorite</p>
          <input
            className={css.checked}
            type="checkbox"
            checked={favorite}
            onChange={(e) => onChangeFavorite(e.target.checked)}
          />
        </div>
        {/* <NavLink className={css.link} to={`/contacts/${_id}`}>
          Details
        </NavLink> */}
        <button type="edit" onClick={onEdit} className={css.button_edit}>
          Edit
        </button>
        <button onClick={onDelete} className={css.button_delete}>
          <span>Delete</span>
        </button>
      </div>
    );
  }
);

export default ContactItem;
