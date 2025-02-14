import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

// Define types for FAQs
interface FAQ {
  question: string;
  answer: string;
}

// FAQ data
const faqs: FAQ[] = [
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase. The item must be unused, in its original packaging, and accompanied by a valid receipt.",
  },
  {
    question: "How do I initiate a return?",
    answer:
      "To initiate a return, please contact our customer support team at support@Saud Solution.com or visit the Returns section in your account.",
  },
  {
    question: "Are there any items that cannot be returned?",
    answer:
      "Yes, certain items like custom-made furniture or final sale items are non-returnable. Please check the product description for details.",
  },
  {
    question: "How long does it take to process a refund?",
    answer:
      "Once we receive your returned item, we will process your refund within 5-7 business days.",
  },
];

export default function ReturnPolicyPage() {
  return (
    <div className="bg-white text-gray-900">
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
              We make returns easy and hassle-free. Learn more about our return
              process below.
            </p>
          </div>
        </div>
      </div>

      {/* Return Process Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Our Return Process</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            At Saud Solution, we want you to be completely satisfied with your
            purchase. If you&apos;re not happy with your order, follow these simple
            steps to return it.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="bg-gray-100 p-6 rounded-lg">
              <span className="text-2xl font-bold text-gray-900">1</span>
              <h3 className="mt-4 text-xl font-semibold">Contact Us</h3>
              <p className="mt-2 text-gray-600">
                Reach out to our support team to initiate your return.
              </p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="text-center">
            <div className="bg-gray-100 p-6 rounded-lg">
              <span className="text-2xl font-bold text-gray-900">2</span>
              <h3 className="mt-4 text-xl font-semibold">Pack Your Item</h3>
              <p className="mt-2 text-gray-600">
                Securely pack the item in its original packaging.
              </p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="text-center">
            <div className="bg-gray-100 p-6 rounded-lg">
              <span className="text-2xl font-bold text-gray-900">3</span>
              <h3 className="mt-4 text-xl font-semibold">Ship It Back</h3>
              <p className="mt-2 text-gray-600">
                Send the item back to us using the provided return label.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Return Eligibility
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              To be eligible for a return, your item must meet the following
              criteria:
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Condition 1 */}
            <div className="text-center">
              <Image
                src="/returns/con1.png" // Replace with your icon path
                alt="Unused"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold">Unused</h3>
              <p className="mt-2 text-gray-600">
                The item must be in its original condition.
              </p>
            </div>
            {/* Condition 2 */}
            <div className="text-center">
              <Image
                src="/returns/con2.png" // Replace with your icon path
                alt="Original Packaging"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold">Original Packaging</h3>
              <p className="mt-2 text-gray-600">
                The item must be in its original packaging.
              </p>
            </div>
            {/* Condition 3 */}
            <div className="text-center">
              <Image
                src="/returns/con1.png" // Replace with your icon path
                alt="Receipt"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold">Valid Receipt</h3>
              <p className="mt-2 text-gray-600">
                A valid receipt or proof of purchase is required.
              </p>
            </div>
            {/* Condition 4 */}
            <div className="text-center">
              <Image
                src="/returns/con2.png" // Replace with your icon path
                alt="Timeframe"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold">Within 30 Days</h3>
              <p className="mt-2 text-gray-600">
                Returns must be initiated within 30 days of purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have questions about returns? We’ve got answers.
          </p>
        </div>
        <div className="mt-12 space-y-6 max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b-2 border-gray-200 pb-6">
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Need Help with Your Return?
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Our customer support team is here to assist you. Contact us for any
            questions or concerns about your return.
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
