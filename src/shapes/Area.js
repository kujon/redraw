import React, {PropTypes, PureComponent} from 'react';
import {area, curveLinear} from 'd3-shape';
// import {Motion, spring} from 'react-motion';

import {EVENT_ATTRIBUTES, eventAttributes} from '../utils/react';
import {PRESENTATIONAL_ATTRIBUTES, presentationalAttributes} from '../utils/svg';

const CURVE_TYPE_MAP = {
    linear: curveLinear
};

class Area extends PureComponent {
    static propTypes = {
        ...EVENT_ATTRIBUTES,
        ...PRESENTATIONAL_ATTRIBUTES,
        points: PropTypes.arrayOf(PropTypes.shape({
            x0: PropTypes.number,
            x1: PropTypes.number,
            y0: PropTypes.number,
            y1: PropTypes.number
        })).isRequired,
        type: PropTypes.oneOf(['linear'])
    }
    static defaultProps = {
        type: 'linear',
        fill: 'black',
        stroke: 'black'
    }
    getPath(points, type) {
        return area()
            .x0(d => d.x0)
            .x1(d => d.x1)
            .y0(d => d.y0)
            .y1(d => d.y1).curve(CURVE_TYPE_MAP[type])(points);
    }
    render() {
        const {points, type} = this.props;

        return <path
            d={this.getPath(points, type)}
            {...presentationalAttributes(this.props)}
            {...eventAttributes(this.props)} />;
    }
}

export default Area;
