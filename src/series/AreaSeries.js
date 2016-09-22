import React, {PropTypes, PureComponent} from 'react';
import {addIndex, map} from 'ramda';

import Area from '../shapes/Area';
import Symbols from '../shapes/Symbols';

//    mapIndexed :: Functor f => (a -> Number -> b) -> f a -> f b
const mapIndexed = addIndex(map);

class AreaSeries extends PureComponent {
    static displayName = 'AreaSeries'
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        areaProps: PropTypes.object,
        pointElement: PropTypes.element,
        pointProps: PropTypes.object,
        x: PropTypes.func,
        y: PropTypes.func,
        xScale: PropTypes.func,
        yScale: PropTypes.func
    }
    static defaultProps = {
        areaProps: {},
        pointElement: <Symbols />,
        pointProps: {},
        x: d => d.x,
        y: d => d.y,
        xScale: x => x,
        yScale: y => y
    }
    get points() {
        const {data, x, y, xScale, yScale} = this.props;

        return mapIndexed((datum, key) => ({
            ...datum,
            x0: xScale(x(datum)),
            x1: xScale(x(datum)),
            y0: yScale(0),
            y1: yScale(y(datum)),
            key
        }), data);
    }
    renderPointItem = ({x1, y1, ...point}) => {
        const {pointElement, pointProps} = this.props;

        return React.cloneElement(pointElement, {...point, ...pointProps, cx: x1, cy: y1});
    }
    renderPoints(points) {
        return map(this.renderPointItem, points);
    }
    renderCurve(points) {
        const {areaProps} = this.props;

        return <Area
            {...areaProps}
            points={points} />;
    }
    render() {
        return <g>
            {this.renderCurve(this.points)}
            {this.renderPoints(this.points)}
        </g>;
    }
}

export default AreaSeries;
