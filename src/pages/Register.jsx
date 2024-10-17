import { Helmet } from 'react-helmet';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import Footer from "../components/Footer/Footer";
import css from './Register.module.css'

export default function Register() {
  return (
    <div className={css.container}>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <RegisterForm />
      <Footer/>
    </div>
  );
}
