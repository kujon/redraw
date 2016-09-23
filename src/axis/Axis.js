import React, {PropTypes, PureComponent} from 'react';
import {identity, map} from 'ramda';

import Rectangle from '../shapes/Rectangle';
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
        referenceScale: PropTypes.func,
        scale: PropTypes.func,
        thickness: PropTypes.number,
        tickCount: PropTypes.number,
        tickElement: PropTypes.element
    }
    static defaultProps = {
        axisId: '',
        domain: [null, null],
        fill: 'black',
        length: 0,
        position: 0,
        positionReferenceId: '',
        referenceScale: identity,
        scale: identity,
        thickness: 1,
        tickCount: 5,
        tickElement: <Rectangle width={4} height={4} />
    }
    renderTicks() {
        const {orientation, scale, tickCount, tickElement} = this.props;

        return map(t =>
            React.cloneElement(tickElement, {
                x: orientation === 'x' ? scale(t) : 0,
                y: orientation === 'y' ? scale(t) : 0
            }),
        scale.ticks(tickCount));
    }
    render() {
        const {orientation, length, position, referenceScale, thickness} = this.props;

        return <g
            transform={orientation === 'x' ?
                `translate(0, ${referenceScale(position)})` :
                `translate(${referenceScale(position)}, 0)`}>
            <g>{this.renderTicks()}</g>
            <g>
                <rect
                    width={orientation === 'x' ? length : thickness}
                    height={orientation === 'x' ? thickness : length}
                    {...presentationalAttributes(this.props)} />
            </g>
        </g>;
    }
}

export default Axis;
