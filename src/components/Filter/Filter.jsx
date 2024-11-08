import css from "./Filter.module.css";
import { useDispatch } from "react-redux";
import { findContact } from "../../redux/contacts/filterSlice";

const Filter = ({ handleChange, sortBy }) => {
  const dispatch = useDispatch();

  const handleFilter = async (e) => {
    e.preventDefault();
    const value = e.target.value; // Отримуємо значення поля введення безпосередньо з події

    await dispatch(findContact(value));
  };

  return (
    <div className={css.div_filter}>
      <p className={css.title_filter}>Filters</p>
      <input
        type="text"
        name="search"
        placeholder="Search by name"
        onChange={handleFilter}
      />
      <p className={css.title_select}>Sort by:</p>
      <select
        id="demo-simple-select"
        value={sortBy}
        onChange={handleChange}
        className={css.select_filter}
      >
        <option value="none">None</option>
        <option value="byAB">Sort name by A-B</option>
        <option value="byBA">Sort name by B-A</option>
        <option value="byFavorite">Sort favorite</option>
      </select>
    </div>
  );
};

export default Filter;
