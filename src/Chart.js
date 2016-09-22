import React, {PropTypes, PureComponent} from 'react';
import {addIndex, map} from 'ramda';

import {EVENT_ATTRIBUTES, eventAttributes, findSeriesChildren} from './utils/react';

//    mapIndexed :: Fuctor f => (a -> Number -> b) -> f a -> f b
const mapIndexed = addIndex(map);

class Chart extends PureComponent {
    static propTypes = {
        ...EVENT_ATTRIBUTES,
        width: PropTypes.number,
        height: PropTypes.number
    }
    renderSeries() {
        const {children} = this.props;
        const series = findSeriesChildren(children);

        return mapIndexed(
            (s, i) => React.cloneElement(s, {xScale: x => x, yScale: y => -y + 140, key: i}),
            series
        );
    }
    render() {
        const {height, width} = this.props;

        return <svg
            {...eventAttributes(this.props)}
            width={width}
            height={height}>
            <g>{this.renderSeries()}</g>
        </svg>;
    }
}

export default Chart;
