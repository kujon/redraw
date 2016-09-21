import React from 'react';
import {action, storiesOf} from '@kadira/storybook';

import LineSeries from '../../src/series/LineSeries.js';

storiesOf('LineSeries', module)
    .addDecorator(story => <svg width={140} height={140}>{story()}</svg>)
    .add('Linear', () =>
        <LineSeries
            data={[{x: 20, y: 30}, {x: 45, y: 110}, {x: 70, y: 90}, {x: 95, y: 50}, {x: 120, y: 30}]}
            xScale={x => x}
            yScale={y => -y + 140}
            pointProps={{
                size: 90,
                stroke: '#85946C',
                fill: '#D2E1BA',
                onClick: action('clicked!')
            }}
            curveProps={{
                stroke: '#85946C'
            }} />
    );
