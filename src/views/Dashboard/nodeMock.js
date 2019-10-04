import nictLogo from "../../assets/nodes/nict.png";
import upmLogo from "../../assets/nodes/upm.png";
import hustLogo from "../../assets/nodes/hust.png";
let nodes = [
  {
    name: "NICT",
    country: "JAPAN",
    countryFlag: "jp",
    regiterTime: "Jul 10, 2015",
    usage: 49,
    time: Date.now(),
    lastActive: " 1 second ago",
    image: nictLogo
  },
  {
    name: "UPM",
    country: "Malaysia",
    countryFlag: "my",
    regiterTime: "Jul 10, 2015",
    usage: 21,
    time: Date.now(),
    lastActive: " 0 second ago",
    image: upmLogo
  },
  {
    name: "HUST",
    country: "Viet Nam",
    countryFlag: "vn",
    regiterTime: "Jul 10, 2015",
    usage: 12,
    time: Date.now(),
    lastActive: " 1 second ago",
    image: hustLogo
  }
];
export default nodes;
