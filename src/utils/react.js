import {keys, map, pick} from 'ramda';
import {PropTypes} from 'react';

const EVENT_ATTRIBUTES = {
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
};

//           eventAttributes :: Props -> Props
export const eventAttributes = props => map(handler => evt => handler(props, evt), pick(keys(EVENT_ATTRIBUTES), props));
