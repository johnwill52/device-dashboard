const DEBUG = "DEBUG"; 
const INFO = "INFO";
const ERROR = "ERROR";

const LOG_LEVELS = [
    DEBUG,
    INFO,
    ERROR
];

const APP_LOG_LEVEL = LOG_LEVELS.indexOf(APP.LOG.LEVEL);
const DEBUG_LOG_LEVEL = LOG_LEVELS.indexOf(DEBUG);
const INFO_LOG_LEVEL = LOG_LEVELS.indexOf(INFO);
const ERROR_LOG_LEVEL = LOG_LEVELS.indexOf(ERROR);

function logAt(level, message) {
    console.log(level, new Date().toISOString(), message);
}

const log = {
    debug(message) {
        if (APP_LOG_LEVEL <= DEBUG_LOG_LEVEL)
            logAt(DEBUG, message);
    },
    info(message) {
        if (APP_LOG_LEVEL <= INFO_LOG_LEVEL)
            logAt(INFO, message);
    },
    error(message) {
        if (APP_LOG_LEVEL <= ERROR_LOG_LEVEL)
            logAt(ERROR, message);
    }
};

export default log;
