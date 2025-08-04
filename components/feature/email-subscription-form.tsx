"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { addSubscriber } from "@/db/subscriber-functions";

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function EmailSubscriptionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await addSubscriber({ name: data.name, email: data.email, phone: data.phone });
      // Store minimal data locally for thank-you page greeting
      localStorage.setItem("subscriberData", JSON.stringify({ name: data.name, email: data.email }));
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className=" bg-white border p-6 rounded-lg ">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-medium tracking-tight">Get Early Access</h2>
          <p className="text-muted-foreground text-sm">
            Be the first to know when we launch new products
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      {...field} 
                      className="h-11 border-0 bg-accent focus:ring-1 focus:ring-primary/30"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormControl>
                    <Input 
                      placeholder="Your email" 
                      type="email" 
                      {...field} 
                      className="h-11 border-0 bg-accent focus:ring-1 focus:ring-primary/30"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormControl>
                    <Input 
                      placeholder="Your phone (optional)" 
                      type="tel" 
                      {...field} 
                      className="h-11 border-0 bg-accent focus:ring-1 focus:ring-primary/30"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full h-11 mt-2 font-normal"
              variant="default"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Join Waitlist"}
            </Button>
          </form>
        </Form>
        
        <p className="text-xs text-center text-muted-foreground pt-2">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </div>
  );
}
