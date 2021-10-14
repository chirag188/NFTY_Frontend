import useContract from "./useContract";

import Staking from "../contracts/StakingAbi.json";

const useStakingContract = () =>
  useContract(process.env.REACT_APP_STAKING_CONTRACT_ADDRESS, Staking.abi, true);

export default useStakingContract;
