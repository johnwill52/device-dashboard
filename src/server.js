function createServer({ api, http }) {
    return {
        async getDeviceReading() {
            const { data } = await http.get(`${api.URL}${api.DEVICE}`);
            return data;
        },
        async patchDeviceReading({ name, active }) {
            const patched = await http.patch(`${api.URL}${api.DEVICE}/${name}?active=${active}`);
            return patched;
        }
    }
}

export default createServer;