import { createFileRoute } from "@tanstack/react-router";
import { Gift, Shield, Clock, Star, ArrowRight, CheckCircle } from "lucide-react";
import { useState, useRef, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Claim Your $750 Apple Cash Reward" },
      { name: "description", content: "Get a $750 Apple Cash reward. Limited-time offer available for eligible participants. Claim your reward today." },
      { property: "og:title", content: "Claim Your $750 Apple Cash Reward" },
      { property: "og:description", content: "Get a $750 Apple Cash reward. Limited-time offer available for eligible participants." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const AFFILIATE_URL = "https://giftclick.org/aff_c?offer_id=4676&aff_id=158792";

const reviews = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    rating: 5,
    text: "I honestly didn't think it was real, but I followed the steps and the $750 hit my Apple Cash the same week. Super easy!",
  },
  {
    name: "James R.",
    location: "Chicago, IL",
    rating: 5,
    text: "Clean process, no hidden fees. Took about 10 minutes total. Customer support was helpful when I had a question.",
  },
  {
    name: "Emily T.",
    location: "Miami, FL",
    rating: 5,
    text: "My friend sent me the link and I was skeptical, but it worked. The reward showed up faster than expected.",
  },
  {
    name: "David K.",
    location: "Seattle, WA",
    rating: 5,
    text: "Best reward offer I've tried. The instructions were clear and I received the full $750 without any hassle.",
  },
  {
    name: "Lisa P.",
    location: "Denver, CO",
    rating: 5,
    text: "Great experience! I was approved quickly and the money was in my account within days. Highly recommend.",
  },
  {
    name: "Michael B.",
    location: "Atlanta, GA",
    rating: 5,
    text: "Legit offer. Didn't take long to complete the required steps and the payout was exactly what they promised.",
  },
];

const steps = [
  {
    icon: CheckCircle,
    title: "Verify Eligibility",
    description: "Click the claim button and answer a few quick questions to confirm you qualify.",
  },
  {
    icon: Gift,
    title: "Complete the Steps",
    description: "Follow the simple instructions to finish the required offers at your own pace.",
  },
  {
    icon: Clock,
    title: "Receive Your Reward",
    description: "Once verified, your $750 Apple Cash reward is sent directly to you.",
  },
];

function ClaimButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";
  const variantClasses =
    variant === "primary"
      ? "bg-apple-gold text-apple-dark shadow-apple hover:shadow-apple-lg"
      : "bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20";

  return (
    <a
      href={AFFILIATE_URL}
      className={`${baseClasses} ${variantClasses} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      {variant === "primary" && <ArrowRight className="h-5 w-5" />}
    </a>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-apple-gold text-apple-gold" />
      ))}
    </div>
  );
}

function RotatableCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const startRotation = (clientX: number, clientY: number) => {
    isDragging.current = true;
    lastPosition.current = { x: clientX, y: clientY };
  };

  const updateRotation = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const deltaX = clientX - lastPosition.current.x;
    const deltaY = clientY - lastPosition.current.y;
    lastPosition.current = { x: clientX, y: clientY };
    setRotation((prev) => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));
  };

  const stopRotation = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={ref}
      className={`${className} cursor-grab active:cursor-grabbing`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: "preserve-3d",
        touchAction: "none",
      }}
      onMouseDown={(e) => startRotation(e.clientX, e.clientY)}
      onMouseMove={(e) => updateRotation(e.clientX, e.clientY)}
      onMouseUp={stopRotation}
      onMouseLeave={stopRotation}
      onTouchStart={(e) => startRotation(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => {
        e.preventDefault();
        updateRotation(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchEnd={stopRotation}
    >
      {children}
    </div>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-apple-dark px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-apple-glow opacity-50" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Claim Your{" "}
                <span className="text-apple-gold">$750</span>{" "}
                Apple Cash Reward
              </h1>
              <p className="mt-6 text-lg text-white/70 sm:text-xl">
                Join thousands who have already received their Apple Cash reward. Quick eligibility check, simple steps, real payout.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <ClaimButton variant="primary">Claim $750 Now</ClaimButton>
                <ClaimButton variant="secondary" className="px-6 py-3 text-base">
                  Learn More
                </ClaimButton>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/60 lg:justify-start">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure & Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Fast Payout</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md" style={{ perspective: "1000px" }}>
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-apple-gold/20 to-transparent blur-2xl" />
                <RotatableCard className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/15 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
                  <div className="mb-6 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-16 w-16 text-white" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium uppercase tracking-wider text-white/60">Apple Cash Reward</p>
                    <p className="mt-2 text-6xl font-bold text-apple-gold">$750</p>
                    <p className="mt-4 text-white/70">Available for eligible participants today</p>
                  </div>
                </RotatableCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How It Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Getting your reward is straightforward. Complete these three steps and receive your $750 Apple Cash.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-apple-gold/10 text-apple-gold">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mb-3 text-sm font-semibold text-muted-foreground">Step {index + 1}</div>
                <h3 className="text-xl font-semibold text-card-foreground">{step.title}</h3>
                <p className="mt-3 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <ClaimButton variant="primary">Start Your Claim</ClaimButton>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What People Are Saying</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Real participants who completed the offer and received their Apple Cash reward.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <StarRating rating={review.rating} />
                <p className="mt-4 text-card-foreground leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-apple-gold/10 font-semibold text-apple-gold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-apple-dark p-8 text-center shadow-2xl sm:p-12 lg:p-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Claim Your $750 Apple Cash?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Spots are limited. Click below to check your eligibility and start your claim in under two minutes.
          </p>
          <div className="mt-8">
            <ClaimButton variant="primary" className="w-full sm:w-auto">
              Claim My Reward
            </ClaimButton>
          </div>
          <p className="mt-4 text-sm text-white/50">
            No purchase required. Must be 18+ and meet eligibility requirements.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Apple Cash Rewards. All rights reserved.</p>
          <p className="mt-2">
            This is an independent reward site and is not affiliated with or endorsed by Apple Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
