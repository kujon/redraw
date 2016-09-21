import React, {PropTypes, PureComponent} from 'react';
import {addIndex, map} from 'ramda';

import Curve from '../shapes/Curve';
import Symbols from '../shapes/Symbols';

//    mapIndexed :: Fuctor f => (a -> Number -> b) -> f a -> f b
const mapIndexed = addIndex(map);

class LineSeries extends PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        xScale: PropTypes.func.isRequired,
        yScale: PropTypes.func.isRequired,
        pointElement: PropTypes.element,
        curveProps: PropTypes.object,
        pointProps: PropTypes.object,
        x: PropTypes.func,
        y: PropTypes.func
    }
    static defaultProps = {
        pointElement: <Symbols cx={0} cy={0} size={100} />,
        x: d => d.x,
        y: d => d.y
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
            {this.renderPoints(this.points)}
            {this.renderCurve(this.points)}
        </g>;
    }
}

export default LineSeries;
