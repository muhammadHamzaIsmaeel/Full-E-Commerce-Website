import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

// Define types for team members
interface TeamMember {
  name: string;
  role: string;
  image: string;
}

// Team member data
const teamMembers: TeamMember[] = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image: "/team/m1.jpg", // Replace with your image path
  },
  {
    name: "Jane Smith",
    role: "Head of Design",
    image: "/team/m2.jpg", // Replace with your image path
  },
  {
    name: "Mike Johnson",
    role: "Marketing Director",
    image: "/team/m3.jpg", // Replace with your image path
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh]">
          <Image
            src="/shop/banner11.png"
            alt="Shop Banner"
            layout="fill"
            objectFit="cover"
            className=""
            loading="lazy"
            aria-label="Shop Banner"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-950">
            <Link href="/" aria-label="Go to Home">
              <Image
                src="/logo.png"
                alt="Saud Solution Logo"
                width="32"
                height="20"
                className="w-12 h-8"
                loading="lazy"
              />
            </Link>
            <h1 className="text-4xl font-bold">About US</h1> {/* Changed to h1 for better accessibility */}
            <h2 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
              <Link className="font-bold text-xl" href="/" aria-label="Home">
                Home
              </Link>
              <MdKeyboardArrowRight className="mt-2 text-2xl" aria-hidden="true" />
              <a className="mt-2 md:mt-0" href="#" aria-label="Shop">
                About
              </a>
            </h2>
          </div>
        </div>
      </div>

      {/* Company History Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Founded in 2010, Funiro started as a small furniture store with a big dream: to bring
            high-quality, stylish, and affordable furniture to every home. Over the years, we have
            grown into a trusted brand, serving customers worldwide with a commitment to excellence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our mission is to create furniture that combines functionality, aesthetics, and
              sustainability. We believe in making homes beautiful while caring for the environment.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Meet Our Team</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We are a group of passionate individuals dedicated to delivering the best experience for
            our customers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Join Our Journey</h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Be a part of our mission to create beautiful, sustainable homes. Explore our collection
            and find the perfect pieces for your space.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}