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
  
  const modalRef = useRef(null); 

  // Validation function for email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Format and validate phone number
  const formatPhoneNumber = (phone) => {
    // Remove all non-numeric characters
    return phone.replace(/\D/g, "");
  };

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check name length
    if (name.length < 2) {
      alert("Name must be at least 2 characters long.");
      return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Format phone and validate length
    const formattedPhone = formatPhoneNumber(phone);
    if (formattedPhone.length < 10) {
      alert("Phone number must be at least 10 digits.");
      return;
    }

    const contactData = { name, phone: formattedPhone, email };

    // Dispatch appropriate action
    if (contact) {
      await dispatch(editContact({ id: contact._id, ...contactData }));
    } else {
      await dispatch(addContact(contactData));
    }
    handleClose();
  };

  // Close modal on Escape key
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

  // Close modal on outside click
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
