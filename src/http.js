const RESPONSE = {
    SUCCESS: 200
};

const baseHeaders = {
    'Content-Type': 'application/json'
};

function createHttp({ log }) {
    return { 
        async get(url) {
            log.info('GET request', url);
            const response = await fetch(url, {
                method: 'GET',
                headers: { ...baseHeaders }
            });
            log.info('GET response', url, response);
            return await response.json();
        }, 
        async patch(url) {
            log.info('PATCH request', url);
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { ...baseHeaders }
            });
            log.info('PATCH response', url, response);
            return response.status === RESPONSE.SUCCESS;
        } 
    };
}

export default createHttp;
