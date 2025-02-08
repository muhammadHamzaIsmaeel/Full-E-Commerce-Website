import Image from "next/image";

export default function BottomPart() {
  return (
    <div className="border-y-2 text-gray-500 mt-12 pb-12">
      <div className="text-center py-9 text-lg md:text-2xl font-medium space-x-4 md:space-x-10">
        <a className="text-gray-950 hover:text-gray-950" href="">
          Description
        </a>
        <a className="hover:text-gray-950" href="">
          Additional Information
        </a>
        <a className="hover:text-gray-950" href="">
          Reviews[5]
        </a>
      </div>
      <div className="mx-auto">
        <p className="md:mx-32 mx-3 text-justify pb-6">
          Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
          portable active stereo speaker takes the unmistakable look and sound
          of Marshall, unplugs the chords, and takes the show on the road.
        </p>

        <div className="lg:flex md:mx-32  mx-3 lg:mx-auto space-y-8 lg:space-y-0 lg:space-x-8 lg:w-[1100px] lg:h-[348px] ">
          <Image
            src="/single/3.jpg"
            alt="Product Image"
            width="1000"
            height="1000"
            className="h-[348px] w-[605px] rounded-md "
            loading="lazy"
          />
          <Image
            src="/single/2.jpg"
            alt="Product Image"
            width="1000"
            height="1000"
            className="h-[348px] w-[605px] rounded-md "
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
