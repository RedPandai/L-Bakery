import Image from "next/legacy/image";
import styles from "../styles/Contact.module.css";

const contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
        developed over many years.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure recusandae ipsam ratione esse, repellendus molestiae perferendis explicabo iste harum id illo, reiciendis ipsa ex corrupti cumque dolorum sapiente blanditiis provident sed. Laudantium perferendis dolore perspiciatis alias quaerat itaque dolor architecto, enim eaque rerum magnam ipsa ex ipsum molestiae eum quas.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum nihil, placeat harum aliquid aperiam maiores debitis illum, dolorum enim sed neque temporibus necessitatibus qui repellendus pariatur perspiciatis ea vero incidunt quia. Vitae laudantium qui sequi, accusantium quo repudiandae dolores deleniti ad sit nisi iusto alias tenetur autem. By the way, this is our owner's Cat.😼
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
          <label className={styles.label} htmlFor="name">😸Name</label>
          <input className={styles.input} type='text' id="name" />
          <label className={styles.label}  htmlFor="email">😺E-mail</label>
          <input className={styles.input} type='email' id="email" />
          <label className={styles.label}  htmlFor="message">😽Message</label>
          <textarea className={styles.textarea} id="message" />
          <button className={styles.button} onSubmit={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default contact;
