import React from "react";
import { Link } from "react-router-dom";

const Vote = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="vote-page">
          <div className="vote-header-text">NFTY Governance</div>
          <div className="vote-body-text text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis
            convallis mauris, id finibus lectus tristique ut. Donec lacinia
            magna id nibh vehicula faucibus. Mauris venenatis leo tellus,
            pulvinar rhoncus enim luctus eu. Donec condimentum sagittis dolor et
            mattis.
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis
            convallis mauris, id finibus lectus tristique ut. Donec lacinia
            magna id nibh vehicula faucibus. Mauris venenatis leo tellus,
            pulvinar rhoncus enim luctus eu. Donec condimentum sagittis dolor et
            mattis.
          </div>
          <div className="d-flex justify-content-center mt-2">
            <Link className="link-text">
              <u>Read More About NFTY Governance</u>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Vote;
