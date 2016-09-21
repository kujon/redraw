import React, {PropTypes, PureComponent} from 'react';
import {symbol, symbolCircle, symbolCross, symbolDiamond, symbolSquare, symbolTriangle, symbolWye} from 'd3-shape';

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
        size: PropTypes.number.isRequired,
        cx: PropTypes.number.isRequired,
        cy: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['circle', 'cross', 'diamond', 'square', 'triangle', 'wye'])
    }
    static defaultProps = {
        type: 'circle'
    }
    get path() {
        const {size, type} = this.props;

        return symbol().type(SYMBOL_TYPE_MAP[type]).size(size)();
    }
    render() {
        const {cx, cy} = this.props;

        return <path
            d={this.path}
            transform={`translate(${cx}, ${cy})`}
            {...presentationalAttributes(this.props)}
            {...eventAttributes(this.props)} />;
    }
}

export default Symbols;
