import {Component} from 'react';

class NoopComponent extends Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return null;
    }
}

export default NoopComponent;
