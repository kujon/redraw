import React from 'react';
import {action, storiesOf} from '@kadira/storybook';

import Rectangle from '../../src/shapes/Rectangle';

storiesOf('Rectangle', module)
    .addDecorator(story => <svg width={100} height={100}>{story()}</svg>)
    .add('Basic', () =>
        <Rectangle x={10} y={10} width={80} height={80} fill='#D2E1BA' stroke='#85946C'
        onClick={action('clicked!')} />);
