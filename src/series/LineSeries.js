import defineSeries from './defineSeries';
import Curve from '../shapes/Curve';

const LineSeries = defineSeries(
    'LineSeries',
    Curve,
    (x, y, xScale, yScale) => (datum, key) => ({
        ...datum,
        x: xScale(x(datum)),
        y: yScale(y(datum)),
        key
    }));

export default LineSeries;
