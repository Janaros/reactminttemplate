import React, { useEffect, useState } from 'react';
import { GridItem, Grid, Image, Flex, Center, Text, Square, useDisclosure } from "@chakra-ui/react";
import { ethers } from 'ethers';
import './App.css';

import { CONTRACT_ADDRESS, NFT_IMAGE_URL, BASE_CONTRACT } from './constants';
import contractABI from './utils/ImageNft.json';

const App = () => {
    // State
    const [currentAccount, setCurrentAccount] = useState(null);
    const [theContract, setContract] = useState(null);

    // Actions
    const installMetamskAction = () => {
        window.open("https://metamask.io/");
    }
  
    const openEtherScanAction = () => {
        window.open("https://rinkeby.etherscan.io/address/" + BASE_CONTRACT);
    }

    const mintNftAction = () => async () => {
        try {
            if (theContract) {
                console.log('Minting NFT in progress...');
                
                var tokenUri = NFT_IMAGE_URL;

                var tokenName = 'TestToken';
                var tokenDescription = 'This is a nice token';


                const mintTxn = await theContract;

                var test2 = mintTxn.mint(tokenName, tokenDescription, tokenUri).then(result => {
                    console.log(result);

                });

            }
        } catch (error) {
            console.warn('MintCharacterAction Error:', error);
        }
    };
    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log('Make sure you have MetaMask!');
                return;
            } else {
                console.log('We have the ethereum object', ethereum);

                const accounts = await ethereum.request({ method: 'eth_accounts' });

                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log('Found an authorized account:', account);
                    setCurrentAccount(account);
                } else {
                    console.log('No authorized account found');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Render Methods
    const renderMintButton = () => {
        if (currentAccount) {
            return (

                <button
                    type="button"
                    className="mint-button"
                    onClick={mintNftAction()}
                >Mint </button>
            )
        }
    }
    const renderLoginButton = () => {

        const { ethereum } = window;

        if (!currentAccount) {
            if (!ethereum) {
                return (<div className="connect-wallet-container">
                    <button
                        className="connect-wallet-button"
                        onClick={installMetamskAction}
                    >
                        Install Metamask
                    </button>
                </div>)
            } else {
                return (
                    <div className="connect-wallet-container">
                        <button
                            className="connect-wallet-button"
                            onClick={connectWalletAction}
                        >
                            Connect
                        </button>
                    </div>
                );
            }

        } else if (currentAccount) {
            return (
                <div className="connect-wallet-container">

                </div>
            );
         
        }
    };
    const renderNftImage = () => {
        return (
            <img
                src='https://arweave.net/XNHzamgzyZ5Liga535HaZvsJYpzq3J_qbawsvvsAPlk'
                width='50%'
                alt='SWMS' />

        );
    };
    const renderNftData = () => {
        return (
            <div>
                <h1>SWMS //</h1>
                <div className="attributelist">
                    <Grid border="1" templateColumns='repeat(2, 1fr)' gap={6}>
                        <GridItem w='50%' h='30'  >Contract</GridItem>
                        <GridItem w='50%' h='30'  >{BASE_CONTRACT}</GridItem>
                        <GridItem w='50%' h='30'  >Token Id</GridItem>
                        <GridItem w='50%' h='30' >1</GridItem>
                        <GridItem w='50%' h='30' >Artist</GridItem>
                        <GridItem w='50%' h='30' >SWMS</GridItem>
                    </Grid>
                </div>
                <button
                    className="opensea-button"
                    onClick={openEtherScanAction}
                >
                    View on Etherscan
                </button>
            </div>

        );
    };

    /*
     * Connect to Wallet
     */
    const connectWalletAction = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert('Get MetaMask!');
                return;
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            console.log('Connected', accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };
    const disconnectWalletAction = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert('Get MetaMask!');
                return;
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
                params: [
                    {
                        eth_accounts: {}
                    }
                ]
            });


            setCurrentAccount(null);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        const checkNetwork = async () => {
            try {
                if (window.ethereum.networkVersion !== '4') {
                    alert("Please connect to Rinkeby!")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, []);
    /*
   * Effects
   */
    useEffect(() => {
        /*
         * The function we will call that interacts with out smart contract
         */
        const fetchNFTMetadata = async () => {
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const theContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                contractABI.abi,
                signer
            );

            const txn = await theContract;
            console.log('txn', txn);
        };

        /*
         * We only want to run this, if we have a connected wallet
         */
        if (currentAccount) {
            console.log('CurrentAccount:', currentAccount);
            fetchNFTMetadata();
        }
    }, [currentAccount]);

    useEffect(() => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const theContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                contractABI.abi,
                signer
            );

            console.log(theContract);
            setContract(theContract);

        } else {
            console.log('Ethereum object not found');
        }
    }, []);

    return (
        <div className="App">
            <div className="swms container">
                <div className="swms header">{renderLoginButton()}{renderMintButton()}</div>
                <div className="swms overview-container">
                    <div className="swms nft-container">
                        <div className="swms image-container">
                            {renderNftImage()}
                        </div>
                        <div className="swms data-container">
                            {renderNftData()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;