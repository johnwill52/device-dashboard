import React from 'react';
import PropTypes from 'prop-types';

function Search({ onChange, tabIndexStart, value }) {
    return (
        <div className="search">
            <input 
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Filter by name"
                tabIndex={tabIndexStart}
            />    
        </div>
    );
}

Search.propTypes = {
    onChange: PropTypes.func.isRequired, 
    tabIndexStart: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
};

export default Search;
