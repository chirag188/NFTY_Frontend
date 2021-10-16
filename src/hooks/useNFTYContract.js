import useContract from "./useContract";

import NFTY from "../contracts/NFTYAbi.json";

const useNFTYContract = () =>
  useContract(process.env.REACT_APP_NFTY_CONTRACT_ADDRESS, NFTY.abi, true);

export default useNFTYContract;
