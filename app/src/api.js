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
    response = await api(configuration);

    // const token = localStorage.getItem('connect.sid');
    // if (token) { configuration.headers['Cookie'] = `connect.sid=${token}`; }
    if (body) { configuration.data = body; }

    let response;
    switch (url) {
        case "/auth":
            return {};
        case "auth/login":
            response = await api(configuration);
            console.log({ response });
            return response.status === 200;
        default:
            response = await api(configuration);
            if (response.status !== 200) {
                console.error(response);
                throw Error;
            } else {
                return response.data;
            }
    }
};

export default request;
