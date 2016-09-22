import React, {PropTypes, PureComponent} from 'react';
import {symbol, symbolCircle, symbolCross, symbolDiamond, symbolSquare, symbolTriangle, symbolWye} from 'd3-shape';
import {Motion, spring} from 'react-motion';

import {EVENT_ATTRIBUTES, eventAttributes} from '../utils/react';
import {PRESENTATIONAL_ATTRIBUTES, presentationalAttributes} from '../utils/svg';

const SYMBOL_TYPE_MAP = {
    circle: symbolCircle,
    cross: symbolCross,
    diamond: symbolDiamond,
    square: symbolSquare,
    triangle: symbolTriangle,
    wye: symbolWye
};

class Symbols extends PureComponent {
    static propTypes = {
        ...EVENT_ATTRIBUTES,
        ...PRESENTATIONAL_ATTRIBUTES,
        x: PropTypes.number,
        y: PropTypes.number,
        size: PropTypes.number,
        type: PropTypes.oneOf(['circle', 'cross', 'diamond', 'square', 'triangle', 'wye'])
    }
    static defaultProps = {
        x: 0,
        y: 0,
        size: 100,
        type: 'circle'
    }
    getPath(size, type) {
        return symbol().type(SYMBOL_TYPE_MAP[type]).size(size)();
    }
    render() {
        const {x, y, size, type} = this.props;

        return <Motion
            style={{
                y: spring(y, {stiffness: 230, damping: 30})
            }}>
            {({y}) =>
                <path
                    d={this.getPath(size, type)}
                    transform={`translate(${x}, ${y})`}
                    {...presentationalAttributes(this.props)}
                    {...eventAttributes(this.props)} />}
        </Motion>;
    }
}

export default Symbols;
