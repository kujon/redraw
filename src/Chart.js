import React, {PropTypes, PureComponent} from 'react';
import {scaleLinear} from 'd3-scale';
import {addIndex, map, reduce} from 'ramda';

import {EVENT_ATTRIBUTES, eventAttributes, findSeriesChildren} from './utils/react';

//    mapIndexed :: Functor f => (a -> Number -> b) -> f a -> f b
const mapIndexed = addIndex(map);

//    domain :: (a -> Number) -> [a] -> Number
const domain = (accessor, data) =>
    reduce(([min, max], d) => [Math.min(accessor(d), min), Math.max(accessor(d), max)], [Infinity, -Infinity], data);

class Chart extends PureComponent {
    static propTypes = {
        ...EVENT_ATTRIBUTES,
        width: PropTypes.number,
        height: PropTypes.number
    }
    getScales() {
        const {children, height, width} = this.props;
        const series = findSeriesChildren(children);

        return map(s => {
            const {data, x, y} = s.props;
            const xDomain = domain(x, data);
            const yDomain = domain(y, data);
            const xScale = scaleLinear().domain(xDomain).range([0, width]);
            const yScale = scaleLinear().domain(yDomain).range([height, 0]);

            return [xScale, yScale];
        }, series);
    }
    renderSeries() {
        const {children} = this.props;
        const series = findSeriesChildren(children);
        const scales = this.getScales();

        return mapIndexed((s, key) => {
            const [xScale, yScale] = scales[key];

            return React.cloneElement(s, {xScale, yScale, key});
        }, series);
    }
    render() {
        const {height, width} = this.props;

        return <svg
            {...eventAttributes(this.props)}
            width={width}
            height={height}>
            <g>{this.renderSeries()}</g>
        </svg>;
    }
}

export default Chart;
