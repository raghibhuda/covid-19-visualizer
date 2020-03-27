import React from 'react';
import ReactDOM from 'react-dom';
import "@elastic/eui/dist/eui_theme_light.css";
import './index.css';
import CovidVisualizer from "./container/Main";

class App extends React.Component {
    render() {
        return (
            <CovidVisualizer/>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
