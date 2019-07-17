import React, { Component } from 'react';

import PropTypes from 'prop-types';

import removeUnwantedIndentation from './utils/removeUnwantedIndentation.js';

import './App.css';

class JsonCode extends Component {
    render() {
        const htmlProps = {
            style: this.props.style
        };

        const removeIndentation = this.props.removeIndentation;
        let textToShow = this.props.children;
        if (removeIndentation === 'auto') {
            textToShow = removeUnwantedIndentation(textToShow);
        }

        return(
            <textarea
                defaultValue={textToShow}
                {...htmlProps}
            ></textarea>
        );
    }
}
JsonCode.propTypes = {
    children: PropTypes.string,
    removeIndentation: PropTypes.string,
    style: PropTypes.object
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <JsonCode
                    style={{width: '500px', height: '300px'}}
                >{`{ "property": "Your JSON configuration goes here" }`}</JsonCode>

                <JsonCode
                    removeIndentation={'auto'}
                    style={{width: '500px', height: '300px'}}
                >
                    {`
                        {
                            "property": "Your JSON configuration goes here"
                        }
                    `}
                </JsonCode>
            </div>
        );
    }
}

export default App;
