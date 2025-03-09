// src/app/return-policy/page.tsx
import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaQuestionCircle, FaShippingFast, FaBoxOpen } from "react-icons/fa";
import Head from "next/head";
import React, { useMemo } from "react";

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
      "We accept returns within 48 hours of delivery for incorrect, broken, or damaged items. To initiate a return, please contact us directly at +92 315 2121984  or email us at ss.saudsolution@gmail.com. You will need to provide video proof of the issue.",
  },
  {
    question: "How do I initiate a return?",
    answer:
      "To initiate a return, please contact our customer support team at +92 315 2121984 or email us at ss.saudsolution@gmail.com. We will guide you through the process. Video proof of any damage or defect is required.",
  },
  {
    question: "What items are eligible for return?",
    answer:
      "Only incorrect, broken, or damaged items are eligible for a guaranteed return and exchange within 48 hours. Change of mind returns are considered on a case-by-case basis and may be subject to return shipping costs.",
  },
  {
    question: "Who pays for return shipping?",
    answer:
      "For incorrect, broken, or damaged items, we will provide a prepaid return shipping label *after* you contact us and we approve the return. For change of mind returns, the customer is responsible for return shipping costs.",
  },
];

export default function ReturnPolicyPage() {
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Return Policy - Saud Solutions",
    "description":
      "Learn about Saud Solutions' return policy for online purchases. Find information on eligibility, procedures, and contact details.",
    "url": "https://saudsolutions.com/return-policy", // Replace with your actual URL
    "potentialAction": {
      "@type": "CommunicateAction",
      "actionStatus": "ActiveActionStatus",
      "name": "Contact Customer Service for Returns",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://saudsolutions.com/contact", // Your Contact URL
        "inLanguage": "en-US",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://saudsolutions.com/return-policy", // Your Return Policy URL
    },
  }), []);

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <Head>
        <title>Return Policy - Saud Solutions</title>
        <meta
          name="description"
          content="Learn about Saud Solutions' return policy for online purchases. Find information on eligibility, procedures, and contact details."
        />
        <meta
          name="keywords"
          content="return policy, Saud Solutions, refund, exchange, shipping"
        />
        <link rel="canonical" href="https://saudsolutions.com/return-policy" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh]">
          <Image
            src="/shop/banner11.png"
            alt="Returns Banner"
            layout="fill"
            style={{ objectFit: "cover", filter: "blur(3px)", opacity: 0.7 }}
            objectFit="cover"
            loading="lazy"
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
            <h1 className="text-4xl font-bold">Return Policy</h1>
            <h2 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
              <Link className="font-bold text-xl" href="/" aria-label="Home">
                Home
              </Link>
              <MdKeyboardArrowRight
                className="mt-2 text-2xl"
                aria-hidden="true"
              />
              <span className="mt-2 md:mt-0">Return Policy</span>
            </h2>
            <p className="mt-2 text-lg text-gray-900">
              Our return policy is designed to be fair and transparent. Please
              review the details below.
            </p>
          </div>
        </div>
      </div>
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Simple Return Process
          </h2>
          <p className="mt-2 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Initiating a return is easy. Follow these simple steps to ensure a
            smooth experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center mb-4">
              <FaQuestionCircle size={32} />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Contact Us Directly
            </h3>
            <p className="mt-2 text-gray-600 leading-relaxed">
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
                  ,<a
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
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center mb-4">
              <FaShippingFast size={32} />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Provide Video Proof
            </h3>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Submit a clear video showcasing the issue for efficient
              processing.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mx-auto flex items-center justify-center mb-4">
              <FaBoxOpen size={32} />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Await Our Instructions
            </h3>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Our team will review your claim and provide detailed instructions
              on how to proceed.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Return Eligibility
            </h2>
            <p className="mt-2 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To ensure a smooth return process, please ensure your item meets
              the following criteria.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/returns/con1.png"
                alt="Damaged"
                width={80}
                height={80}
                className="mx-auto"
                loading="lazy"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">
                Damaged Items
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Products damaged during shipping.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/returns/con2.png"
                alt="Defective"
                width={80}
                height={80}
                className="mx-auto"
                loading="lazy"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">
                Defective Items
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Products with manufacturing defects.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/returns/con1.png"
                alt="Incorrect"
                width={80}
                height={80}
                className="mx-auto"
                loading="lazy"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">
                Incorrect Items
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Products that do not match the order description.
              </p>
            </div>
          </div>
          <p className="mt-8 text-gray-600 text-center leading-relaxed">
            For &quot;change of mind&quot; returns, please contact us. These are
            assessed individually and may be subject to return shipping costs
            borne by the customer.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our return policy.
          </p>
        </div>
        <div className="mt-12 space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {faq.question}
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 rounded-lg shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help with Your Return?
          </h2>
          <p className="mt-2 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Our dedicated customer support team is ready to assist you. Contact
            us for any questions or concerns.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}