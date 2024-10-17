import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import ContactsList from "../components/ContactList/ContactsList";

import { fetchContacts } from "../redux/contacts/operations";
import { selectIsLoading } from "../redux/selectors";
import Loader from "../components/Loader/Loader";

import Footer from "../components/Footer/Footer";
import css from "./Contacts.module.css";

export default function Tasks() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.contact_section}>
      <Helmet>
        <title>Contacts</title>
      </Helmet>
      <section>
        {isLoading && <Loader />}
        <ContactsList />
      </section>
      <Footer />
    </div>
  );
}
