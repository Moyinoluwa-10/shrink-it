import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { ImLink } from "react-icons/im";
import { Link } from "react-router-dom";
import "../../Styles/styles.scss";
import RightImage from "../../Assets/Images/www-amico.png";
import Modal from "../../Components/Modal";
import Header from "../../Components/Header";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const openModalHandler = () => {
    setOpenModal(true);
  };
  const [shorturl, setShortUrl] = useState();

  const handleClick = () => {
    const url = "https://url-shrink-it.herokuapp.com/api/url/shrink";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        longUrl: "https://meet.google.com/hqz-svga-gbi",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setShortUrl(result.shortUrl);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="homePage">
      {openModal && <Modal closeModal={setOpenModal} />}
      <Header />
      <div>{shorturl}</div>;
      <div className="container">
        <button onClick={handleClick}>Click me</button>
        <div className="leftSection">
          <Formik
            initialValues={{
              longUrl: "",
              alias: "",
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <div className="longUrl">
                <label htmlFor="longUrl">
                  <ImLink />
                  <ImLink />
                  Enter your long URL here
                </label>
                <Field
                  id="longUrl"
                  name="longUrl"
                  placeholder="http://localhost:3000/"
                />
              </div>
              <div className="alias">
                <label htmlFor="alias">
                  <ImLink /> Customize your link
                </label>
                <div className="aliasInput">
                  <Field id="alias" name="alias" placeholder="bub.junyong.me" />
                  <button disabled>Alias</button>
                </div>
              </div>

              <div className="buttons">
                <Link>My Url</Link>
                <button type="submit" onClick={openModalHandler}>
                  Bub It
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="rightSection">
          <img src={RightImage} alt="shrink-it" />
        </div>
      </div>
    </div>
  );
};

export default Home;
