import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import UnAuthorized from "./Components/UnAuthorized";
import getWeb3 from "./getWeb3";
import User from './contracts/User.json';
import "./App.css";
import Dashboard from "./Components/Dashboard";

class App extends Component {
  state = { storageValue: 0, web3: null, activeSession: false, accounts: null, contract: null, users: [], totalSupply: 0, verifiedAccounts: ['0x3f4db256F8893ecd8E944B1831c87d4e53801b33'] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });
    this.setState({activeSession: true});

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    console.log(response);

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  // Mint the wallet address as nft on sign up
  mint = (user) => {
    console.log(this.state.contract)
    this.state.contract.methods.mint(user).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        users: [...this.state.users, user]
      })
    })
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    let board
    if(!this.state.activeSession) 
      board= <UnAuthorized />
      // board= <Dashboard account={this.state.accounts[0]}/>
    
    else {
      console.log(this.state.accounts[0]);
      // this.mint(0x509B71455BA8701e4Ee28fDa9EE7Ca7Cf051d988);

      board= <Dashboard address={this.state.accounts[0]} verifiedAccounts={this.state.verifiedAccounts}/>
    }

    return (
      <div className="App"
        style={{
          backgroundColor: '#302E2C',
          fontWeight: '700',
          color: 'white'
        }}
      >
        {board}
      </div>
    );
  }
}

export default App;
