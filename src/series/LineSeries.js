import React from 'react';

import defineSeries from './defineSeries';
import Curve from '../shapes/Curve';
import Symbols from '../shapes/Symbols';

const LineSeries = defineSeries(
    'LineSeries',
    Curve,
    <Symbols />,
    (x, y, xScale, yScale) => (datum, key) => ({
        ...datum,
        x: xScale(x(datum)),
        y: yScale(y(datum)),
        key
    })
);

export default LineSeries;
