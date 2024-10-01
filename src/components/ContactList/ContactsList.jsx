import css from "./ContactsList.module.css";

import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";

import Filter from "../Filter/Filter";

import { selectIsLoading } from "../../redux/selectors";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  editContact,
  statusFavorite,
} from "../../redux/contacts/operations";
import { selectFilterContacts } from "../../redux/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import ContactModal from "../ContactModal/ContactModal";

const ContactsList = ({ open, handleCloseM }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilterContacts);
  const [openId, setOpenId] = useState(null);
  const [editingContactId, setEditingContactId] = useState(""); // Додано стан для зберігання id редагованого контакту
  const [sortBy, setSortBy] = useState("");
  const isLoading = useSelector(selectIsLoading);

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteContact(id));
      setTimeout(() => {
        dispatch(fetchContacts());
      }, 100);
    },
    [dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value;
    const phone = form.elements.phone.value;
    const email = form.elements.email.value;
    const id = editingContactId;
    dispatch(editContact({ name, phone, email, id }));
    form.reset();
    handleClose();
    setTimeout(() => {
      dispatch(fetchContacts());
    }, 100);
  };

  const handleChangeFavorite = (id, favorite) => {
    dispatch(statusFavorite({ favorite, id }));
    setTimeout(() => {
      dispatch(fetchContacts());
    }, 100);
  };

  const handleOpen = (id) => {
    setOpenId(id);
    setEditingContactId(id);
  };

  const handleClose = () => setOpenId(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
  };

  const sortContacts = (contacts) => {
    if (sortBy === "byAB") {
      return [...contacts].sort((a, b) => a.name.localeCompare(b.name)); // Сортування A-B
    } else if (sortBy === "byBA") {
      return [...contacts].sort((a, b) => b.name.localeCompare(a.name)); // Сортування B-A
    } else if (sortBy === "byFavorite") {
      return [...contacts].sort((a, b) => b.favorite - a.favorite); // Сортування за порядком 1-2 (за id)
    } else {
      return contacts; // Повернення незміненого масиву контактів, якщо сортування не вибрано
    }
  };
  const sortedContacts = sortContacts(contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch, handleDelete]);

  return (
    <Modal
      open={open}
      onClose={handleCloseM}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={css.modalOverlayList}
    >
      <div className={css.div_list}>
        <Filter />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          onChange={handleChange}
        >
          <MenuItem value="none">...</MenuItem>
          <MenuItem value="byAB">Sort name by A-B</MenuItem>
          <MenuItem value="byBA">Sort name B-A</MenuItem>
          <MenuItem value="byFavorite">Sort favorite</MenuItem>
        </Select>
        {sortedContacts.map(({ name, email, phone, _id, favorite }, index) => (
          <ul className={css.list} key={`${_id}-${index}`}>
            <li>Name: {name}</li>
            <li>Phone: {phone}</li>
            <li>E-mail: {email}</li>
            <span
              className={`${css.favorites} ${
                favorite ? css.isTrue : css.isFalse
              }`}
            ></span>
            <input
              className={css.checked}
              type="checkbox"
              checked={favorite}
              onChange={(e) => handleChangeFavorite(_id, e.target.checked)}
            />
            <Button
              variant="contained"
              type="edit"
              onClick={() => handleOpen(_id)}
            >
              Edit
            </Button>
            <LoadingButton
              size="small"
              onClick={() => handleDelete(_id)}
              loadingPosition="end"
              variant="outlined"
              loading={isLoading}
              endIcon={<DeleteIcon />}
            >
              <span>Delete</span>
            </LoadingButton>
            <ContactModal
              open={openId === _id}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              name={name}
              email={email}
              phone={phone}
            />
          </ul>
        ))}
      </div>
    </Modal>
  );
};

export default ContactsList;
