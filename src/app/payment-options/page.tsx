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
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use industry-standard encryption to protect your payment information.",
  },
  {
    question: "Can I pay with multiple payment methods?",
    answer: "Currently, we only support one payment method per order.",
  },
  {
    question: "Do you offer installment payment options?",
    answer: "Yes, we offer installment payment options through select credit cards and PayPal.",
  },
];

export default function PaymentOptionsPage() {
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
            <h1 className="text-4xl font-bold">Payment Options</h1> {/* Changed to h1 for better accessibility */}
            <h2 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
              <Link className="font-bold text-xl" href="/" aria-label="Home">
                Home
              </Link>
              <MdKeyboardArrowRight className="mt-2 text-2xl" aria-hidden="true" />
              <a className="mt-2 md:mt-0" href="#" aria-label="Shop">
                Payment
              </a>
            </h2>
            <p className="mt-2 text-lg text-gray-900">
            Secure and convenient payment methods for your shopping needs.
          </p>
          </div>
        </div>
      </div>

      {/* Accepted Payment Methods Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Accepted Payment Methods</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We offer a variety of payment options to make your shopping experience seamless and
            secure.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {/* Credit/Debit Cards */}
          <div className="text-center">
            <Image
              src="/payment/cart.png" // Replace with your icon path
              alt="Credit/Debit Cards"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">Credit/Debit Cards</h3>
            <p className="text-gray-600">Visa, MasterCard, American Express</p>
          </div>
          {/* PayPal */}
          <div className="text-center">
            <Image
              src="/payment/paypal.png" // Replace with your icon path
              alt="PayPal"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">PayPal</h3>
            <p className="text-gray-600">Safe and easy online payments</p>
          </div>
          {/* Bank Transfer */}
          <div className="text-center">
            <Image
              src="/payment/bank.png" // Replace with your icon path
              alt="Bank Transfer"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">Bank Transfer</h3>
            <p className="text-gray-600">Direct transfers to our account</p>
          </div>
          {/* Installments */}
          <div className="text-center">
            <Image
              src="/payment/installment.png" // Replace with your icon path
              alt="Installments"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">Installments</h3>
            <p className="text-gray-600">Pay in easy installments</p>
          </div>
        </div>
      </section>

      {/* Security Assurance Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Your Security is Our Priority</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We use advanced encryption and security protocols to ensure your payment information
              is always protected.
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <Image
              src="/payment/protect.png" // Replace with your icon path
              alt="Security"
              width={150}
              height={150}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have questions about payments? We’ve got answers.
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
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Shop?</h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Explore our collection and enjoy a seamless checkout experience with our secure payment
            options.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}