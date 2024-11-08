import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-custom-alert";
import "react-custom-alert/dist/index.css";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    // Валідація полів
    const validationErrors = {};
    if (!name) {
      validationErrors.name = toast.warning("Name is required");
    } else if (name.length < 2) {
      validationErrors.name = toast.warning(
        "Name must be at least 2 characters long"
      );
    }
    if (!email) {
      validationErrors.email = toast.warning("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = toast.warning("Invalid email format");
    }

    if (!password) {
      validationErrors.password = toast.warning("Password is required");
    } else if (password.length < 6) {
      validationErrors.password = toast.warning(
        "Password must be at least 6 characters long"
      );
    }

    const alertError = () => toast.error("Please fill in all the fields.");
    // Якщо є помилки валідації, не надсилаємо форму
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alertError();
      return;
    }

    // Якщо немає помилок, викликаємо логін
    dispatch(register({ name, email, password }));
    form.reset();
    setErrors({name:"", email: "", password: "" }); // Очищаємо помилки після успішного сабміту
  };

  return (
    <div className={css.form_container}>
      <div className={css.container}>
        <h1>Registration</h1>
        <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
          <label className={css.label}>
            Username
            <input
              type="text"
              name="name"
              placeholder="Enter your username"
              className={css.input}
            />
          </label>
          <label className={css.label}>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={css.input}
            />
          </label>
          <label className={css.label}>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className={css.input}
            />
          </label>
          <button type="submit" className={css.reg_button}>
            Register
          </button>
        </form>
      </div>
      <ToastContainer floatingTime={5000} />
    </div>
  );
};
