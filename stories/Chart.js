import React from 'react';
import {storiesOf} from '@kadira/storybook';

import AreaSeries from '../src/series/AreaSeries';
import Chart from '../src/Chart';
import LineSeries from '../src/series/LineSeries';

const data = [{x: 20, y: 30}, {x: 45, y: 110}, {x: 70, y: 90}, {x: 95, y: 50}, {x: 120, y: 30}];
const data01 = [{x: 20, y: 30}, {x: 45, y: 40}, {x: 70, y: 50}, {x: 95, y: 45}, {x: 120, y: 50}];

storiesOf('Chart', module)
    .add('Basic', () =>
        <Chart width={400} height={400}>
            <AreaSeries
                pointProps={{
                    size: 50,
                    stroke: '#895D94',
                    fill: '#D9BAE1'
                }}
                areaProps={{
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
        </Chart>
    );
