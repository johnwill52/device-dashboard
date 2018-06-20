import http from '../http';

describe('http', () => {

    const url = 'any url';
    let respond;

    describe('get', () => {

        beforeEach(() => { 
            window.fetch = jest.fn()
                .mockImplementation(() => new Promise(resolve => {
                    respond = data =>
                        resolve({
                            json: async function json() {
                                await 0;
                                return data;
                            }
                        })
                }))
        });

        it('calls fetch', () => {
            http.get(url);
            expect(window.fetch).toHaveBeenCalledWith(
                url,
                {
                    'headers': {'Content-Type': 'application/json'}, 
                    'method': 'GET'
                }
            );
        });

        it('returns json response', async done => {
            expect.assertions(1);

            const data = 'any data';
            http.get(url).then(response => {
                expect(response).toBe(data);
                done();
            });

            await 0;
            respond(data);
        });

    });


    describe('patch', () => {

        beforeEach(() => {
            window.fetch = jest.fn()
                .mockImplementation(() => new Promise(resolve => {
                    respond = status => resolve({ status })
                }))
        });

        it('calls fetch', () => {
            http.patch(url);
            expect(window.fetch).toHaveBeenCalledWith(
                url,
                {
                    'headers': {'Content-Type': 'application/json'}, 
                    'method': 'PATCH'
                }
            );
        });

        it('when fetch succeeds return true', async done => {
            expect.assertions(1);

            http.patch(url).then(response => {
                expect(response).toBe(true);
                done();
            });

            await 0;
            respond(200);
        });

        it('when fetch fails return false', async done => {
            expect.assertions(1);

            http.patch(url).then(response => {
                expect(response).toBe(false);
                done();
            });

            await 0;
            respond(400);
        });

    });

});