import React, {PropTypes, PureComponent} from 'react';
import {scaleLinear} from 'd3-scale';
import {addIndex, compose, defaultTo, fromPairs, map, reduce, toPairs} from 'ramda';

import Axis from './axis/Axis';
import {
    EVENT_ATTRIBUTES, eventAttributes, findAxisById, findAxisChildren, findSeriesChildren, groupByProp
} from './utils/react';

//    mapIndexed :: (a -> Number -> b) -> [a] -> [b]
const mapIndexed = addIndex(map);

//    domain :: (a -> Number) -> [a] -> Number
const domain = (accessor, data) =>
    reduce(([min, max], d) => [Math.min(accessor(d), min), Math.max(accessor(d), max)], [Infinity, -Infinity], data);

const combineDomains = domains =>
    reduce(([min, max], [dMin, dMax]) => [Math.min(dMin, min), Math.max(dMax, max)], [Infinity, -Infinity], domains);

//    scales :: x|y -> Number -> Boolean -> [ReactElement] -> {String :: [ReactElement]} ->
//              {String :: {axis :: ReactElement, scale :: (Number -> Number)}}
const scales = (type, length, inverted, axes, groupedSeries) => fromPairs(map(([id, series]) => {
    const axis = findAxisById(type, id, axes);
    const {props: {domain: [domainMin, domainMax]}} = axis ? axis : {props: Axis.defaultProps};
    const dataDomains = map(s => domain(s.props[type], s.props.data), series);
    const [dataDomainMin, dataDomainMax] = combineDomains(dataDomains);
    const calculatedDomain = [defaultTo(dataDomainMin, domainMin), defaultTo(dataDomainMax, domainMax)];
    const scale = scaleLinear().domain(calculatedDomain).range(inverted ? [length, 0] : [0, length]).nice();

    return [id, {axis, scale}];
}, groupedSeries));

//    groupSeries :: String -> [ReactElement] -> {String :: [ReactElement]}
const groupSeries = compose(toPairs, groupByProp);

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
        const groupedSeriesX = groupSeries('xAxisId', series);
        const groupedSeriesY = groupSeries('yAxisId', series);

        const xScales = scales('x', width, false, axes, groupedSeriesX);
        const yScales = scales('y', height, true, axes, groupedSeriesY);

        return {xScales, yScales};
    }
    renderSeries() {
        const {children} = this.props;
        const series = findSeriesChildren(children);
        const {xScales, yScales} = this.getScales();

        return mapIndexed((s, key) => {
            const {xAxisId, yAxisId} = s.props;
            const xScale = xScales[xAxisId].scale;
            const yScale = yScales[yAxisId].scale;

            return React.cloneElement(s, {xScale, yScale, key});
        }, series);
    }
    renderAxes() {
        const {children, height, width} = this.props;
        const axes = findAxisChildren(children);
        const {xScales, yScales} = this.getScales();

        return mapIndexed((a, key) =>
            React.cloneElement(a, {
                length: a.props.orientation === 'x' ? width : height,
                scale: a.props.orientation === 'x' ?
                    xScales[a.props.axisId].scale :
                    yScales[a.props.axisId].scale,
                referenceScale: a.props.orientation === 'x' ?
                    yScales[a.props.positionReferenceId].scale :
                    xScales[a.props.positionReferenceId].scale,
                key
            }),
        axes);
    }
    render() {
        const {height, width} = this.props;

        return <svg
            {...eventAttributes(this.props)}
            width={width}
            height={height}>
            <g>{this.renderSeries()}</g>
            <g>{this.renderAxes()}</g>
        </svg>;
    }
}

export default Chart;
