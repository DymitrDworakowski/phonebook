import css from "./ContactForm.module.css";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const ContactForm = ({ openAdd, handleCloseAdd }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value;
    const phone = form.elements.phone.value; // Отримуємо значення number з форми
    const email = form.elements.email.value;

    dispatch(addContact({ name, phone, email })); // Передаємо об'єкт зі значеннями name та number до екшена
    form.reset();
  };

  return (
    <Modal
      open={openAdd}
      onClose={handleCloseAdd}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={css.modalOverlayAdd}
    >
      <div className={css.div_form}>
        <form className={css.form} onSubmit={handleSubmit}>
          <p>Name</p>
          <input
            className={css.input}
            type="text"
            name="name"
            required
            placeholder="Name"
          />
          <p>Email</p>
          <input
            className={css.input}
            type="email"
            name="email"
            required
            placeholder="Email"
          />
          <p>Number</p>
          <input
            className={css.input}
            type="tel"
            name="phone"
            required
            placeholder="phone"
          />

          <button type="submit" className={css.form_button}>
            Add contact
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ContactForm;
