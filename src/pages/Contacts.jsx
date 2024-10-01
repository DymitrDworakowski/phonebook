import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "../pages/Contacts.module.css";
import Calendar from "react-calendar";
import { Helmet } from "react-helmet";
import ContactsList from "../components/ContactList/ContactsList";
import ContactForm from "../components/ContactForm/ContactForm";
import Button from "@mui/material/Button";
import SimpleReactCalendar from "simple-react-calendar";
import { fetchContacts } from "../redux/contacts/operations";
import { selectIsLoading } from "../redux/selectors";
import Loader from "../components/Loader/Loader";

export default function Tasks() {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Helmet>
        <title>Your contacts</title>
      </Helmet>
      <section>
        <div className={css.div_contact}>
          <h1>Phonebook</h1>
          <Button variant="contained" onClick={handleOpenAdd}>
            Add Contact
          </Button>

          <ContactForm handleCloseAdd={handleCloseAdd} openAdd={openAdd} />
          <h2>My Contacts</h2>

          {isLoading && <Loader />}

          <Button variant="contained" onClick={handleOpen}>
            My Contacts
          </Button>
          <ContactsList open={open} handleCloseM={handleClose} />
        </div>
        <div className={css.div_calendar}>
          <SimpleReactCalendar />
        </div>
      </section>
    </>
  );
}
