import React from 'react';

import defineSeries from './defineSeries';
import Noop from '../Noop';
import Rectangle from '../shapes/Rectangle';

// FIXME: Configure width!!!

const BarSeries = defineSeries(
    'BarSeries',
    <Noop />,
    <Rectangle width={10} />,
    (x, y, xScale, yScale) => (datum, key) => {
        const yValue = yScale(y(datum));
        const height = Math.abs(yScale(0) - yValue);

        return {
            datum,
            x: xScale(x(datum)) - 5,
            y: yValue,
            height,
            key
        };
    }
);

export default BarSeries;
