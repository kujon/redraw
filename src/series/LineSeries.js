import React, {PropTypes, PureComponent} from 'react';
import {addIndex, map} from 'ramda';

import Curve from '../shapes/Curve';
import Symbols from '../shapes/Symbols';

//    mapIndexed :: Functor f => (a -> Number -> b) -> f a -> f b
const mapIndexed = addIndex(map);

class LineSeries extends PureComponent {
    static displayName = 'LineSeries'
    static propTypes = {
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
        curveProps: {},
        pointElement: <Symbols />,
        pointProps: {},
        x: d => d.x,
        y: d => d.y,
        xScale: x => x,
        yScale: y => y
    }
    get points() {
        const {data, x, y, xScale, yScale} = this.props;

        return mapIndexed((datum, key) => ({...datum, x: xScale(x(datum)), y: yScale(y(datum)), key}), data);
    }
    renderPointItem = ({x, y, ...point}) => {
        const {pointElement, pointProps} = this.props;

        return React.cloneElement(pointElement, {...point, ...pointProps, cx: x, cy: y});
    }
    renderPoints(points) {
        return map(this.renderPointItem, points);
    }
    renderCurve(points) {
        const {curveProps} = this.props;

        return <Curve
            {...curveProps}
            points={points} />;
    }
    render() {
        return <g>
            {this.renderCurve(this.points)}
            {this.renderPoints(this.points)}
        </g>;
    }
}

export default LineSeries;
