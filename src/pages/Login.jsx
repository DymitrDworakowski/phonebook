import { Helmet } from "react-helmet";
import { LoginForm } from "../components/LoginForm/LoginForm";
import Footer from "../components/Footer/Footer";
import css from "./Login.module.css";
import Loader from "../components/Loader/Loader";
import { selectIsLoading } from "../redux/selectors";
import { useSelector } from "react-redux";
export default function Login() {
  const isLoading = useSelector(selectIsLoading);
  return (
    <div className={css.container}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      {isLoading && <Loader />}
      <LoginForm />
      <Footer />
    </div>
  );
}
