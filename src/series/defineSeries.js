import React, {PropTypes, PureComponent} from 'react';
import {addIndex, keys, map, pick} from 'ramda';

import {EVENT_ATTRIBUTES} from '../utils/react';
//    mapIndexed :: (a -> Number -> b) -> [a] -> [b]
const mapIndexed = addIndex(map);

const defineSeries = (name, curveElement, pointElement, toPoint) => class extends PureComponent {
    static displayName = name
    static propTypes = {
        ...EVENT_ATTRIBUTES,
        xAxisId: PropTypes.string,
        yAxisId: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        curveProps: PropTypes.object,
        pointElement: PropTypes.element,
        pointProps: PropTypes.object,
        x: PropTypes.func,
        y: PropTypes.func,
        xScale: PropTypes.func,
        yScale: PropTypes.func
    }
    static defaultProps = {
        xAxisId: '',
        yAxisId: '',
        curveProps: {},
        pointElement,
        pointProps: {},
        x: d => d.x,
        y: d => d.y,
        xScale: x => x,
        yScale: y => y
    }
    get points() {
        const {data, x, y, xScale, yScale} = this.props;

        return mapIndexed(toPoint(x, y, xScale, yScale), data);
    }
    renderPointItem = ({x, y, ...point}) => {
        const {pointElement, pointProps} = this.props;

        return React.cloneElement(pointElement, {
            ...point,
            ...pointProps,
            x,
            y,
            ...pick(keys(EVENT_ATTRIBUTES), this.props)
        });
    }
    renderPoints(points) {
        return map(this.renderPointItem, points);
    }
    renderCurve(points) {
        const {curveProps} = this.props;

        return React.cloneElement(curveElement, {...curveProps, points});
    }
    render() {
        const {points} = this;

        return <g>
            {this.renderCurve(points)}
            {this.renderPoints(points)}
        </g>;
    }
};

export default defineSeries;
