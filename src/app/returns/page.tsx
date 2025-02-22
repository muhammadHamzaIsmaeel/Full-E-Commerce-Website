import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaQuestionCircle, FaShippingFast, FaBoxOpen } from "react-icons/fa"; // More icons

// Define types for FAQs
interface FAQ {
  question: string;
  answer: string;
}

// FAQ data (adjusted for direct contact)
const faqs: FAQ[] = [
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 48 hours of delivery for incorrect, broken, or damaged items. To initiate a return, please contact us directly at [Your Phone Number] or email us at support@Saud Solution.com. You will need to provide video proof of the issue.", // Your Contact Info
  },
  {
    question: "How do I initiate a return?",
    answer:
      "To initiate a return, please contact our customer support team at [Your Phone Number] or email us at support@Saud Solution.com. We will guide you through the process. Video proof of any damage or defect is required.", // Your Contact Info
  },
  {
    question: "What items are eligible for return?",
    answer:
      "Only incorrect, broken, or damaged items are eligible for a guaranteed return and exchange within 48 hours. Change of mind returns are considered on a case-by-case basis and may be subject to return shipping costs.",
  },
  {
    question: "Who pays for return shipping?",
    answer:
      "For incorrect, broken, or damaged items, we will provide a prepaid return shipping label *after* you contact us and we approve the return. For change of mind returns, the customer is responsible for return shipping costs.", // Added a qualification
  },
];

export default function ReturnPolicyPage() {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      {" "}
      {/* Updated Background & Font */}
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh]">
          <Image
            src="/shop/banner11.png"
            alt="Shop Banner"
            fill
            style={{ objectFit: "cover" }}
            className="z-0"
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
            <h1 className="text-4xl font-bold">Return Policy</h1>{" "}
            {/* Changed to h1 for better accessibility */}
            <h2 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
              <Link className="font-bold text-xl" href="/" aria-label="Home">
                Home
              </Link>
              <MdKeyboardArrowRight
                className="mt-2 text-2xl"
                aria-hidden="true"
              />
              <a className="mt-2 md:mt-0" href="#" aria-label="Shop">
                Return
              </a>
            </h2>
            <p className="mt-2 text-lg text-gray-900">
              Our return policy is designed to be fair and transparent. Please
              review the details below.
            </p>
          </div>
        </div>
      </div>
      {/* Return Process Section (Direct Contact) */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          {" "}
          {/* Added margin */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Simple Return Process
          </h2>{" "}
          {/* Text color & margin */}
          <p className="mt-2 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {" "}
            {/* leading-relaxed for better readability */}
            Initiating a return is easy. Follow these simple steps to ensure a
            smooth experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Step 1 */}
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {" "}
            {/* Added shadow */}
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center mb-4">
              {" "}
              {/* Blue Circle */}
              <FaQuestionCircle size={32} /> {/* Using an icon */}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Contact Us Directly
            </h3>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {" "}
              {/* Added leading */}
              Reach out to our support team through the provided channels.
            </p>
            <div className="mt-4">
              <p className="mt-2 text-gray-600">
                To initiate a return, please contact our dedicated support team
                through one of the following channels:
              </p>
              <ul className="mt-2 text-gray-600 list-none pl-0">
                <li>
                  <strong>Phone:</strong>
                  <a
                    href="tel:+923152121984"
                    className="text-blue-500 hover:underline"
                  >
                    +92 315 2121984
                  </a>
                  ,
                  <a
                    href="tel:+923073482322"
                    className="text-blue-500 hover:underline"
                  >
                    +92 307 3482322
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>
                  <a
                    href="mailto:ss.saudsolution@gmail.com"
                    className="text-blue-500 hover:underline"
                  >
                    ss.saudsolution@gmail.com
                  </a>
                </li>
              </ul>
              <p className="mt-2 text-gray-600">
                Please have your order number and video proof of the issue ready
                when you contact us.
              </p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center mb-4">
              {" "}
              {/* Green Circle */}
              <FaShippingFast size={32} /> {/* Using an icon */}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Provide Video Proof
            </h3>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {" "}
              {/* Added leading */}
              Submit a clear video showcasing the issue for efficient
              processing.
            </p>
          </div>
          {/* Step 3 */}
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mx-auto flex items-center justify-center mb-4">
              {" "}
              {/* Yellow Circle */}
              <FaBoxOpen size={32} /> {/* Using an icon */}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Await Our Instructions
            </h3>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {" "}
              {/* Added leading */}
              Our team will review your claim and provide detailed instructions
              on how to proceed.
            </p>
          </div>
        </div>
      </section>
      {/* Eligibility Section (Clear limitations) */}
      <section className="bg-gray-100 py-16">
        {" "}
        {/* Lighter Background */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            {" "}
            {/* Added margin */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Return Eligibility
            </h2>{" "}
            {/* Text color */}
            <p className="mt-2 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {" "}
              {/* Added leading & max-w */}
              To ensure a smooth return process, please ensure your item meets
              the following criteria.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Condition 1 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {" "}
              {/* Added shadow */}
              <Image
                src="/returns/con1.png" // Replace with your icon path
                alt="Damaged"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">
                Damaged Items
              </h3>{" "}
              {/* Text color */}
              <p className="mt-2 text-gray-600 leading-relaxed">
                {" "}
                {/* Added leading */}
                Products damaged during shipping.
              </p>
            </div>
            {/* Condition 2 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {" "}
              {/* Added shadow */}
              <Image
                src="/returns/con2.png" // Replace with your icon path
                alt="Defective"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">
                Defective Items
              </h3>{" "}
              {/* Text color */}
              <p className="mt-2 text-gray-600 leading-relaxed">
                {" "}
                {/* Added leading */}
                Products with manufacturing defects.
              </p>
            </div>
            {/* Condition 3 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {" "}
              {/* Added shadow */}
              <Image
                src="/returns/con1.png" // Replace with your icon path
                alt="Incorrect"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">
                Incorrect Items
              </h3>{" "}
              {/* Text color */}
              <p className="mt-2 text-gray-600 leading-relaxed">
                {" "}
                {/* Added leading */}
                Products that do not match the order description.
              </p>
            </div>
          </div>
          <p className="mt-8 text-gray-600 text-center leading-relaxed">
            {" "}
            {/* Added leading */}
            For "change of mind" returns, please contact us. These are assessed
            individually and may be subject to return shipping costs borne by
            the customer.
          </p>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          {" "}
          {/* Added margin */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>{" "}
          {/* Text color */}
          <p className="mt-2 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {" "}
            {/* Added leading & max-w */}
            Find answers to common questions about our return policy.
          </p>
        </div>
        <div className="mt-12 space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              {" "}
              {/* Minimal border */}
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {faq.question}
              </h3>{" "}
              {/* Text color */}
              <p className="mt-2 text-gray-600 leading-relaxed">
                {faq.answer}
              </p>{" "}
              {/* Added leading */}
            </div>
          ))}
        </div>
      </section>
      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 rounded-lg shadow-lg">
        {" "}
        {/* Gradient & shadow */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help with Your Return?
          </h2>{" "}
          {/* Margin */}
          <p className="mt-2 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {" "}
            {/* Added leading & max-w */}
            Our dedicated customer support team is ready to assist you. Contact
            us for any questions or concerns.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300" // Color Change
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
