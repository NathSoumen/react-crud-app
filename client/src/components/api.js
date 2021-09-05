import axios from 'axios'
let api = axios.create({
    baseURL:"/api/",
    headers:{
        "x-access-token" :localStorage.getItem("token=f9jCrLBFEFSseA^3")
    }
})

export default api