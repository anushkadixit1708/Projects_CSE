import React, { Component } from 'react';

class UnAuthorized extends Component {
    render() {
        return (
            <div className="unAuthWrap">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100vw',
                        fontSize: '2rem',
                    }}
                >
                        Connect using your Metamask wallet
                </div>
            </div>
        );
    }
}

export default UnAuthorized;