import React from 'react';
import PropTypes from 'prop-types';

function Counter({ activeReadings, inactiveReadings }) {
    return (
        <div className="counter">
            <span className="active">
                <span>Active Readings</span>
                <span>{ activeReadings }</span>
            </span>
            <span className="inactive">
                <span>Inactive Readings</span>
                <span>{ inactiveReadings }</span>
            </span>     
        </div>
    );
}

Counter.propTypes = {
    activeReadings: PropTypes.number.isRequired, 
    inactiveReadings: PropTypes.number.isRequired
};

export default Counter;
