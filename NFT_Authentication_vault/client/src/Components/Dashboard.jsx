import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        console.log(this.props.verifiedAccounts);
        if(this.props.verifiedAccounts.includes(this.props.address))
        {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100vw',
                        fontSize: '2rem',
                        flexDirection: 'column'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50px',
                            right: '50px',
                            padding: '10px 20px',
                            backgroundColor: '#121212',
                            fontSize: '1rem',
                            fontWeight: '500',
                            borderRadius: '10px',
                            cursor: 'pointer'
                        }}
                        onClick={() => window.location.reload(false)}
                    >
                        Log Out
                    </div>
                    <span>
                        Logged In Successfully!
                    </span>
                    <span
                        style={{
                            fontSize: '1rem',
                            opacity: '0.5',
                            marginTop: '15px'
                        }}
                    >
                        Wallet Address: {this.props.address}
                    </span>
                </div>
            );
        }
        else {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100vw',
                        fontSize: '2rem',
                        flexDirection: 'column'
                    }}
                >
                    <span>
                        Login Failed!
                    </span>
                    <span
                        style={{
                            fontSize: '1rem',
                            opacity: '0.5',
                            marginTop: '15px'
                        }}
                    >
                        NFT not found for Wallet Address: {this.props.address}
                    </span>
                </div>
                );
        }
    }
}

export default Dashboard;