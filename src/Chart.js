import React, {PropTypes, PureComponent} from 'react';
import {scaleLinear} from 'd3-scale';
import {addIndex, defaultTo, map, reduce} from 'ramda';

import Axis from './axis/Axis';
import {EVENT_ATTRIBUTES, eventAttributes, findAxisById, findAxisChildren, findSeriesChildren} from './utils/react';

//    mapIndexed :: (a -> Number -> b) -> [a] -> [b]
const mapIndexed = addIndex(map);

//    domain :: (a -> Number) -> [a] -> Number
const domain = (accessor, data) =>
    reduce(([min, max], d) => [Math.min(accessor(d), min), Math.max(accessor(d), max)], [Infinity, -Infinity], data);

//    scale :: String -> (Datum -> Number) -> Number -> Boolean -> [ReactElement] -> [Datum] -> (Number -> Number)
const scale = (axisId, value, length, inverted, axes, data) => {
    const axis = findAxisById(axisId, axes);
    const {props: {domain: [domainMin, domainMax]}} = axis ? axis : {props: Axis.defaultProps};
    const [dataDomainMin, dataDomainMax] = domain(value, data);
    const calculatedDomain = [defaultTo(dataDomainMin, domainMin), defaultTo(dataDomainMax, domainMax)];

    return scaleLinear().domain(calculatedDomain).range(inverted ? [length, 0] : [0, length]);
};

class Chart extends PureComponent {
    static propTypes = {
        ...EVENT_ATTRIBUTES,
        width: PropTypes.number,
        height: PropTypes.number
    }
    getScales() {
        const {children, height, width} = this.props;
        const series = findSeriesChildren(children);
        const axes = findAxisChildren(children);

        return map(s => {
            const {xAxisId, yAxisId, data, x, y} = s.props;
            const xScale = scale(xAxisId, x, width, false, axes, data);
            const yScale = scale(yAxisId, y, height, true, axes, data);

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
