import React from "react";
import { Link } from "react-router-dom";

const Vote = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="vote-page">
          <div className="vote-header-text">Community Driven Governance</div>
          <div className="vote-body-text text-center mt-2">
            <span className="f-b">The NFTY Protocol Corporation</span> oversees
            the NFTY Token and its associated smart contracts. The community
            board seat votes according to the will of individual NFTY token
            holders, weighted by their vote power as determined by their Social
            Power. No person or group has special access to NFTY tokens. All
            acquisitions must be made by purchasing tokens out of a liquidity
            pool or earned through staking yields.
            <br />
            <br />
            Proposals to change or upgrade the protocol made on sites like
            Uniswap, nftytoken.io, and VLBO.com let community participants put
            their social rank to use. Votes are calculated from a chart of
            voting power that corresponds to the social rank of each wallet.
            This mitigates the voting power differential between users with
            shorter staking times and longer ones.
          </div>
          <div className="d-flex justify-content-center mt-2">
            <a
              href="https://www.nftytoken.io/governance"
              className="link-text"
              target="_blank"
            >
              <u>Read More About NFTY Governance</u>
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Vote;
