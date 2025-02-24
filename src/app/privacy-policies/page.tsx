import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function PrivacyPolicyPage() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString(); // Get today's date

  return (
    <div className="bg-white text-gray-900">
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh]">
          <Image
            src="/shop/banner11.png"
            alt="Privacy Policy Banner"
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
            <h1 className="text-4xl font-bold">Privacy Policy</h1>{" "}
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
            At Saud Solution, we are committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and safeguard your
            personal information when you visit our website, use our services,
            or make a purchase. This policy also applies to information
            collected in relation to the products we sell on our site.
          </p>

          {/* Data Collection Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">1. Data Collection</h3>
            <p className="mt-4 text-gray-600">
              We collect the following types of information:
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, date of birth (if required for age verification),
                and shipping address.
              </li>
              <li>
                <strong>Payment Information:</strong> Credit card details,
                billing address, and transaction history. We use secure payment
                processors and do not directly store your credit card
                information on our servers.
              </li>
              <li>
                <strong>Technical Information:</strong> IP address, browser
                type, device information (including device ID), operating
                system, and browsing behavior on our website (pages visited,
                links clicked, etc.). We may use cookies and similar tracking
                technologies to collect this information.
              </li>
              <li>
                <strong>Product-Related Information:</strong> If you purchase
                products from our website, we may collect information related to
                those purchases, including product types, quantities, and
                purchase dates, for compliance and inventory management
                purposes. This includes information related to age-restricted
                products.
              </li>
              <li>
                <strong>Communications Data:</strong> Records of your
                communications with us, including emails, chat logs, and phone
                calls.
              </li>
              <li>
                <strong>Marketing Data:</strong> Your preferences for receiving
                marketing communications from us.
              </li>
            </ul>
          </div>

          {/* Data Usage Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">2. Data Usage</h3>
            <p className="mt-4 text-gray-600">
              We use your information for the following purposes:
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li>
                To process and fulfill your orders, including age verification
                for products where required.
              </li>
              <li>
                To communicate with you about your orders, account, and any
                inquiries you may have.
              </li>
              <li>
                To improve our website, services, and product offerings,
                including personalizing your experience.
              </li>
              <li>
                To send you promotional offers, updates, and marketing
                communications (with your consent, where required by law). You
                can opt-out of these communications at any time.
              </li>
              <li>
                To comply with legal and regulatory requirements related to the
                sale of products, including age verification, tracking sales,
                and reporting to relevant authorities (where applicable).
              </li>
              <li>
                To detect, prevent, and address fraud, security breaches, or
                other illegal activities.
              </li>
              <li>
                To analyze website traffic and usage patterns to improve our
                site&apos;s performance and user experience.
              </li>
            </ul>
          </div>

          {/* Data Sharing and Disclosure Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">
              3. Data Sharing and Disclosure
            </h3>
            <p className="mt-4 text-gray-600">
              We may share your information with the following categories of
              recipients:
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li>
                <strong>Service Providers:</strong> We share information with
                third-party service providers who assist us with payment
                processing, shipping, marketing, data analytics, and other
                essential functions. These providers are contractually obligated
                to protect your information and use it only for the purposes we
                specify. This includes providers who assist with fulfilling and
                delivering your orders.
              </li>
              <li>
                <strong>Legal Authorities:</strong> We may disclose your
                information to legal authorities if required by law or legal
                process, or if we believe it is necessary to protect our rights,
                property, or safety, or the rights, property, or safety of
                others. This may include providing information to comply with
                regulations related to the sale of certain products.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of all or a portion of our assets, your
                information may be transferred as part of the transaction. We
                will notify you via email and/or a prominent notice on our
                website of any change in ownership or uses of your personal
                information, as well as any choices you may have regarding your
                personal information.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may share your
                information with other third parties with your explicit consent.
              </li>
            </ul>
          </div>

          {/* Data Security Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">4. Data Security</h3>
            <p className="mt-4 text-gray-600">
              We implement industry-standard security measures to protect your
              data, including:
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li>
                Encryption of sensitive data during transmission using Secure
                Socket Layer (SSL) technology.
              </li>
              <li>
                Secure storage of personal information on protected servers.
              </li>
              <li>
                Regular security audits and updates to our systems and
                infrastructure.
              </li>
              <li>
                Access controls to limit access to personal information to
                authorized personnel only.
              </li>
              <li>
                Implementing measures to protect against unauthorized access,
                alteration, disclosure, or destruction of your personal
                information.
              </li>
            </ul>
          </div>

          {/* Data Retention Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">5. Data Retention</h3>
            <p className="mt-4 text-gray-600">
              We will retain your personal information for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. This
              includes retaining data to provide you with services, comply with
              legal obligations, resolve disputes, and enforce our agreements.
              Data related to product purchases may be retained for longer
              periods to comply with regulatory requirements.
            </p>
          </div>

          {/* User Rights Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">6. Your Rights</h3>
            <p className="mt-4 text-gray-600">
              You have the following rights regarding your data, subject to
              certain limitations and exceptions:
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li>
                <strong>Access:</strong> Request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong>Correction:</strong> Request corrections to inaccurate
                or incomplete personal data.
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                data under certain conditions, such as when the data is no
                longer necessary for the purposes for which it was collected.
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from marketing
                communications at any time by clicking the
                &quot;unsubscribe&quot; link in our emails or contacting us
                directly.
              </li>
              <li>
                <strong>Restriction of Processing:</strong> Request restriction
                of processing of your personal data in certain circumstances.
              </li>
              <li>
                <strong>Data Portability:</strong> Request to receive your
                personal data in a structured, commonly used, and
                machine-readable format and have the right to transmit that data
                to another controller.
              </li>
              <li>
                <strong>Withdraw Consent:</strong> If we are processing your
                personal data based on your consent, you have the right to
                withdraw your consent at any time.
              </li>
              <li>
                <strong>Lodge a Complaint:</strong> You have the right to lodge
                a complaint with a supervisory authority if you believe that our
                processing of your personal data violates applicable laws.
                Contact details for the relevant authority in Pakistan will be
                provided upon request.
              </li>
            </ul>
          </div>

          {/* Children's Privacy Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">7. Children&apos;s Privacy</h3>
            <p className="mt-4 text-gray-600">
              Our website is not directed to children under the age of 18. We do
              not knowingly collect personal information from children. If you
              are a parent or guardian and believe that your child has provided
              us with personal information, please contact us, and we will take
              steps to delete that information.
            </p>
          </div>

          {/* International Data Transfers Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">8. Data Transfers</h3>
            <p className="mt-4 text-gray-600">
              As a local business operating within Pakistan, we primarily store
              and process your data within the country. However, some data may
              be transferred to and processed in other countries by our service
              providers, who adhere to internationally recognized data
              protection standards. By using our website, you consent to this
              potential data transfer. We will take steps to ensure that your
              personal information is protected in accordance with this Privacy
              Policy.
            </p>
          </div>

          {/* Changes to this Privacy Policy Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">
              9. Changes to this Privacy Policy
            </h3>
            <p className="mt-4 text-gray-600">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or applicable laws. We will post any
              changes on this page and update the &quot;Last Updated&quot; date
              below. We encourage you to review this Privacy Policy
              periodically. Significant changes will be communicated via email.
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Last Updated:</strong> {formattedDate}
            </p>
          </div>

          {/* Contact Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">10. Contact Us</h3>
            <p className="mt-4 text-gray-600">
              If you have any questions or concerns about our Privacy Policy,
              please contact us at:
            </p>
            <p className="mt-2 text-gray-600">
              Email:{" "}
              <Link
                href="mailto:privacy@Saud Solution.com"
                className="text-blue-600 hover:underline"
              >
                privacy@Saud Solution.com
              </Link>
            </p>
            <p className="mt-2 text-gray-600">
              Phone:{" "}
              <Link
                href="tel:+923152121984"
                className="text-blue-600 hover:underline"
              >
                +92 315 2121984
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Have Questions About Your Data?
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Our privacy team is here to help. Contact us for any questions or
            concerns about your personal information.
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
