import defineSeries from './defineSeries';
import Area from '../shapes/Area';

const AreaSeries = defineSeries(
    'AreaSeries',
    Area,
    (x, y, xScale, yScale) => (datum, key) => ({
        ...datum,
        x: xScale(x(datum)),
        x0: xScale(x(datum)),
        x1: xScale(x(datum)),
        y: yScale(y(datum)),
        y0: yScale(0),
        y1: yScale(y(datum)),
        key
    })
);

export default AreaSeries;
