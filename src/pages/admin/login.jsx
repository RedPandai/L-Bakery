import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import server from "util/server";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setError(false), 2000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleClick = async () => {
    try {
      await axios.post(`${server}/api/login`, {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginWrapper}>
        <div className={styles.wrapper}>
          <h1>Admin Log In</h1>
          <input
            placeholder="username"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick} className={styles.button}>
            Sign In
          </button>
          {error && <span className={styles.error}>Wrong Credentials!</span>}
        </div>
        <div className={styles.catWrapper}>
          <div className={styles.catPaw}></div>
          <div className={styles.catPaw}></div>
          <div className={styles.catPaw}></div>
          <div className={styles.vapour}>
            <span className={styles.i}></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
