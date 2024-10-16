import PhoneIcon from "../../assets/icons/PhoneIcon.tsx";
import MailIcon from "../../assets/icons/MailIcon.tsx";
import LinkedinIcon from "../../assets/icons/LinkedinIcon.tsx";
import  css  from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={css.footer_container}>
      <div className={css.footer_connect}>
        <h2>Contactconnect</h2>
        <p>Effortless search for contact information.</p>
        
        
      </div>
      <div className={css.feedback}>
        <p>Connect with us:</p>
        <ul className={css.icons}>
          <li><a href="tel:+48577177636"><PhoneIcon/></a></li>
          <li><a href="mailto:d.dvorakivskyi@gmail.com"><MailIcon/></a></li>
          <li><a href="https://www.linkedin.com/in/dymitr-dworakowski/"><LinkedinIcon/></a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
