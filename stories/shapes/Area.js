import React from 'react';
import {action, storiesOf} from '@kadira/storybook';

import Area from '../../src/shapes/Area';

storiesOf('Area', module)
    .addDecorator(story => <svg width={100} height={100}>{story()}</svg>)
    .add('Linear', () =>
        <Area
            points={[
                {x0: 0, x1: 0, y0: 0, y1: 10},
                {x0: 25, x1: 25, y0: 0, y1: 90},
                {x0: 50, x1: 50, y0: 0, y1: 70},
                {x0: 75, x1: 75, y0: 0, y1: 30},
                {x0: 100, x1: 100, y0: 0, y1: 10}
            ]}
            fill='#D2E1BA'
            stroke='#85946C'
            onClick={action('clicked!')} />
    );
