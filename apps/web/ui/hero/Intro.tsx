import Image from "next/image";
export default function Intro() {
  return (
    <div className="flex">
      <h1 className="  text-3xl sm:text-4xl p-4 my-2 sm:my-4 font-extrabold">
        Hi I am Izidor, <br /> a software developer
      </h1>
      <div className="block sm:hidden rounded-full top-0 right-0 relative h-[110px] w-[110px]">
        <Image
          src={"/profile.png"}
          alt={"Izidors profile picture"}
          className="rounded-full"
          width={220}
          height={220}
          objectFit="cover"
        />
      </div>
    </div>
  );
}
