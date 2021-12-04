import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8b9b5.firebaseio.com/'
});

export default instance;