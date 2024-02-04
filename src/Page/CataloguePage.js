import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import style from '../style/Catalog.module.css';
import { selectCars, selectFavorites } from '../redux/selectors'; 
import { addToFavorites } from '../redux/actions';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchBrand, setSearchBrand] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [searchMileage, setSearchMileage] = useState('');
  const [visibleCars, setVisibleCars] = useState(12);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  

  // Додайте стан для списку марок та флагу для відображення/приховування списку
  const [carMakes, setCarMakes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };

  // Завантажте список марок при завантаженні компонента
  useEffect(() => {
    const fetchCarMakes = async () => {
      try {
        const response = await axios.get('/makes.json');
        setCarMakes(response.data);
      } catch (error) {
        console.error('Error fetching car makes:', error);
      }
    };

    fetchCarMakes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://65bb8a2952189914b5bc716c.mockapi.io/carsforrent/api/v1/carsforrent');
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredByBrand = cars.filter((car) => car.make.toLowerCase().includes(searchBrand.toLowerCase()));
    const filteredByPrice = cars.filter((car) => car.rentalPrice.includes(searchPrice));
    const filteredByMileage = cars.filter((car) => car.mileage.toString().includes(searchMileage));

    const result = filteredByBrand.filter((car) => filteredByPrice.includes(car) && filteredByMileage.includes(car));

    setFilteredCars(result);
  }, [searchBrand, searchPrice, searchMileage, cars]);

  const loadMore = () => {
    setVisibleCars((prevVisibleCars) => prevVisibleCars + 12);
  };

  // Додайте функцію для відображення/приховування списку марок
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Додайте функцію для вибору марки та закриття списку
  const selectCarMake = (make) => {
    setSearchBrand(make);
    setIsDropdownOpen(false);
  };

  const addToFavoritesHandler = (car) => {
    dispatch(addToFavorites(car));
  };

  return (
    <div className={style['catalog-page']}>
      <div className={style['catalog-btn']}>
      <Link to="/" className={style['back-button']}>
        Back to Home
      </Link>
      <Link to="/favorites" className={style['favorites-button']}>
        Favorites
        </Link>
        </div>
      <div className={style['filter-container']}>
        <div className={style['filter-element-Car-brand']}>
    <p className={style['filter-label-Car-brand']}>Car brand</p>
    <div className={style['filter-input-Car-brand']}>
        <input
            className={style['filter-input-text-Car-brand']}
            type="text"
            placeholder="Enter the text"
            value={searchBrand}
            onChange={(e) => setSearchBrand(e.target.value)}
        />
        <div className={style['filter-input-arrow-Car-brand']} onClick={toggleDropdown}>
            &gt;
        </div>
        {isDropdownOpen && (
            <div className={style['dropdown-list']}>
                {carMakes.map((make) => (
                    <div key={make} className={style['dropdown-item']} onClick={() => selectCarMake(make)}>
                        {make}
                    </div>
                ))}
            </div>
        )}
    </div>
</div>
        <div className={style['filter-element-Price-hour']}>
          <p className={style['filter-label-Price-hour']}>Price/1 hour</p>
          <div className={style['filter-input-Price-hour']}>
            <input
              className={style['filter-input-text-Price-hour']}
              type="text"
              placeholder="To $"
              value={searchPrice}
              onChange={(e) => setSearchPrice(e.target.value)}
            />
            <div className={style['filter-input-arrow-Price-hour']}>&gt;</div>
          </div>
        </div>

        <div className={style['filter-element-Car-mileage']}>
          <p className={style['filter-label-Car-mileage']}>Car mileage / km</p>
          <div className={style['filter-input-Car-mileage']}>
            <input
              className={style['filter-input-Car-mileage']}
              type="text"
              placeholder="From "
              value={searchMileage}
              onChange={(e) => setSearchMileage(e.target.value)}
            />
            <input
              className={style['filter-input-Car-mileage']}
              type="text"
              placeholder="To"
              value={searchMileage}
              onChange={(e) => setSearchMileage(e.target.value)}
            />
            <button className={style['search-button']}>Search</button>
          </div>
        </div>
      </div>

      <h2>Каталог автомобілів</h2>
      <div className={style['car-list']}>
        {filteredCars.slice(0, visibleCars).map((car) => (
          <div key={car.id} className={style['car-card']}>
            <img src={car.img} alt={`${car.make} ${car.model}`} className={style['car-image']} />
            <div className={style['car-info']}>
              <h3 className={style['car-title']}>
                {car.make} {car.model}, {car.year} {car.rentalPrice}
              </h3>
              <div className={style['car-details']}>
                <p className={style['car-description']}>{car.address}</p>
                <p className={style['car-description']}>{car.rentalCompany}</p>
              </div>
              <button className={style['learn-more-button']} onClick={() => openModal(car)}>
                Learn more
              </button>
              <Link
              to={`/car/${car.id}`}
              className={style['add-to-favorites-button']}
              onClick={() => addToFavoritesHandler(car)}
            >
              Add to favorites
            </Link>
            </div>
          </div>
        ))}

        {visibleCars < filteredCars.length && (
          <button className={style['load-more-button']} onClick={loadMore}>
            Load more
          </button>
        )}

        {isModalOpen && selectedCar && (
          <div className={style['modal-overlay']} onClick={closeModal}>
            <div
              className={style['modal-content']}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '470px', height: '560px', borderRadius: '10px' }}
            >
              <img
                src={selectedCar.img}
                alt={`${selectedCar.make} ${selectedCar.model}`}
                className={style['modal-car-image']}
                style={{ width: '461px', height: '248px', borderRadius: '10px 10px 0 0' }}
              />
              <div className={style['modal-info']}>
                <h2>{`${selectedCar.make} ${selectedCar.model}`}</h2>
                <p>
                  <strong>Address:</strong> {selectedCar.address}
                </p>
                <p>
                  <strong>Description:</strong> {selectedCar.description}
                </p>
                <p>
                  <strong>Accessories:</strong> {selectedCar.accessories}
                </p>
                <p>
                  <strong>Functionalities:</strong> {selectedCar.functionalities}
                </p>
                <p>
                  <strong>Rental Conditions:</strong> {selectedCar.rentalConditions}{' '}
                </p>
              </div>
              <div className={style['modal-btn']}>
                <a href="tel:+380730000000" className={style['rental-button']}>
                  Rental car
                </a>
                <button className={style['close-button']} onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;