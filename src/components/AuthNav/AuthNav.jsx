import { NavLink, useLocation } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthNav = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/login' ? (
        <NavLink className={css.link} to="/register">
          Register
        </NavLink>
      ) : (
        <NavLink className={css.link} to="/login">
          Log In
        </NavLink>
      )}
    </div>
  );
};