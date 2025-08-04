"use client";

import { CountdownTimer } from "@/components/feature/countdown-timer";
import { AlertTriangle } from "lucide-react";

export function UrgencyHeader() {
  
  
  return (
   <header className="fixed top-0 z-50 w-full border-b bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-xl mx-auto py-3 px-4">
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center">
          <div className="flex items-center gap-2 text-primary">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">Limited Time Offer</span>
          </div>
          
          <p className="text-sm">
            <span className="hidden md:inline">Early bird pricing ends in: </span>
            <span className="md:hidden">Offer ends in: </span>
          </p>
          
          <CountdownTimer className="text-sm" />
          
          
        </div>
      </div>
    </header>
  );
}
