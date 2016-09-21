import React from 'react';
import {action, storiesOf} from '@kadira/storybook';

import Curve from '../../src/shapes/Curve.js';

storiesOf('Curve', module)
    .addDecorator(story => <svg width={100} height={100}>{story()}</svg>)
    .add('Linear', () =>
        <Curve
            points={[{x: 0, y: 10}, {x: 25, y: 90}, {x: 50, y: 70}, {x: 75, y: 30}, {x: 100, y: 10}]}
            stroke='#85946C'
            onClick={action('clicked!')} />);
