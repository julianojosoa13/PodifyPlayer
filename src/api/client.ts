import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.88.234:8989',
});

export default client;
