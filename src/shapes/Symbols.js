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
        cx: PropTypes.number,
        cy: PropTypes.number,
        size: PropTypes.number,
        type: PropTypes.oneOf(['circle', 'cross', 'diamond', 'square', 'triangle', 'wye'])
    }
    static defaultProps = {
        cx: 0,
        cy: 0,
        size: 100,
        type: 'circle'
    }
    getPath(size, type) {
        return symbol().type(SYMBOL_TYPE_MAP[type]).size(size)();
    }
    render() {
        const {cx, cy, size, type} = this.props;

        return <Motion
            style={{
                cy: spring(cy, {stiffness: 230, damping: 30})
            }}>
            {({cy}) =>
                <path
                    d={this.getPath(size, type)}
                    transform={`translate(${cx}, ${cy})`}
                    {...presentationalAttributes(this.props)}
                    {...eventAttributes(this.props)} />}
        </Motion>;
    }
}

export default Symbols;
