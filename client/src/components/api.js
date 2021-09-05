import axios from 'axios'
let api = axios.create({
    baseURL:"http://127.0.0.1:5000/api/",
    headers:{
        "x-access-token" :localStorage.getItem("token=f9jCrLBFEFSseA^3")
    }
})

export default api