import fetch from 'isomorphic-fetch';

export const requestToApi = (endpoint, options, payload) => {
    const staticEndoint = process.env.BACKEND_URL || 'http://localhost:8001';

    return fetch(`${staticEndoint}/${endpoint}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        },
        body: JSON.stringify(payload),
        ...options
    })
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(reason => {
            console.log(reason);
            throw new Error(reason);
        });
};

export default requestToApi;