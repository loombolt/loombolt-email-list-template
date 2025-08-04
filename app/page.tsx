import Link from "next/link";
import { Sparkle } from "lucide-react";
import { EmailSubscriptionForm } from "@/components/feature/email-subscription-form";
import { UrgencyHeader } from "@/components/feature/urgency-header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-16 md:py-24 flex">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
          <div className="space-y-6 max-w-md">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
              Transform Your Digital Products into <span className="text-primary">Revenue Streams</span>
            </h1>
            <p className="text-muted-foreground">
              Join our exclusive community of digital creators and get early access to our platform that helps you convert visitors into loyal customers.
            </p>
          </div>
          
          <div className="w-full max-w-md mx-auto md:ml-auto">
            <EmailSubscriptionForm />
          </div>
        </div>
      </main>
      
      <footer className="w-full py-4">
        <div className="container mx-auto flex justify-center items-center text-xs text-muted-foreground">
          <Link href="https://loombolt.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Sparkle className="h-3 w-3"/>
            <span>Built with Loombolt</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}