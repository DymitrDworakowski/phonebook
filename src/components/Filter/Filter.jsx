import css from "./Filter.module.css";
import { useDispatch } from "react-redux";
import { findContact } from "../../redux/contacts/filterSlice";

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    e.preventDefault();
    const value = e.target.value; // Отримуємо значення поля введення безпосередньо з події

    dispatch(findContact(value));
  };

  return (
    <div className={css.div_filter}>
      <p className={css.p_filter}>Find contact by name</p>
      <input
        type="text"
        name="search"
        placeholder="Find contact"
        onChange={handleFilter}
      />
    </div>
  );
};

export default Filter;
