import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';
import createHttp from './http';
import log from './log';
import createServer from './server';

import reset from './reset.css';
import styles from './styles.css';

log.info(`Relayr Device Dashboard`);
log.info(`API VERSION: ${APP.API.VERSION}`);
log.info(`API DEVICE ENDPOINT: ${APP.API.DEVICE}`);
log.info(`CLIENT VERSION: ${APP.CLIENT.VERSION}`);
log.info(`LOG LEVEL: ${APP.LOG.LEVEL}`);

const server = createServer({
    api: APP.API,
    http: createHttp({ log }),
    log
});

const context = {
    getDeviceReadings: server.getDeviceReadings,
    patchDeviceReading: server.patchDeviceReading
};

function render(Component) {
    ReactDOM.render(
        <AppContainer>
            <Component context={context} />
        </AppContainer>,
        document.getElementById('root')
    );
}

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
}
