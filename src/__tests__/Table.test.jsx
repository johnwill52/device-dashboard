import React from 'react';
import { shallow } from 'enzyme';

import Table from '../Table';

describe('<Table />', () => {

    let wrapper;

    describe('when no data', () => {
        
        beforeEach(() => {
            wrapper = shallow(
                <Table 
                    data={[]} 
                    isRowDisabled={() => {}}
                    renderCell={{}}
                    rowAction={() => {}} 
                    tabIndexStart={0}
                />
            );
        });

        it('renders null', () => {
            expect(wrapper.html()).toBeNull();
        });
    
    });

    describe('when data', () => {

        const data = [
            { a: 11, b: 21 },
            { a: 12, b: 22 }
        ];
        const tabIndexStart = 2;

        let isRowDisabled;
        let rowAction;

        beforeEach(() => {
            isRowDisabled = jest.fn();
            rowAction = jest.fn();
            wrapper = shallow(
                <Table 
                    data={data} 
                    isRowDisabled={r => r.b === 21}
                    renderCell={{
                        a: r => <span>{r.a}</span> 
                    }}
                    rowAction={rowAction} 
                    tabIndexStart={tabIndexStart}
                />
            );
        });

        it('renders header', () => {
            expect(wrapper.childAt(0).html()).toBe(
                '<div class="th">' +
                    '<div class="tc a">a</div><div class="tc b">b</div>' +
                '</div>'
            );
        });
        
        it('renders body', () => {
            expect(wrapper.childAt(1).html()).toBe(
                '<div class="tb">' +
                    '<div class="tr disabled" tabindex="2">' +
                        '<div class="tc a"><span>11</span></div><div class="tc b">21</div>' +
                    '</div>' +
                    '<div class="tr" tabindex="3">' +
                        '<div class="tc a"><span>12</span></div><div class="tc b">22</div>' +
                    '</div>' +
                '</div>'
            );
        });
        
        it('on row click calls props rowAction', () => {
            wrapper.find('.tr').at(1).simulate('click');
            expect(rowAction).toHaveBeenCalledWith({
                a: 12, 
                b: 22
            });
        });

        it('when row focused on spacebar down calls props rowAction', () => {
            wrapper.find('.tr').at(1).simulate('keydown', { which: 32 });
            expect(rowAction).toHaveBeenCalledWith({
                a: 12, 
                b: 22
            });
        });
        
    });

});
