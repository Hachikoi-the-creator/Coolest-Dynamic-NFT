// import { useEffect, useState } from "react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./utils/constants";
import { ethers } from "ethers";
import nftsGif from "./img/variants.gif";

export default function App() {
  let NftContract;
  let signer;

  const provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "rinkeby"
  );

  /*A contract is created in the browser, whit the address and ABI of your contract, and the account of the user who is using it!*/
  provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      NftContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    });
  });

  /**
   * @dev triggers the function to MINT and NFT :D
   */
  const mintNFT = async () => {
    const mintNftPromise = NftContract.safeMint(signer._address);
    await mintNftPromise;
    console.log("Your nft is being minted");
  };

  return (
    <>
      <main className="main">
        <img src={nftsGif} alt="All the variants of th dynamic NFT" />
        <div className="desc">
          <h1>Dynamic NFT</h1>
          <p>
            Don't you feel the unsopable urge to get this amazing NFT? it
            changes every 24hrs... automatically! it can also work as a reminder
            os how much you have lost in your BTC investments! since it depends
            in the price of BTC!
          </p>
          <button onClick={mintNFT}>MINT ME!</button>
          <sub>Pss, Make sure you are using Testnet Rinkeby!</sub>
        </div>
      </main>

      <footer className="footer">
        <p>
          Made with <span className="icons"></span> by{" "}
          <a href="https://twitter.com/8koi2">
            <span className="change"></span>
          </a>
        </p>
        <p>
          Source code:{" "}
          <a href="https://github.com/Hachikoi-the-creator/Coolest-Dynamic-NFT">
            <span></span>
          </a>
        </p>
      </footer>
    </>
  );
}
