import React from 'react';
import PropTypes from 'prop-types';

import Counter from './Counter';
import Search from './Search';
import Table from './Table';

import './App.css';

class App extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            deviceReadings: [],
            filterCriteria: ''
        };

        this._filterDisplayed = this._filterDisplayed.bind(this);
        this._isDeviceDisabled = this._isDeviceDisabled.bind(this);
        this._toggleActive = this._toggleActive.bind(this);
    }

    _filterDisplayed(filterCriteria) {
        this.setState({ filterCriteria });
    }

    _isDeviceDisabled(device) {
        return device.disabled;
    }

    async _toggleActive(deviceReading) {
        const { context } = this.props;

        if (deviceReading.disabled)
            return;

        this.setState(
            { 
                deviceReadings: this.state.deviceReadings.map(d =>      
                    d.name === deviceReading.name
                        ? { ...deviceReading, disabled: true }
                        : d
                )
            },
            async () => {
                const patched = await context.patchDeviceReading({
                    name: deviceReading.name,
                    active: !deviceReading.active
                });

                this.setState({
                    deviceReadings: this.state.deviceReadings.map(d =>      
                        d.name === deviceReading.name
                            ? { 
                                ...deviceReading, 
                                active: patched 
                                    ? !deviceReading.active
                                    : deviceReading.active,
                                disabled: false }
                            : d
                    )
                })
            }
        );
    }

    async componentDidMount() {
        const { context } = this.props;
        const deviceReadings = await context.getDeviceReadings();
        this.setState({ 
            deviceReadings: deviceReadings.map(deviceReading => ({
                ...deviceReading,
                disabled: false
            }))
        });
    }

    render() {
        const { deviceReadings, filterCriteria } = this.state;

        const activeReadings = deviceReadings.filter(d => d.active).length;
        const inactiveReadings = deviceReadings.length - activeReadings;

        const displayedDeviceReadings = deviceReadings.filter(
            d => d.name.indexOf(filterCriteria) > -1
        );

        return (
            <section className="app">
                <div className="header">
                    <img src="https://relayr.io/en/wp-content/uploads/sites/5/2014/03/relayr_logo_400px-1-1-1.png" />
                    <div>
                        Navigate with TAB / SHIFT+TAB, 
                        toggle the active status of a reading 
                        with a CLICK or a SPACEBAR press.
                    </div>
                </div>
                <Search 
                    onChange={this._filterDisplayed}
                    tabIndexStart={1}
                    value={filterCriteria}
                />
                <Counter 
                    activeReadings={activeReadings}
                    inactiveReadings={inactiveReadings}
                />
                <Table 
                    data={displayedDeviceReadings} 
                    isRowDisabled={this._isDeviceDisabled}
                    renderCell={{
                        active: device => { 
                            if (device.disabled)
                                return <span className="loading">...</span>
                            else
                                return device.active
                                    ? <span className="active">&#10004;</span>
                                    : <span className="inactive">&#10006;</span> 
                        }
                    }}
                    rowAction={this._toggleActive} 
                    tabIndexStart={2}
                />
            </section>
        );
    }
}

App.propTypes = {
    context: PropTypes.shape({
        getDeviceReadings: PropTypes.func.isRequired,
        patchDeviceReading: PropTypes.func.isRequired
    }).isRequired
};

export default App;
