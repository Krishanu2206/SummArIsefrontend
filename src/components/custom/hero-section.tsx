import Link from 'next/link';
import { HeroSectionProps, Image, HeroSectionLink} from '@/types/herosectiontypes';
import { StrapiImage } from './strapi-image';
import { getUserMeLoader } from '@/data/services/getusermeloader';

export default async function HeroSection({data} : {data : HeroSectionProps}) {
  console.dir(data, { depth: null })

  const user = await getUserMeLoader();
  const isloggedin = user?.ok;

  const {heading, subHeading, image, link} : {heading : string, subHeading : string, image : Image, link : HeroSectionLink } = data;
  return (
    <header className="relative h-[100vh] overflow-hidden">
      <StrapiImage
        alt={image.alternativeText ?? "no alternative text"}
        className="absolute inset-0 object-cover w-full h-full aspect/16:9"
        src={image.url}
        height={1080}
        width={1920}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">
          {subHeading}
        </p>
        <Link
          className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
          href={isloggedin? "/dashboard" : link.url}
        >
          {isloggedin? "Dashboard" : link.text}
        </Link>
      </div>
    </header>
  );
}

