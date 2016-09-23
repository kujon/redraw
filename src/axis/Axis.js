import {PropTypes, PureComponent} from 'react';

class Axis extends PureComponent {
    static displayName = 'Axis'
    static propTypes = {
        orientation: PropTypes.oneOf(['x', 'y']).isRequired,
        axisId: PropTypes.string,
        data: PropTypes.array,
        domain: PropTypes.array,
        length: PropTypes.number
    }
    static defaultProps = {
        axisId: '',
        data: [],
        domain: [null, null],
        length: 0
    }
    render() {
        return null;
    }
}

export default Axis;
