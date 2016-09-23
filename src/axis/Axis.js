import React, {PropTypes, PureComponent} from 'react';
import {PRESENTATIONAL_ATTRIBUTES, presentationalAttributes} from '../utils/svg';

class Axis extends PureComponent {
    static displayName = 'Axis'
    static propTypes = {
        ...PRESENTATIONAL_ATTRIBUTES,
        orientation: PropTypes.oneOf(['x', 'y']).isRequired,
        axisId: PropTypes.string,
        domain: PropTypes.array,
        length: PropTypes.number,
        position: PropTypes.number,
        positionReferenceId: PropTypes.string,
        scale: PropTypes.func,
        thickness: PropTypes.number
    }
    static defaultProps = {
        axisId: '',
        domain: [null, null],
        length: 0,
        position: 0,
        positionReferenceId: '',
        scale: a => a,
        thickness: 1,
        fill: 'black'
    }
    render() {
        const {orientation, length, position, scale, thickness} = this.props;

        return <rect
            width={orientation === 'x' ? length : thickness}
            height={orientation === 'x' ? thickness : length}
            transform={orientation === 'x' ? `translate(0, ${scale(position)})` : `translate(${scale(position)}, 0)`}
            {...presentationalAttributes(this.props)} />;
    }
}

export default Axis;
