'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdKeyboardArrowRight, MdLocalPhone, MdLocationPin, MdOutlineAccessTimeFilled } from 'react-icons/md';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

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

  return (
    <>
      <header>
        <div className="relative w-full lg:h-[50vh] md:h-[30vh] h-[30vh]">
          <Image
            src="/shop/banner11.png"
            alt="Shop Map"
            layout="fill"
            objectFit="cover"
            priority // Prioritize loading the banner image
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-950">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Furniro Logo"
                width={32}
                height={20}
                className="w-12 h-8"
                priority // Prioritize loading the logo
              />
            </Link>
            <h4 className="text-4xl font-bold">Contact</h4>
            <h5 className="flex items-center text-sm md:text-xl mb-4 space-x-1">
              <Link className="font-bold text-2xl" href="/">Home</Link>
              <MdKeyboardArrowRight className="mt-2 text-2xl" />
              <a className='mt-1 md:mt-0' href="#">Contact</a>
            </h5>
          </div>
        </div>
      </header>
      <div className="pt-16 pb-11 px-6 lg:px-36">
        <div className='items-center mb-24 justify-center text-center'>
          <h2 className="md:text-3xl text-2xl lg:text-4xl font-bold text-gray-800">
            Get In Touch With Us
          </h2>
          <p className="text-gray-600 md:px-52">
            For more information about our products & services, please feel free to drop us an email. Our staff is always here to help you out. Do not hesitate!
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <span className="text-2xl"><MdLocationPin /></span>
                <div>
                  <h4 className="font-semibold pt-2 text-gray-800">Address</h4>
                  <p className="text-gray-600">
                    Sector 13, Block J Orangi Town Karachi, Pakistan.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-2xl"><MdLocalPhone /></span>
                <div>
                  <h4 className="font-semibold pt-2 text-gray-800">Phone</h4>
                  <p className="text-gray-600">
                    Mobile: (+92) 341-2358480 <br />
                    Hotline: (+92) 341-2358480
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-2xl"><MdOutlineAccessTimeFilled /></span>
                <div>
                  <h4 className="font-semibold pt-2 text-gray-800">Working Time</h4>
                  <p className="text-gray-600">
                    Monday-Friday: 9:00 - 22:00 <br />
                    Saturday-Sunday: 9:00 - 21:00
                  </p>
                </div>
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
                        <Input className='py-6' placeholder="Enter your name" {...field} />
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
                        <Input className='py-6' placeholder="Enter your email" {...field} />
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
                        <Input className='py-6' placeholder="Enter subject" {...field} />
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
                <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* ToastContainer for toasts */}
      <ToastContainer />
    </>
  );
};

export default ContactPage;