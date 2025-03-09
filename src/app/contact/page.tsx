// src/app/contact/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MdKeyboardArrowRight,
  MdLocalPhone,
  MdOutlineAccessTimeFilled,
  MdOutlineEmail,
} from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Head from "next/head";

// Zod schema for form validation
const formSchema = z.object({
  yourname: z.string().min(2, "Name is too short").max(50),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject cannot be empty").max(200),
  message: z.string().min(1, "Message cannot be empty").max(1000),
});

const ContactPage: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yourname: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit form");
      }

      // Show success toast
      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        style: { background: "#4ade80", color: "white" }, // Success green
      });

      form.reset(); // Reset form after successful submission
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message || "Failed to submit form", {
          position: "top-right",
          autoClose: 3000,
          style: { background: "#f87171", color: "white" }, // Error red
        });
      } else {
        console.error("An unknown error occurred");
        toast.error("An unknown error occurred", {
          position: "top-right",
          autoClose: 3000,
          style: { background: "#f87171", color: "white" }, // Error red
        });
      }
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us - Saud Solutions",
    "description": "Contact Saud Solutions for any inquiries or support.",
    "url": "https://saudsolutions.com/contact", // Replace with your actual URL
    "potentialAction": {
      "@type": "CommunicateAction",
      "actionStatus": "ActiveActionStatus",
      "name": "Contact Customer Service",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://saudsolutions.com/contact", // Replace with your actual URL
        "inLanguage": "en-US",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://saudsolutions.com/contact" // Replace with your actual URL
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - Saud Solutions</title>
        <meta
          name="description"
          content="Contact Saud Solutions for inquiries or support."
        />
        <meta
          name="keywords"
          content="contact, support, inquiries, Saud Solutions"
        />
        <link rel="canonical" href="https://saudsolutions.com/contact" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <header>
        <div className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh]">
          <Image
            src="/shop/banner11.png"
            alt="Contact Banner"
            layout="fill"
            objectFit="cover"
            className="filter blur-sm opacity-70"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-950">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Saud Solution Logo"
                width={32}
                height={20}
                className="w-12 h-8"
                priority
              />
            </Link>
            <h4 className="text-4xl font-bold">Contact</h4>
            <h5 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
              <Link className="font-bold text-2xl" href="/">
                Home
              </Link>
              <MdKeyboardArrowRight className="mt-2 text-2xl" />
              <span className="mt-1 md:mt-0">Contact</span>
            </h5>
          </div>
        </div>
      </header>
      <div className="pt-16 pb-11 px-6 lg:px-36">
        <div className="items-center mb-24 justify-center text-center">
          <h2 className="md:text-3xl text-2xl lg:text-4xl font-bold text-gray-800">
            Get In Touch With Us
          </h2>
          <p className="text-gray-600 md:px-52">
            For more information about our products & services, please feel free
            to drop us an email. Our staff is always here to help you out. Do
            not hesitate!
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Online Shop Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              We&apos;re Here to Help Online
            </h3>
            <p className="text-gray-600">
              Our online store is available 24/7 to assist you with your
              shopping needs. Contact us using the form or the options below.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-2xl text-yellow-600">
                <MdOutlineEmail />
              </span>
              <div>
                <h4 className="font-semibold text-gray-800">Email Support</h4>
                <p className="text-gray-600">
                  Email us your questions or concerns, and we&apos;ll respond as soon
                  as possible.
                </p>
                <a
                  href="mailto:ss.saudsolution@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  ss.saudsolution@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl text-yellow-600">
                <MdLocalPhone />
              </span>
              <div>
                <h4 className="font-semibold text-gray-800">Message Us</h4>
                <p className="text-gray-600">
                  Send us a message through WhatsApp or SMS, and we&apos;ll get back
                  to you promptly.
                </p>
                <p className="text-gray-600">
                  WhatsApp: +92 315 2121984
                  <br />
                  SMS: +92 307 3482322
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl text-yellow-600">
                <MdOutlineAccessTimeFilled />
              </span>
              <div>
                <h4 className="font-semibold text-gray-800">Online Hours</h4>
                <p className="text-gray-600">
                  Our online support team is available during the following
                  hours:
                </p>
                <p className="text-gray-600">
                  Monday-Saturday: 9:00 AM - 5:00 PM (EST)
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
                noValidate // Disable browser validation
              >
                <FormField
                  control={form.control}
                  name="yourname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input
                          className="py-6"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="py-6"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          className="py-6"
                          placeholder="Enter subject"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <textarea
                          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none"
                          rows={4}
                          placeholder="Enter your message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-yellow-600 hover:bg-yellow-500"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default ContactPage;