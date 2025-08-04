"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  const [name, setName] = useState("");

  useEffect(() => {
    // Retrieve subscriber data from localStorage
    const subscriberData = localStorage.getItem("subscriberData");
    if (subscriberData) {
      const data = JSON.parse(subscriberData);
      setName(data.name || "");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen ">
      
      <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-16 md:py-20 flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-8 space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-3xl font-medium tracking-tight">
              Thank You{name ? `, ${name}` : ""}!
            </h1>
            
            <p className="text-muted-foreground max-w-md">
              Your subscription has been confirmed. You'll be among the first to know when we launch.
            </p>
          </div>
          
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-muted/30">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Welcome Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="border border-primary/20 rounded-lg p-6 bg-primary/5">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="font-medium">Book a Demo Call</h3>
                <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                  Get a personalized walkthrough of our platform
                </p>
              </div>
              
              <Button className="md:ml-auto whitespace-nowrap">
                <Link target="_blank" rel="noopener noreferrer" href="https://loombolt.com">
                Schedule Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="w-full py-4">
        <div className="container mx-auto flex justify-center items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} • All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
