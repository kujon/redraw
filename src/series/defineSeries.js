import React, {PropTypes, PureComponent} from 'react';
import {addIndex, map} from 'ramda';
import Symbols from '../shapes/Symbols';

//    mapIndexed :: Functor f => (a -> Number -> b) -> f a -> f b
const mapIndexed = addIndex(map);

const defineSeries = (name, CurveShape, toPoint) => class extends PureComponent {
    static displayName = name
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

        return mapIndexed(toPoint(x, y, xScale, yScale), data);
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

        return <CurveShape
            {...curveProps}
            points={points} />;
    }
    render() {
        return <g>
            {this.renderCurve(this.points)}
            {this.renderPoints(this.points)}
        </g>;
    }
};

export default defineSeries;
