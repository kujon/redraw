import React, {Component} from 'react';
import {storiesOf} from '@kadira/storybook';

import AreaSeries from '../src/series/AreaSeries';
import Axis from '../src/axis/Axis';
import BarSeries from '../src/series/BarSeries';
import Chart from '../src/Chart';
import LineSeries from '../src/series/LineSeries';

const data = [{x: 20, y: 30}, {x: 45, y: 110}, {x: 70, y: 90}, {x: 95, y: 50}, {x: 120, y: 30}];
const data01 = [{x: 20, y: 30}, {x: 45, y: 40}, {x: 70, y: 50}, {x: 95, y: 45}, {x: 120, y: 50}];

const rand = (min, max) => Math.random() * (max - min) + min;

class StateOscilator extends Component {
    state = {
        data,
        data01
    }
    componentWillMount() {
        this.interval = setInterval(() => {
            this.setState({
                data: this.state.data
                    .map(d => ({...d, y: rand(20, 120)})),
                data01: this.state.data01
                    .map(d => ({...d, y: rand(20, 120)}))
            });
        }, 1500);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return <Chart width={400} height={400}>
            <Axis orientation='x' domain={[-100, 200]} positionReferenceId='wide' />
            <Axis orientation='y' domain={[-200, 200]} axisId='wide' position={-50} />
            <Axis orientation='y' axisId='auto' />
            <AreaSeries
                pointProps={{
                    size: 50,
                    stroke: '#895D94',
                    fill: '#D9BAE1'
                }}
                curveProps={{
                    stroke: '#895D94',
                    fill: '#D9BAE1'
                }}
                yAxisId='wide'
                data={this.state.data01} />
            <LineSeries
                pointProps={{
                    size: 50,
                    stroke: '#85946C',
                    fill: '#D2E1BA'
                }}
                curveProps={{
                    stroke: '#85946C'
                }}
                yAxisId='wide'
                data={this.state.data} />
            <BarSeries
                pointProps={{
                    fill: '#63666B'
                }}
                yAxisId='auto'
                data={this.state.data01} />
        </Chart>;
    }
}

storiesOf('Chart', module)
    .add('Basic', () =>
        <Chart width={400} height={400}>
            <AreaSeries
                pointProps={{
                    size: 50,
                    stroke: '#895D94',
                    fill: '#D9BAE1'
                }}
                curveProps={{
                    stroke: '#895D94',
                    fill: '#D9BAE1'
                }}
                data={data01}
                 />
            <LineSeries
                pointProps={{
                    size: 50,
                    stroke: '#85946C',
                    fill: '#D2E1BA'
                }}
                curveProps={{
                    stroke: '#85946C'
                }}
                data={data} />
            <BarSeries
                pointProps={{
                    fill: '#63666B'
                }}
                data={data01} />
        </Chart>
    )
    .add('All the goodness', () => <StateOscilator />);
