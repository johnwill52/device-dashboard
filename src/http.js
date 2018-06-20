const RESPONSE = {
    SUCCESS: 200
};

const baseHeaders = {
    'Content-Type': 'application/json'
};

const http = { 
    async get(url) {
        // TODO: implement error handling which is not happening with the 
        // current setup running the dev server before the client app
        const response = await fetch(url, {
            method: 'GET',
            headers: { ...baseHeaders }
        });
        return await response.json();
    }, 
    async patch(url) {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { ...baseHeaders }
        });
        return response.status === RESPONSE.SUCCESS;
    } 
};



export default http;
