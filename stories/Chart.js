import React from 'react';
import {storiesOf} from '@kadira/storybook';

import Chart from '../src/Chart.js';
import LineSeries from '../src/series/LineSeries.js';

const data = [{x: 20, y: 30}, {x: 45, y: 110}, {x: 70, y: 90}, {x: 95, y: 50}, {x: 120, y: 30}];

storiesOf('Chart', module)
    .add('Basic', () =>
        <Chart width={140} height={140}>
            <LineSeries
                data={data} />
        </Chart>
    );
