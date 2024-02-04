// src/Page/HomePage.js
import React, { useState } from 'react';
import HomeSection from './HomeSection';
import { Link } from 'react-router-dom';
import style from '../style/Home.module.css'; 

const HomePage = () => {
  const carImages = [
  './img/Bentley.jpg',
  './img/Buick Enclave.png',
  './img/GMC.jpg',
  './img/Hummer.jpg',
  './img/Mitsubishi.jpg',
  './img/Volvo XC60.jpg',
  './img/Volvo XC90.jpg',
  ];

const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImage = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentImageIndex - 1 + carImages.length) % carImages.length;
    } else {
      newIndex = (currentImageIndex + 1) % carImages.length;
    }
    setSelectedImage(carImages[newIndex]);
    setCurrentImageIndex(newIndex);
  };


  return (
    <div className={style['home-page']}>
      <HomeSection
        title="Ласкаво просимо до нашого сервісу оренди автомобілів!"
        description="Досліджуйте світ на зручних та сучасних автомобілях. Забронюйте свою поїздку вже сьогодні та відчуйте свободу маневру та комфорт у кожній подорожі."
      />
      <p className={style['additional-info']}>
        У нашому каталозі ви знайдете широкий вибір автомобілів різних марок та моделей. Ми горді надавати найвищий стандарт обслуговування та забезпечуємо найбільший вибір автомобілів для кожного смаку та бюджету.
      </p>
      <div className={style['why-choose-us']}>
        Чому обирають нас:
        <ul>
          <li>Широкий вибір автомобілів для будь-яких потреб.</li>
          <li>Прозорі та конкурентоспроможні ціни.</li>
          <li>Зручний онлайн-бронювання та швидкий сервіс.</li>
          <li>Гнучкі умови оренди та програми лояльності.</li>
        </ul>
      </div>
      <p className={style['gallery-info']}>
        Ідосі вагаєтесь? Можливо, наша галерея чудових автомобілів наштовхне вас на правильний вибір. Перегляньте фотографії наших ексклюзивних автомобілів нижче та оберіть той, який відповідає вашим потребам та стилю.
      </p>
      <div className={style['car-gallery']}>
        {carImages.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Car ${index}`}
            className={style['car-image']}
            onClick={() => openImage(imageUrl, index)}
          />
        ))}
      </div>
      {selectedImage && (
        <div className={style['modal']}>
          <span className={style['close']} onClick={closeImage}>
            &times;
          </span>
          <img src={selectedImage} alt="Enlarged Car" className={style['enlarged-image']} />
          <span className={style['prev']} onClick={() => navigateImage('prev')}>
            &#10094;
          </span>
          <span className={style['next']} onClick={() => navigateImage('next')}>
            &#10095;
          </span>
        </div>
      )}
      <p className={style['final-text']}>
    Чого ви чекаєте? Нумо переходьте до нашого каталогу
</p>
<div className={style['catalog-button-container']}>
    <Link to="/catalog" className={style['catalog-button']}>
        Catalogue
    </Link>
</div>
    </div>
  );
};

export default HomePage;
