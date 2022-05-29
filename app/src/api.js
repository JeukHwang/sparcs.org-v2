import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://3.39.230.113:3000/',
    validateStatus: false
});

const request = async (url, method = 'get', body = null, options = null) => {
    const configuration = {
        url,
        method,
        headers: {},
        ...options
    };

    const token = localStorage.getItem('SparcsAuthorization');
    if (token)
        configuration.headers['Sparcs-Authorization'] = token;

    if (body) {
        configuration.data = body;
    }

    switch (url) {
        case "/auth":
            // const { data } = await authApi(configuration);
            // return data;
            return {};
        default:
            const response = await api(configuration);
            if (response.status !== 200) {
                console.error(response);
                throw Error;
            } else {
                return response.data;
            }
    }
};

export default request;
