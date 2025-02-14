import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl font-bold">Privacy Policy</h1> {/* Changed to h1 for better accessibility */}
            <h2 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
              <Link className="font-bold text-xl" href="/" aria-label="Home">
                Home
              </Link>
              <MdKeyboardArrowRight className="mt-2 text-2xl" aria-hidden="true" />
              <a className="mt-2 md:mt-0" href="#" aria-label="Shop">
                Privacy
              </a>
            </h2>
            <p className="mt-2 text-lg text-gray-900">
            Your privacy is important to us. Learn how we protect your data.
          </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Our Privacy Policy</h2>
          <p className="mt-4 text-gray-600">
            At Saud Solution, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.
          </p>

          {/* Data Collection Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">1. Data Collection</h3>
            <p className="mt-4 text-gray-600">
              We collect the following types of information:
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li>Personal Information: Name, email address, phone number, and shipping address.</li>
              <li>Payment Information: Credit card details, billing address, and transaction history.</li>
              <li>Technical Information: IP address, browser type, and device information.</li>
            </ul>
          </div>

          {/* Data Usage Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">2. Data Usage</h3>
            <p className="mt-4 text-gray-600">
              We use your information for the following purposes:
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li>To process and fulfill your orders.</li>
              <li>To communicate with you about your orders and account.</li>
              <li>To improve our website and services.</li>
              <li>To send promotional offers and updates (with your consent).</li>
            </ul>
          </div>

          {/* Data Security Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">3. Data Security</h3>
            <p className="mt-4 text-gray-600">
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li>Encryption of sensitive data during transmission.</li>
              <li>Secure storage of personal information.</li>
              <li>Regular security audits and updates.</li>
            </ul>
          </div>

          {/* User Rights Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">4. Your Rights</h3>
            <p className="mt-4 text-gray-600">
              You have the following rights regarding your data:
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li>Access: Request a copy of the data we hold about you.</li>
              <li>Correction: Request corrections to inaccurate or incomplete data.</li>
              <li>Deletion: Request deletion of your data under certain conditions.</li>
              <li>Opt-Out: Unsubscribe from marketing communications at any time.</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">5. Contact Us</h3>
            <p className="mt-4 text-gray-600">
              If you have any questions or concerns about our Privacy Policy, please contact us at:
            </p>
            <p className="mt-2 text-gray-600">
              Email: <Link href="mailto:privacy@Saud Solution.com" className="text-blue-600 hover:underline">privacy@Saud Solution.com</Link>
            </p>
            <p className="mt-2 text-gray-600">
              Phone: <Link href="tel:+1234567890" className="text-blue-600 hover:underline">+1 (234) 567-890</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Have Questions About Your Data?</h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Our privacy team is here to help. Contact us for any questions or concerns about your personal information.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}