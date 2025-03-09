// src/components/BillingDetailsForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { formSchema, FormSchemaType } from "@/types/checkoutSchema";

interface BillingDetailsFormProps {
  onSubmit: (data: FormSchemaType) => void;
  isSubmitting: boolean;
}

export default function BillingDetailsForm({
  onSubmit,
  isSubmitting,
}: BillingDetailsFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      province: "Sindh",
      zipCode: "",
      courierService: "leopard",
      phoneNumber1: "",
      phoneNumber2: "",
      emailAddress: "",
      additionalInformation: "",
      paymentMethod: "cod",
      landmark: "",
      addressType: "home",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {/* Form Fields */}
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  className="w-full border border-gray-300 rounded-md p-3"
                  placeholder="Enter your full name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input
                  className="w-full border border-gray-300 rounded-md p-3"
                  placeholder="Street address, house number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2 (Optional)</FormLabel>
              <FormControl>
                <Input
                  className="w-full border border-gray-300 rounded-md p-3"
                  placeholder="Apartment, suite, unit, etc."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Town / City</FormLabel>
                <FormControl>
                  <Input
                    className="w-full border border-gray-300 rounded-md p-3"
                    placeholder="Enter your city"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <select
                    className="w-full border border-gray-300 rounded-md p-3"
                    {...field}
                  >
                    <option value="Sindh">Sindh</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                    <option value="Khyber Pakhtunkhwa">
                      Khyber Pakhtunkhwa
                    </option>
                    <option value="Balochistan">Balochistan</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input
                  className="w-full border border-gray-300 rounded-md p-3"
                  placeholder="e.g. 12345"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Landmark (Optional) */}
        <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landmark (Optional)</FormLabel>
              <FormControl>
                <Input
                  className="w-full border border-gray-300 rounded-md p-3"
                  placeholder="Nearby famous place"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Type (Home/Office) */}
        <FormField
          control={form.control}
          name="addressType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Type</FormLabel>
              <FormControl>
                <select
                  className="w-full border border-gray-300 rounded-md p-3"
                  {...field}
                >
                  <option value="home">Home</option>
                  <option value="office">Office</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courierService"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Courier Service</FormLabel>
              <FormControl>
                <select
                  className="w-full border border-gray-300 rounded-md p-3"
                  {...field}
                >
                  <option value="leopard">Leopard Courier</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phoneNumber1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    className="w-full border border-gray-300 rounded-md p-3"
                    placeholder="Enter phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Phone Number</FormLabel>
                <FormControl>
                  <Input
                    className="w-full border border-gray-300 rounded-md p-3"
                    placeholder="Enter additional phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  className="w-full border border-gray-300 rounded-md p-3"
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
          name="additionalInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information (Optional)</FormLabel>
              <FormControl>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3"
                  rows={4}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md mt-4 hover:bg-gray-800"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Confirming Order..."
            : "Confirm Order (Cash on Delivery)"}
        </Button>
      </form>
    </Form>
  );
}
