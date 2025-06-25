import { FiChevronDown } from "react-icons/fi";
import Chat from "./hero/Chat";
import Intro from "./hero/Intro";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="h-screen w-full  flex flex-col items-center justify-end bg-gradient-to-b from-zinc-900/50 to-zinc-950/0">
      <div className="flex container grow p-2 sm:p-0 justify-self-center justify-center">
        <div className=" hidden sm:block self-center max-max-w-max p-6 md:p-24">
          <Image
            src={"/profile.png"}
            alt={"Izidors profile picture"}
            className="rounded-full aspect-square h-full w-full"
            width={220}
            height={220}
            // sizes=" (max-width: 550px) 50px"
            objectFit="cover"
          />
        </div>

        <div className="flex self-stretch flex-col items-center  justify-center gap-2 sm:gap-8">
          <Intro />
          <Chat />
        </div>
      </div>
      {/* scroll for projects component */}
      <div className="flex flex-col justify-self-end items-center">
        <div className=" text-md  font-extralight ">
          Scroll down to see my projects
        </div>
        <FiChevronDown className=" text-4xl animate-bounce mt-4" />
      </div>
    </div>
  );
}
