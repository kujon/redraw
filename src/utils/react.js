import {curry, find, keys, map, pick, test} from 'ramda';
import {Children, PropTypes} from 'react';

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

//           displayName :: Component -> String
export const displayName = Type => Type.displayName || Type.name || 'Component';

//           isSeriesChild :: ReactElement -> Boolean
export const isSeriesChild = child => test(/Series$/, child.type.displayName);

//           isAxisChild :: ReactElement -> Boolean
export const isAxisChild = child => test(/Axis$/, child.type.displayName);

//    findChildren :: (ReactElement -> Boolean) -> Children -> Children
const findChildren = curry((predicate, children) => {
    const found = [];

    Children.forEach(children, child => {
        if (predicate(child)) {
            found.push(child);
        }
    });

    return found;
});

//           findSeriesChildren :: Children -> Children
export const findSeriesChildren = findChildren(isSeriesChild);

//           findAxisChildren :: Children -> Children
export const findAxisChildren = findChildren(isAxisChild);

//           findAxisById :: String -> [ReactElement] -> ReactElement|undefined
export const findAxisById = curry((id, axes) => find(a => a.props.axisId === id, axes));
