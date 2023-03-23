import { useState,useEffect } from "react";
import server from "util/server";
import styles from "../styles/Add.module.css";
import axios from "axios";
import addFormValidation from "@/utili/addFormValidation";

const Add = ({ setClose }) => {
 
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [prices, setPrices] = useState([]);
  const [pricesInput, setPricesInput] = useState('')
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState('');
  const [pending, setPending] = useState(false);
  const { errors, isValid } = addFormValidation({title, file, pricesInput, desc,extra})

  const changePrice = (e, index) => {

    const currentPrices = prices;
    currentPrices[index] = pricesInput; 
    setPricesInput(e.target.value)
    setPrices(currentPrices);
  };


  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    setPending(true)
    const data = new FormData();
    //to handle file upload then use this FormData
    data.append("file", file);
    data.append("upload_preset", "uploads");
    console.log(data)
    try {
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/dkxitsfyo/image/upload`,
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post(`${server}/api/products`, newProduct);
      setPending(false)
      setClose(true);
    } catch (err) {
      console.log('bad response')
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new Product</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <div className={styles.error}> {title && errors.file}</div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className={styles.error}> {title && errors.title}</div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc (no more than 20 words)</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            className={styles.textarea}
            required
          />
          <div className={styles.error}> {desc && errors.desc}</div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
              required
              max={100}
              min={0.5}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
              required
              max={100}
              min={0.5}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
              max={100}
              min={0.5}
            />
          </div>
          <div className={styles.error}> {prices && errors.prices}</div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.error}> {extra && errors.extra}</div>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
              max={10}
              min={0.5}
            />
            <button className={styles.extraButton} onClick={handleExtra} disabled={errors.extra}>
              Add Extra
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate} disabled={!isValid}>
          Create
        </button>
        {pending && <div className={styles.loader}>Uploading the product informaton, please do not close your window or refresh the page.</div>}
      </div>
    </div>
  );
};

export default Add;