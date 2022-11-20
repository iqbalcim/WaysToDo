import axios from "axios"

export const API = axios.create({
    baseURL: "https://api.v2.kontenbase.com/query/api/v1/1382ad96-17b3-403d-aa0e-d00d876aadce/"
})