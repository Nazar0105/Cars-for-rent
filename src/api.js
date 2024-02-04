import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('https://65bb8a2952189914b5bc716c.mockapi.io/carsforrent/api/v1/carsforrent');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
