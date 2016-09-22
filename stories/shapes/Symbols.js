import React from 'react';
import {action, storiesOf} from '@kadira/storybook';

import Symbols from '../../src/shapes/Symbols';

storiesOf('Symbols', module)
    .addDecorator(story => <svg width={100} height={100}>{story()}</svg>)
    .add('Circle', () =>
        <Symbols
            cx={50} cy={50} size={100} fill='#D2E1BA' stroke='#85946C' onClick={action('clicked!')} />)
    .add('Cross', () =>
        <Symbols
            type='cross' cx={50} cy={50} size={100} fill='#D2E1BA' stroke='#85946C' onClick={action('clicked!')} />)
    .add('Diamond', () =>
        <Symbols
            type='diamond' cx={50} cy={50} size={100} fill='#D2E1BA' stroke='#85946C' onClick={action('clicked!')} />)
    .add('Square', () =>
        <Symbols
            type='square' cx={50} cy={50} size={100} fill='#D2E1BA' stroke='#85946C' onClick={action('clicked!')} />)
    .add('Triangle', () =>
        <Symbols
            type='triangle' cx={50} cy={50} size={100} fill='#D2E1BA' stroke='#85946C' onClick={action('clicked!')} />)
    .add('Wye', () =>
        <Symbols
            type='wye' cx={50} cy={50} size={100} fill='#D2E1BA' stroke='#85946C' onClick={action('clicked!')} />);
