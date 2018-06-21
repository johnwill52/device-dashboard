import createServer from '../server';

describe('server', () => {

    const api = {
        URL: 'any url',
        DEVICE: 'device'
    };

    let server;
    let http;
    let respond;

    beforeEach(() => {
        http = {
            get: jest.fn()
                .mockImplementation(() => new Promise(resolve => {
                    respond = ({ data }) => resolve({ data })
                })),
            patch: jest.fn()
                .mockImplementation(() => new Promise(resolve => {
                    respond = patched => resolve(patched)
                }))
        };
        server = createServer({
            api,
            http
        });
    })

    describe('getDeviceReadings', () => {

        it('calls http get on device resource', () => {
            server.getDeviceReadings();
            expect(http.get).toHaveBeenCalledWith(`${api.URL}${api.DEVICE}`);
        });

        it('when http get responds with data returns data', done => {
            expect.assertions(1);

            const data = 'any data' ;
            server.getDeviceReadings().then(response => {
                expect(response).toBe(data);
                done();
            });

            respond({ data });
        });

    });

    describe('patchDeviceReading', () => {

        it('calls http patch on device resource', () => {
            const name = 'any name';
            const active = true;
            server.patchDeviceReading({ name, active });
            expect(http.patch).toHaveBeenCalledWith(
                `${api.URL}${api.DEVICE}/${name}?active=${active}`
            );
        });

        it(
            'when http patch responds with patched status returns status', 
            done => {
            expect.assertions(1);

            const patched = false;
            server.patchDeviceReading({ 
                name: 'any name', 
                active: true 
            }).then(response => {
                expect(response).toBe(patched);
                done();
            });

            respond(patched);
        });

    });

});