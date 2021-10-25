import PatronBadge from "../assets/images/PatronBadge.jpg";
import IronBadge from "../assets/images/IronBadge.jpg";
import SilverBadge from "../assets/images/SilverBadge.jpg";
import GoldBadge from "../assets/images/GoldBadge.jpg";
import PlatinumBadge from "../assets/images/PlatinumBadge.jpg";
import DiamondBadge from "../assets/images/DiamondBadge.jpg";

export const tierArr = [
  {
    isActive: true,
    rank: "1",
    name: "Patron",
    nftyStaked: "1",
    timeStaked: "0",
    stakingAPR: "13.579",
    votePower: "1",
    badge: PatronBadge,
  },
  {
    isActive: true,
    rank: "2",
    name: "Iron",
    nftyStaked: "500",
    timeStaked: "30",
    stakingAPR: "14.579",
    votePower: "500",
    badge: IronBadge,
  },
  {
    isActive: true,
    rank: "3",
    name: "Silver",
    nftyStaked: "10000",
    timeStaked: "45",
    stakingAPR: "15.079",
    votePower: "10000",
    badge: SilverBadge,
  },
  {
    isActive: true,
    rank: "4",
    name: "Gold",
    nftyStaked: "25000",
    timeStaked: "90",
    stakingAPR: "15.579",
    votePower: "25000",
    badge: GoldBadge,
  },
  {
    isActive: true,
    rank: "5",
    name: "Platinum",
    nftyStaked: "50000",
    timeStaked: "180",
    stakingAPR: "15.829",
    votePower: "50000",
    badge: PlatinumBadge,
  },
  {
    isActive: true,
    rank: "6",
    name: "Diamond",
    nftyStaked: "100000",
    timeStaked: "365",
    stakingAPR: "16.079",
    votePower: "100000",
    badge: DiamondBadge,
  },
];
