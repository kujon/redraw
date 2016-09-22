import React, {PropTypes, PureComponent} from 'react';
import {line, curveLinear} from 'd3-shape';
// import {Motion, spring} from 'react-motion';

import {EVENT_ATTRIBUTES, eventAttributes} from '../utils/react';
import {PRESENTATIONAL_ATTRIBUTES, presentationalAttributes} from '../utils/svg';

const CURVE_TYPE_MAP = {
    linear: curveLinear
};

class Curve extends PureComponent {
    static propTypes = {
        ...EVENT_ATTRIBUTES,
        ...PRESENTATIONAL_ATTRIBUTES,
        points: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })).isRequired,
        type: PropTypes.oneOf(['linear'])
    }
    static defaultProps = {
        type: 'linear',
        fill: 'none',
        stroke: 'black'
    }
    getPath(points, type) {
        return line().x(d => d.x).y(d => d.y).curve(CURVE_TYPE_MAP[type])(points);
    }
    render() {
        const {points, type} = this.props;

        return <path
            d={this.getPath(points, type)}
            {...presentationalAttributes(this.props)}
            {...eventAttributes(this.props)} />;
    }
}

export default Curve;
