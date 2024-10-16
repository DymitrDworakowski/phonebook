import { useDispatch } from "react-redux";

import { logOut } from "../../redux/auth/operations";
import { useAuth } from "../../hooks/useAuth";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
console.log({ user } )
  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome , {user.email}</p>
      {/* <p>Your subscription: {user.subscription}</p> */}
      <button type="button" className={css.logout_button} onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
};
