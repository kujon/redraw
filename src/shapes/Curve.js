import React, {PropTypes, PureComponent} from 'react';
import {line, curveLinear} from 'd3-shape';

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
    get path() {
        const {points, type} = this.props;

        return line().x(d => d.x).y(d => d.y).curve(CURVE_TYPE_MAP[type])(points);
    }
    render() {
        return <path
            d={this.path}
            {...presentationalAttributes(this.props)}
            {...eventAttributes(this.props)} />;
    }
}

export default Curve;
