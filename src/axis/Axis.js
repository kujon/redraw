import {PropTypes, PureComponent} from 'react';

class Axis extends PureComponent {
    static displayName = 'Axis'
    static propTypes = {
        data: PropTypes.array,
        domain: PropTypes.array,
        length: PropTypes.number
    }
    static defaultProps = {
        data: [],
        domain: [null, null],
        length: 0
    }
    render() {
        return null;
    }
}

export default Axis;
