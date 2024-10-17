import css from "./Home.module.css";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import bookImage from "../assets/img/2.jpg";
import aj from "../assets/img/AJ.jpeg";
import ag from "../assets/img/AG.jpeg";
import js from "../assets/img/JS.jpeg";
import kl from "../assets/img/KL.jpeg";
import Footer from "../components/Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const settings = {
    dots: true, // Показувати крапки навігації
    infinite: true, // Нескінченний цикл
    speed: 500, // Швидкість анімації
    slidesToShow: 1, // Скільки слайдів показувати одночасно
    slidesToScroll: 1, // Скільки слайдів прокручувати за раз
    arrows: false, // Кнопки для перемикання
  };

  const quotes = [
    {
      text: "ContactConnect made finding contacts effortless. Our connections grew by 50% and that's fantastic!",
      author: "Alice Johnson, Sales Manager",
      image: aj,
    },
    {
      text: "This platform changed the way we connect with partners. Highly recommended!",
      author: "John Smith, Marketing Director",
      image: js,
    },
    {
      text: "ContactConnect has helped me expand my network significantly. The features are top-notch!",
      author: "Amanda Green, Business Owner",
      image: ag,
    },
    {
      text: "The ability to categorize and filter contacts in ContactConnect is fantastic! It has saved me countless hours.",
      author: "Kevin Lee, Financial Analyst",
      image: kl,
    },
  ];

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.text_block}>
          <h1 className={css.h1_home}>Discover and connect with</h1>
          <p className={css.p_home}>Efficiently search and manage contact</p>
          <NavLink className={css.link} to="/register">
            Register
          </NavLink>
        </div>
        <div className={css.img_box}>
          <img src={bookImage} alt="book" className={css.img_main} />
        </div>
      </div>
      <div className={css.quotation_box}>
        <Slider {...settings}>
          {quotes.map((quote, index) => (
            <div key={index} className={css.quotation_slide}>
              <h3>"{quote.text}"</h3>
              <div className={css.quotation}>
                <img
                  className={css.img_men}
                  src={quote.image}
                  alt={quote.author}
                />
                <p>{quote.author}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Footer />
    </div>
  );
}
