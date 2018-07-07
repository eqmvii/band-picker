import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var element = document.getElementById("react-data-username");
console.log(element.dataset.name);
//     <span id="react-data-username" data-name="Eric"></span>

ReactDOM.render(<App user="Eric"/>, document.getElementById('root'));
// registerServiceWorker();
