import Image from "next/legacy/image";
import styles from "../styles/Contact.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import server from "util/server";
import validateForm from "@/utili/validateForm";

const contact = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { errors, isValid } = validateForm({ name, email, message });

  const createContact = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${server}/api/contacts`, data);
      console.log("success send message");
      if (res.status === 201) {
        setNotification(true);
        console.log("success send message");
        setLoading(false);
        setTimeout(() => setNotification(false), 3000);
      }
    } catch (err) {
      console.log("bad response");
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    isValid && createContact({ name, email, message });
  };
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>

      <p className={styles.desc}>
        At the L's Bakery, we excels to produce and supply of delicious ambient
        and thaw to serve and bake off sweet baked treats for our customers.
        Founded in 2022, our family bakery has been creating tempting treats for
        our customers, from classic bakes to the most on-trend products and
        flavours. From muffins to flapjacks, cookies to shortbreads, we lovingly
        bake and pack the tastiest treats using tried-and-tested recipes we've
        developed over many years. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Iure recusandae ipsam ratione esse, repellendus
        molestiae perferendis explicabo iste harum id illo, reiciendis ipsa ex
        corrupti cumque dolorum sapiente blanditiis provident sed. Laudantium
        perferendis dolore perspiciatis alias quaerat itaque dolor architecto,
        enim eaque rerum magnam ipsa ex ipsum molestiae eum quas. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Dolor rerum nihil, placeat
        harum aliquid aperiam maiores debitis illum, dolorum enim sed neque
        temporibus necessitatibus qui repellendus pariatur perspiciatis ea vero
        incidunt quia. Vitae laudantium qui sequi, accusantium quo repudiandae
        dolores deleniti ad sit nisi iusto alias tenetur autem. By the way, this
        is our owner's Cat.😼
      </p>
      <div className={styles.wrapper}>
        <Image
          className={styles.owner}
          src="/img/owner.png"
          objectFit="contain"
          width={200}
          height={390}
          alt="owner cat"
        />
        <form className={styles.form}>
          <label className={styles.label} htmlFor="name">
            😸Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.error}> {name && errors.name}</div>

          <label className={styles.label} htmlFor="email">
            😺E-mail
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.error}>{email && errors.email}</div>

          <label className={styles.label} htmlFor="message">
            😽Message
          </label>
          <textarea
            className={styles.textarea}
            id="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={styles.error}> {message && errors.message}</div>
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Submit
          </button>
          {loading && (
            <div className={styles.loader}>Your Message is Sending...</div>
          )}

        </form>
      </div>
    </div>
  );
};

export default contact;
