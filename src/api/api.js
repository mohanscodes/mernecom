import axios from "axios";

// const local = 'http://localhost:5000'
const local = 'https://ecombackend-15y4.onrender.com'

const api = axios.create({
    baseURL: `${local}/api`
})

export default api