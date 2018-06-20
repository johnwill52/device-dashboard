import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import styles from '../styles.css';
import App from './App';
import log from './log';
import createServer from './server';
import http from './http';

const server = createServer({
    actions: {},
    api: APP.API,
    http
});

server.getDeviceReading();
server.patchDeviceReading({ name: 'acceleration_y', active: 'true' })

function render(Component) {
    ReactDOM.render(
        <AppContainer>
            <Component/>
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

log.debug(`Relayr Device Dashboard`);
log.info(`API VERSION: ${APP.API.VERSION}`);
log.info(`API DEVICE ENDPOINT: ${APP.API.DEVICE}`);
log.info(`CLIENT VERSION: ${APP.CLIENT.VERSION}`);
log.error(`LOG LEVEL: ${APP.LOG.LEVEL}`);
