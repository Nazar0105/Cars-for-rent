import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from '../style/FavoritesPage.module.css';

const FavoritesPage = () => {
  return (
    <div className={style['favorites-page']}>
      <Link to="/" className={style['back-to-home-button']}>
        Back to Home
      </Link>
      <Link to="/catalog" className={style['go-to-catalog-button']}>
        Go to Catalog
      </Link>
      {/* Your content goes here */}
      <footer className={style['page-footer']}>
        <div className={style['footer-text-left']}>Дякуємо що обрали нас!</div>
        <div className={style['footer-text-right']}>Developer by Pro100Nazar</div>
      </footer>
    </div>
  );
};

export default FavoritesPage;
