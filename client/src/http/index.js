import axios from "axios"


// _без авторизации
const $host = axios.create({
    baseURL: "http://www.sprtmen.haron.xyz/"
})


const $authHost = axios.create({
    baseURL: "http://www.sprtmen.haron.xyz/"
})

//.вставляю токен
const authInterceptor = config => {
    config.headers.Authorization = `Token ${localStorage.getItem('token_sport')}`
    // config.headers.Authorization = "Token " + localStorage.getItem('token_sport')
    return config
}

//_будет отробат перед каждым запросом и подстовлять токен
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
