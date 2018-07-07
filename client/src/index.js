import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var element = document.getElementById("react-data-username");
var username = element.dataset.name;
console.log(element.dataset.name);
//     <span id="react-data-username" data-name="Eric"></span>

ReactDOM.render(<App username={username}/>, document.getElementById('root'));
// registerServiceWorker();
