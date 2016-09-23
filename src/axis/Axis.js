import React, {PropTypes, PureComponent} from 'react';
import {PRESENTATIONAL_ATTRIBUTES, presentationalAttributes} from '../utils/svg';

class Axis extends PureComponent {
    static displayName = 'Axis'
    static propTypes = {
        ...PRESENTATIONAL_ATTRIBUTES,
        orientation: PropTypes.oneOf(['x', 'y']).isRequired,
        axisId: PropTypes.string,
        data: PropTypes.array,
        domain: PropTypes.array,
        length: PropTypes.number,
        thickness: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number
    }
    static defaultProps = {
        axisId: '',
        data: [],
        domain: [null, null],
        length: 0,
        thickness: 1,
        fill: 'black',
        x: 0,
        y: 0
    }
    render() {
        const {orientation, length, thickness, x, y} = this.props;

        return <rect
            width={orientation === 'x' ? length : thickness}
            height={orientation === 'x' ? thickness : length}
            transform={`translate(${x}, ${y})`}
            {...presentationalAttributes(this.props)} />;
    }
}

export default Axis;
