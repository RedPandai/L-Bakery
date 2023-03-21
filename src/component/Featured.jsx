import React, { useState } from "react";
import Image from "next/legacy/image";
import styles from "../styles/Featured.module.css";

const images = [
  "/img/Featured1.png",
  "/img/Featured2.png",
  "/img/Featured3.png",
];


const Featured = () => {
  const [currentImage, setCurrtentImage] = useState(0);
  const length = images.length;

  const prevImage = () => {
    setCurrtentImage(currentImage === 0 ? length - 1 : currentImage - 1);
  };
  const nextImage = () => {
    setCurrtentImage(currentImage === length - 1 ? 0 : currentImage + 1);
  };
  const goToImage = (index) => {
    setCurrtentImage(index);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={prevImage}
      >
        <Image
          src="/img/arrowl.png"
          alt="arrow left"
          layout="fill"
          objectFit="contain"
          unoptimized
        />
      </div>

      {images.map((image, index) => (
        <div
          className={
            index === currentImage
              ? styles.imgContainer
              : styles.imgContainerActive
          }
          key={index}
        >
          <Image
            src={`${image}`}
            alt="featuredimages"
            objectFit="contain"
            layout='fill'
            placeholder="blur"
            blurDataURL={`${image}`}
          />
        </div>
      ))}

      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={nextImage}
      >
        <Image
          src="/img/arrowr.png"
          alt="arrow right"
          layout="fill"
          objectFit="contain"
          unoptimized
        />
      </div>
      <div className={styles.dotContainer}>
        {images.map((image, index) => {
          return (
            <div
              className={
                index === currentImage ? styles.dots : styles.dotsActive
              }
              key={index}
              onClick={() => goToImage(index)}
            >
              •
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
