import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        //header每个请求都需要用到
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken;