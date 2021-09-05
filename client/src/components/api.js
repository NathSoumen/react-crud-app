import axios from 'axios'

if(process.env.NODE_ENV === "production") {
    SERVER_URI = 'HEROKU_URI'
} 
else if(process.env.NODE_ENV === "development") {
    SERVER_URI = 'localhost:5000'
}
let api = axios.create({
    baseURL:`http://${SERVER_URI}/api/`,
    headers:{
        "x-access-token" :localStorage.getItem("token=f9jCrLBFEFSseA^3")
    }
})

export default api