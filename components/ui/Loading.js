import dualRing from "@/public/dualRing.svg";
import Image from "next/image";

const Loading = ({ width }) => {
  return <Image priority src={dualRing} alt="loading svg icon" width={width} />;
};

export default Loading;
