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
            const { data } = await authApi(configuration);
            return data;
        // case "/issues":
        //     return {
        //         "ok": true, "issues": [
        //             { "_id": "624a946d55e9190012adda11", "date": "2022-04-03T00:00:00.000Z", "service": "OTL", "sources": [{ "_id": "624a946d55e9190012adda12", "sourceType": "S3", "name": "jaydub_1649054829352.pptx", "url": "https://s3.ap-northeast-2.amazonaws.com/sparcs.home/jaydub_1649054829352.pptx" }], "title": "2022 Issu Newbie Seminar - React", "uploaderId": "jaydub" },
        //             { "_id": "622dc70055e9190012adda0f", "date": "2022-03-13T00:00:00.000Z", "service": "Ara", "sources": [{ "_id": "622dc70055e9190012adda10", "sourceType": "S3", "name": "triangle_1647167232641.pptx", "url": "https://s3.ap-northeast-2.amazonaws.com/sparcs.home/triangle_1647167232641.pptx" }], "title": "2022 Fall Newbie Seminar - Linux, Whale", "uploaderId": "triangle" },
        //             { "_id": "61990f2e55e9190012adda07", "date": "2021-11-21T00:00:00.000Z", "service": "Zabo", "sources": [{ "_id": "61990f2e55e9190012adda08", "sourceType": "S3", "name": "jungnoh_1637420846575.pdf", "url": "https://s3.ap-northeast-2.amazonaws.com/sparcs.home/jungnoh_1637420846575.pdf" }], "title": "2021 Homecoming - SPARCS@Home", "uploaderId": "jungnoh" },
        //             { "_id": "6199102c55e9190012adda09", "date": "2021-11-21T00:00:00.000Z", "service": "Geoul", "sources": [{ "_id": "6199102c55e9190012adda0a", "sourceType": "S3", "name": "platypus_1637421100272.pdf", "url": "https://s3.ap-northeast-2.amazonaws.com/sparcs.home/platypus_1637421100272.pdf" }], "title": "2021 Homecoming - OTL Plus", "uploaderId": "jungnoh" }]
        //     };
        default:
            const response = await api(configuration);
            if (response.status !== 200) {
                console.log(response);
                return undefined;
            } else {
                return response.data;
            }
    }
};

export default request;
