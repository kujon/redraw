import {keys, pick} from 'ramda';
import {PropTypes} from 'react';

const PRESENTATIONAL_ATTRIBUTES = {
    fill: PropTypes.string,
    stroke: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    opacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object
};

//           presentationalAttributes :: Props -> Props
export const presentationalAttributes = pick(keys(PRESENTATIONAL_ATTRIBUTES));
