import React, {PropTypes, PureComponent} from 'react';
import {Motion, spring} from 'react-motion';

import {EVENT_ATTRIBUTES, eventAttributes} from '../utils/react';
import {PRESENTATIONAL_ATTRIBUTES, presentationalAttributes} from '../utils/svg';

class Rectangle extends PureComponent {
    static propTypes = {
        ...EVENT_ATTRIBUTES,
        ...PRESENTATIONAL_ATTRIBUTES,
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number
    }
    static defaultProps = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }
    render() {
        const {x, y, width, height} = this.props;

        return <Motion
            style={{
                width: spring(width, {stiffness: 230, damping: 30}),
                height: spring(height, {stiffness: 230, damping: 30})
            }}>
            {({width, height}) =>
                <rect
                    width={width}
                    height={height}
                    transform={`translate(${x}, ${y})`}
                    {...presentationalAttributes(this.props)}
                    {...eventAttributes(this.props)} />}
        </Motion>;
    }
}

export default Rectangle;
