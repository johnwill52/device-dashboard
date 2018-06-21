import React from 'react';
import { mount } from 'enzyme';

import App from '../App';
import Counter from '../Counter';
import Search from '../Search';
import Table from '../Table';

jest.mock('../Counter', () => () => <div />);
jest.mock('../Search', () => () => <div />);
jest.mock('../Table', () => () => <div />);

describe('<App />', () => {

    const deviceReadings = [
        { name: 'a', active: true, any: 'prop' },
        { name: 'b', active: true, another: 'prop' },
        { name: 'c', active: true, yet: 'another' }
    ];

    let wrapper;
    let context;
    let respondGet;
    let respondPatchSuccess;
    let respondPatchFailure;

    beforeEach(() => {
        context = {
            getDeviceReadings: jest.fn()
                .mockImplementation(() => new Promise(resolve => {
                    respondGet = deviceReadings => resolve(deviceReadings) 
                })),
            patchDeviceReading: jest.fn()
                .mockImplementation(() => new Promise(resolve => {
                    respondPatchSuccess = () => resolve(true);
                    respondPatchFailure = () => resolve(false);
                })),
        };
        wrapper = mount(<App context={context} />);
    });

    describe('renders', () => {

        it('Search', () => {
            expect(wrapper.find(Search).exists()).toBe(true);
            expect(wrapper.find(Search).props()).toMatchObject({
                tabIndexStart: 1,
                value: ''
            });
        });

        it('Counter', () => {
            expect(wrapper.find(Counter).exists()).toBe(true);
            expect(wrapper.find(Counter).props()).toEqual({
                activeReadings: 0,
                inactiveReadings: 0
            });
        });

        it('Table', () => {
            expect(wrapper.find(Table).exists()).toBe(true);
            expect(wrapper.find(Table).props()).toMatchObject({
                data: [],
                tabIndexStart: 2
            });
        });

    });

    describe('on mount', () => {

        it('calls getDeviceReadings', () => {
            expect(context.getDeviceReadings).toHaveBeenCalled();
        });
        
        it(
            'when getDeviceReadings resolves renders device readings', 
            async () => {
            expect.assertions(2);
            
            await 0;
            respondGet(deviceReadings);
            
            await 0;
            wrapper.update();
            
            expect(wrapper.find(Table).props().data).toEqual([
                { name: 'a', active: true, any: 'prop', disabled: false },
                { name: 'b', active: true, another: 'prop', disabled: false },
                { name: 'c', active: true, yet: 'another', disabled: false }
            ]);
            expect(wrapper.find(Counter).props()).toEqual({
                activeReadings: 3,
                inactiveReadings: 0
            });
        });
          
    });

    describe('Table prop isRowDisabled', () => {

        it('returns true if the row is disabled, false otherwise', () => {
            const isRowDisabled = wrapper.find(Table).props().isRowDisabled;
            expect(isRowDisabled({ name: 'a', disabled: true })).toBe(true);
            expect(isRowDisabled({ name: 'a', disabled: false })).toBe(false);
        });

    });

    describe('calling Table prop rowAction', () => {
        
        const index = 1;
        const deviceReadingToPatch = deviceReadings[index];

        beforeEach(async () => {
            await 0;
            respondGet(deviceReadings);     
            await 0;
            wrapper.update();
            wrapper.find(Table).props().rowAction(deviceReadingToPatch);
            wrapper.update();
        });

        it(
            'does nothing if device corresponding to rowAction is disabled', 
            () => {
            context.patchDeviceReading.mockClear();
            wrapper.find(Table).props().rowAction({
                ...deviceReadingToPatch,
                disabled: true 
            });
            expect(context.patchDeviceReading).not.toHaveBeenCalled();
        });

        it(
            'sets device corresponding to rowAction disabled', 
            () => {
            expect(wrapper.find(Table).props().data).toEqual([
                { name: 'a', active: true, any: 'prop', disabled: false },
                { name: 'b', active: true, another: 'prop', disabled: true },
                { name: 'c', active: true, yet: 'another', disabled: false }
            ]);
        });

        it(
            'calls patchDeviceReading on device corresponding to rowAction ' +
            'with opposite active status', 
            () => {
            expect(context.patchDeviceReading).toHaveBeenCalledWith({
                name: deviceReadingToPatch.name,
                active: !deviceReadingToPatch.active
            });
        });

        it(
            'when patchDeviceReading responds success sets device ' +
            'corresponding to rowAction enabled and toggles ' +
            'active status', 
            async () => {
            respondPatchSuccess();
            await 0;
            wrapper.update();
            expect(wrapper.find(Table).props().data).toEqual([
                { name: 'a', active: true, any: 'prop', disabled: false },
                { name: 'b', active: false, another: 'prop', disabled: false },
                { name: 'c', active: true, yet: 'another', disabled: false }
            ]);
            expect(wrapper.find(Counter).props()).toEqual({
                activeReadings: 2,
                inactiveReadings: 1
            });
        });

        it(
            'when patchDeviceReading responds failure sets device ' +
            'corresponding to rowAction enabled and does not ' +
            'toggles active status', 
            async () => {
            respondPatchFailure();
            await 0;
            wrapper.update();
            expect(wrapper.find(Table).props().data).toEqual([
                { name: 'a', active: true, any: 'prop', disabled: false },
                { name: 'b', active: true, another: 'prop', disabled: false },
                { name: 'c', active: true, yet: 'another', disabled: false }
            ]);
            expect(wrapper.find(Counter).props()).toEqual({
                activeReadings: 3,
                inactiveReadings: 0
            });
        });

    });

    describe('Search onChange', () => {

        beforeEach(async () => {
            await 0;
            respondGet(deviceReadings);     
            await 0;
            wrapper.update();
        });
        
        it('filters by name displayed devices in the Table', () => {
            wrapper.find(Search).props().onChange('a');
            wrapper.update();
            expect(wrapper.find(Table).props().data).toEqual([
                { name: 'a', active: true, any: 'prop', disabled: false }
            ]);
        });

    });

});