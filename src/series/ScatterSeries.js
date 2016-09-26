import React from 'react';

import defineSeries from './defineSeries';
import Noop from '../Noop';
import Symbols from '../shapes/Symbols';

const ScatterSeries = defineSeries(
    'ScatterSeries',
    <Noop />,
    <Symbols />,
    (x, y, xScale, yScale) => (datum, key) => ({
        datum,
        x: xScale(x(datum)),
        y: yScale(y(datum)),
        key
    })
);

export default ScatterSeries;
