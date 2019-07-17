import React, { Component } from 'react';

import './App.css';

class JsonCode extends Component {
    render() {
        // console.log(this.props);
        // console.log(this);

        const htmlProps = {
            style: this.props.style
        };

        // window._this = this;
        return(
            <textarea
                defaultValue={this.props.children}
                {...htmlProps}
            ></textarea>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <div>TODO: headless-integration test generator</div>
                <JsonCode
                    removeIndentation={4}
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
