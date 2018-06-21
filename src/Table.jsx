import React from 'react';
import PropTypes from 'prop-types';

function Table({ data, isRowDisabled, rowAction, renderCell, tabIndexStart }) {
    if (data.length === 0)
        return null;

    const columns = Object.keys(data[0]).filter(column => column !== "disabled");

    return (
        <div className="t">
            <div className="th">
                { 
                    columns.map(column => 
                        <div key={column} className={`tc ${column}`}>{ column }</div>
                    ) 
                }
            </div>
            <div className="tb">
                {
                    data.map((record, index) =>
                        <div 
                            key={index} 
                            className={`tr${isRowDisabled(record) ? ' disabled' : ''}`}
                            onClick={() => rowAction(record)}
                            onKeyDown={e => e.which === 32 && rowAction(record)}
                            tabIndex={tabIndexStart + index}
                        >
                            {
                                columns.map(column => 
                                    <div 
                                        key={column} 
                                        className={`tc ${column}`}
                                    >
                                        { renderCell[column]
                                            ? renderCell[column](record)
                                            : record[column] }
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    isRowDisabled: PropTypes.func.isRequired,
    renderCell: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    rowAction: PropTypes.func.isRequired,
    tabIndexStart: PropTypes.number.isRequired,
};

export default Table;