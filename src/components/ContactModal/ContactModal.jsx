import React, { useEffect, useRef } from "react";
import css from "./ContactModal.module.css";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../../redux/contacts/operations";
import { useState } from "react";

const ContactModal = ({ contact, handleClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(contact ? contact.name : "");
  const [phone, setPhone] = useState(contact ? contact.phone : "");
  const [email, setEmail] = useState(contact ? contact.email : "");
  
  const modalRef = useRef(null); // Для відстеження кліків поза модалкою

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contact) {
      await dispatch(editContact({ id: contact._id, name, phone, email }));
    } else {
      await dispatch(addContact({ name, phone, email }));
    }
    handleClose();
  };

  // Закриття модалки по клавіші Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  // Закриття модалки по кліку поза її межами
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div className={css.div_form}>
      <form ref={modalRef} onSubmit={handleSubmit} className={css.form}>
        <p>{contact ? "Edit Contact" : "Add Contact"}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
        />
        <div className={css.button_div}>
          <button type="submit" className={css.form_button}>
            {contact ? " Edit contact" : " Add contact"}
          </button>
          <button onClick={handleClose} className={css.form_button}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactModal;
