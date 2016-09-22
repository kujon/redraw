import React, {Component} from 'react';
import {action, storiesOf} from '@kadira/storybook';

import LineSeries from '../../src/series/LineSeries';

const EmojiSymbol = ({x, y}) =>
    <text dominantBaseline='central' textAnchor='middle' transform={`translate(${x}, ${y})`}>😄</text>;

const data = [{x: 20, y: 30}, {x: 45, y: 110}, {x: 70, y: 90}, {x: 95, y: 50}, {x: 120, y: 30}];
const xScale = x => x;
const yScale = y => -y + 140;

const rand = (min, max) => Math.random() * (max - min) + min;

class StateOscilator extends Component {
    state = {
        data
    }
    componentWillMount() {
        this.interval = setInterval(() => {
            this.setState({
                data: this.state.data
                    .map(d => ({...d, y: rand(20, 120)}))
                    // .slice(0, Math.ceil(rand(this.state.data.length - 2, this.state.data.length)))
            });
        }, 1500);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return <LineSeries
            data={this.state.data}
            xScale={xScale}
            yScale={yScale}
            pointProps={{
                size: 90,
                stroke: '#85946C',
                fill: '#D2E1BA',
                onClick: action('clicked!')
            }}
            curveProps={{
                stroke: '#85946C'
            }} />;
    }
}

storiesOf('LineSeries', module)
    .addDecorator(story => <svg width={140} height={140}>{story()}</svg>)
    .add('Basic', () =>
        <LineSeries
            data={data}
            xScale={xScale}
            yScale={yScale}
            pointProps={{
                size: 90,
                stroke: '#85946C',
                fill: '#D2E1BA',
                onClick: action('clicked!')
            }}
            curveProps={{
                stroke: '#85946C'
            }} />
    )
    .add('Custom Points', () =>
        <LineSeries
            data={data}
            xScale={xScale}
            yScale={yScale}
            pointElement={<EmojiSymbol />}
            curveProps={{
                stroke: '#85946C'
            }} />)
    .add('Animated', () => <StateOscilator />);
