import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

import { ToastContainer, toast } from "react-custom-alert";
import "react-custom-alert/dist/index.css";

import css from "./LoginForm.module.css";
import { useState } from "react";

export const LoginForm = () => {
  const dispatch = useDispatch();

  // Стейт для повідомлень про помилки
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    // Валідація полів
    const validationErrors = {};

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
    dispatch(logIn({ email, password }));
    form.reset();
    setErrors({ email: "", password: "" }); // Очищаємо помилки після успішного сабміту
  };
  return (
    <div className={css.form_container}>
      {/* <img
        src="https://www.pngkit.com/png/full/387-3879685_user-account-icon-png.png"
        alt="User Icon"
        className={css.user_icon}
      /> */}
      <div className={css.container}>
        <h1>Login</h1>
        <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
          <label className={css.label}>
            Email
            <input
              type="email"
              name="email"
              className={css.input}
              placeholder="Enter your email"
            />
          </label>
          <label className={css.label}>
            Password
            <input
              type="password"
              name="password"
              className={css.input}
              placeholder="Enter your password"
            />
          </label>
          <button type="submit" className={css.login_button}>
            Login
          </button>
        </form>
      </div>
      <ToastContainer floatingTime={5000} />
    </div>
  );
};
