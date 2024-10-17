import { Helmet } from "react-helmet";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

export default function ContactDetails() {
  return (
    <div>
      <Helmet>
        <title>Contact information</title>
      </Helmet>
      <Contact />
      <Footer />
    </div>
  );
}
