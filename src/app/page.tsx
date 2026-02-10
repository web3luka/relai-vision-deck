"use client";

import Image from "next/image";
import {
  Coins,
  Globe2,
  Cpu,
  Lock,
  AlertTriangle,
  Slash,
  Users,
  Network,
  Bot,
  Layers3,
  FileCode2,
  ArrowRightLeft,
  ShieldCheck,
  Zap,
  Twitter,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

type SlideComponent = () => ReactNode;

type SlideDef = {
  id: number;
  label: string;
  Component: SlideComponent;
};

const slides: SlideDef[] = [
  { id: 0, label: "Intro", Component: HeroSlide },
  { id: 1, label: "Cover", Component: CoverSlide },
  { id: 2, label: "Problem", Component: ProblemSlide },
  { id: 3, label: "Vision", Component: VisionSlide },
  { id: 4, label: "How it works", Component: HowItWorksSlide },
  { id: 5, label: "Roadmap", Component: RoadmapSlide },
  { id: 6, label: "Closing", Component: ClosingSlide },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        setDirection("next");
        setCurrent((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setDirection("prev");
        setCurrent((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const ActiveSlide = slides[current].Component;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col">
      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
        </div>

        <section className="relative z-10 h-full flex flex-col">
          <header className="fixed inset-x-0 top-0 px-6 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-sm z-20">
            <div className="flex items-center gap-3">
              <Image
                src="/RelayAI-logo.png"
                alt="RelAI logo"
                width={48}
                height={48}
                className="rounded-md"
                priority
              />
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 font-bold">
                RelAI Pitch Deck
              </div>
            </div>
            <div className="text-xs text-zinc-500">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </div>
          </header>

          <div className="flex-1 overflow-y-auto pb-32 pt-16">
            <div
              key={current}
              className={
                direction === "next"
                  ? "slide-fade-enter-next"
                  : "slide-fade-enter-prev"
              }
            >
              <ActiveSlide />
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-20 pb-6">
        <div className="mx-auto flex max-w-md flex-col items-center gap-3">
          <div className="rounded-full border border-white/10 bg-black/40 px-4 py-1 text-[11px] text-zinc-400">
            Use arrow keys or click to navigate
          </div>

          <div className="flex w-full items-center justify-between rounded-3xl border border-white/10 bg-[#050827]/95 px-3 py-2 gap-3 shadow-lg shadow-black/40">
            <button
              type="button"
              onClick={() => {
                setDirection("prev");
                setCurrent((prev) => Math.max(0, prev - 1));
              }}
              disabled={current === 0}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-zinc-300 disabled:opacity-40 disabled:cursor-default hover:bg-white/5 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex flex-1 items-center justify-center gap-1">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    if (index === current) return;
                    setDirection(index > current ? "next" : "prev");
                    setCurrent(index);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    index === current
                      ? "w-8 bg-cyan-400"
                      : "w-2.5 bg-zinc-700 hover:bg-zinc-400"
                  }`}
                  aria-label={slide.label}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setDirection("next");
                setCurrent((prev) => Math.min(slides.length - 1, prev + 1));
              }}
              disabled={current === slides.length - 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-zinc-300 disabled:opacity-40 disabled:cursor-default hover:bg-white/5 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

type SlideShellProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  showLogo?: boolean;
};

function SlideShell({ eyebrow, title, subtitle, children, showLogo }: SlideShellProps) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col gap-8 px-6 py-10 md:py-16">
      {showLogo && (
        <div className="mb-2">
          <Image
            src="/RelayAI-logo.png"
            alt="RelAI logo"
            width={120}
            height={120}
            priority
          />
        </div>
      )}
      {eyebrow && (
        eyebrow === "RelAI and x402 Protocol" ? (
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              <span className="text-slate-50">RelAI </span>
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-sky-400 bg-clip-text text-transparent">
                x402 Protocol
              </span>
            </h2>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-400 to-cyan-400" />
          </div>
        ) : eyebrow === "Problem" || eyebrow === "Vision" || eyebrow === "How it works" ? (
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-sky-400 bg-clip-text text-transparent">
                {eyebrow}
              </span>
            </h2>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-400 to-cyan-400" />
          </div>
        ) : (
          <p className="text-xs uppercase tracking-[0.3em] text-sky-300/80">
            {eyebrow}
          </p>
        )
      )}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="space-y-4 text-sm text-zinc-300">{children}</div>
      )}
    </div>
  );
}

function HeroSlide(): ReactNode {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col items-center justify-center px-6 py-10 text-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-200">
          <span>RelAI</span>
          <span className="text-zinc-500">x402 Protocol</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            <span className="text-slate-50">RelAI </span>
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-sky-400 bg-clip-text text-transparent">
              Micropayments
            </span>
          </h1>
          <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-400 to-cyan-400" />
        </div>

        <p className="mx-auto max-w-xl text-sm md:text-lg text-zinc-400 leading-relaxed">
          The universal x402 payment infrastructure. APIs, campaigns, payment links and custodial wallets on one protocol.
        </p>
      </div>
    </div>
  );
}

function CoverSlide(): ReactNode {
  return (
    <SlideShell
      eyebrow="RelAI and x402 Protocol"
      title="The universal x402 payment layer"
      subtitle="RelAI is the infrastructure for x402 micropayments. Protect APIs, run campaigns, create payment links and manage custodial wallets across Solana and EVM chains."
      showLogo
    >
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <Coins size={32} className="mt-1 text-emerald-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">Pay per anything</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                API calls, campaign entries, content access or one time links. Every interaction settles instantly on chain.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <Globe2 size={32} className="mt-1 text-cyan-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">Multi-chain support</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Live on Solana, Base, Avalanche and SKALE Base with zero gas fees for users. RelAI sponsors all transaction costs.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <Cpu size={32} className="mt-1 text-fuchsia-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">SDK and facilitator</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                One npm package for client and server. The RelAI facilitator sponsors gas so users never pay transaction fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function ProblemSlide(): ReactNode {
  return (
    <SlideShell
      eyebrow="Problem"
      title="Web payments are stuck in the subscription era"
      subtitle="Whether it is APIs, content, campaigns or digital goods, paying online is still slow, gated and full of middlemen."
      showLogo
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <Lock size={32} className="mt-1 text-cyan-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">Subscription lock in</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Heavy subscriptions and enterprise contracts even for a single API call or one time content access.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <AlertTriangle size={32} className="mt-1 text-amber-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">Friction everywhere</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Long onboarding with KYC, invoices, regional restrictions and minimum commitments.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <Slash size={32} className="mt-1 text-rose-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">No micropayment primitive</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                There is no native way to charge per use at internet scale using existing payment rails.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <Users size={32} className="mt-1 text-cyan-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">Long tail left out</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Indie developers, creators and small businesses struggle to monetize digital goods at all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function VisionSlide(): ReactNode {
  return (
    <SlideShell
      eyebrow="Vision"
      title="A payment liquidity layer for the internet"
      subtitle="Every digital interaction becomes a liquid, programmable revenue stream that any app, agent or protocol can tap into."
      showLogo
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <Coins size={32} className="mt-1 text-emerald-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">Every interaction is value</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                API calls, campaign entries, payment links. Each interaction carries an on chain micropayment.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <Network size={32} className="mt-1 text-cyan-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">Shared liquidity layer</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Apps, APIs and campaigns plug into a common x402 layer instead of rebuilding billing from scratch.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <Bot size={32} className="mt-1 text-fuchsia-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">Native to agents and AI</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Agents and AI systems can consume APIs autonomously without manual billing flows.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <Layers3 size={32} className="mt-1 text-cyan-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">Transparent and composable</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Pricing and usage are transparent, verifiable and easily composed across protocols.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function HowItWorksSlide(): ReactNode {
  return (
    <SlideShell
      eyebrow="How it works"
      title="From HTTP 402 to on chain micropayments"
      subtitle="The x402 protocol turns any HTTP endpoint into a paid resource. The SDK handles signing, the facilitator settles on chain."
      showLogo
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <FileCode2 size={32} className="mt-1 text-cyan-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">1. Install the SDK</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                <code className="text-cyan-300">npm i @relai-fi/x402</code> — protect any Express endpoint with one line of middleware. Set price, wallet, network.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <ArrowRightLeft size={32} className="mt-1 text-cyan-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">2. Client signs payment</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                On 402, the SDK auto-signs an EIP-3009 authorization (EVM) or SPL transfer (Solana). One atomic signature, no approvals needed.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <ShieldCheck size={32} className="mt-1 text-emerald-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">3. Facilitator settles</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                The RelAI facilitator executes the on-chain transfer, sponsors gas fees, and confirms settlement in seconds.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="grid grid-cols-[auto,1fr] items-start gap-3">
            <Zap size={32} className="mt-1 text-amber-300" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-50">4. Instant settlement</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Revenue is streamed directly to your wallet with transparent, on chain accounting for every call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function RoadmapSlide(): ReactNode {
  return (
    <SlideShell
      eyebrow="Roadmap"
      title="Building the x402 payment standard"
      subtitle="Our path to becoming the default micropayment infrastructure for the internet."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">
              P1
            </div>
            <span className="text-sm font-medium text-emerald-300">Done</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mb-2">Launch & Foundation</h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>Token launch & DEX listing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>Live API payment utility (beta)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>First API integrations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>Strategic partnerships</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold">
              P2
            </div>
            <span className="text-sm font-medium text-cyan-300">Done</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mb-2">Growth & Adoption</h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              <span>@relai-fi/x402 SDK published on npm</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              <span>Multi-network live (Solana, Base, Avalanche, SKALE Base)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              <span>Multi-facilitator support (Thirdweb, Dexter, PayAI, OpenFacilitator)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              <span>Open public API registration</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">
              Q1
            </div>
            <span className="text-sm font-medium text-emerald-300">Done</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mb-2">Strategic Expansion</h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>Native RelAI facilitator live (facilitator.x402.fi)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>EIP-3009 transferWithAuthorization on all EVM networks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>Lottery campaigns with on-chain reward payouts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>Buyer Proxy custodial wallets with 2FA</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>Hackathon & grant applications</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold">
              Q2
            </div>
            <span className="text-sm font-medium text-amber-300">2026</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mb-2">Revenue & Growth</h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              <span>Premium & Enterprise tiers revenue activation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              <span>AI agent-to-agent payments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              <span>Tier 2 CEX listing applications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              <span>VC & funding program applications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              <span>Coordinated Marketing Campaigns</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold">
              Q3
            </div>
            <span className="text-sm font-medium text-cyan-300">2026</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mb-2">Ecosystem & Mobile</h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              <span>Governance DAO live</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              <span>Ecosystem Fund for RelAI-based startups</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              <span>Mobile App development (Seeker, Android, iOS)</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">
              Q4
            </div>
            <span className="text-sm font-medium text-emerald-300">2026</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mb-2">Institutional Scale</h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>Start-up company establishment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>Enterprise off-chain payment integrations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>Major Tier-1 CEX listings & institutional onboarding</span>
            </li>
          </ul>
        </div>
      </div>
    </SlideShell>
  );
}

function ClosingSlide(): ReactNode {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col items-center justify-center px-6 py-10 text-center">
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            <span className="text-slate-50">RelAI </span>
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-sky-400 bg-clip-text text-transparent">
              Micropayments
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-sm md:text-base text-zinc-400 leading-relaxed">
            Let&apos;s make every digital interaction a revenue event. Reach out to integrate RelAI x402 into your stack.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-zinc-400">
            <a
              href="https://relai.fi"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 hover:text-cyan-300 transition-colors"
            >
              <Globe2 className="h-4 w-4" />
              <span className="group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:via-pink-400 group-hover:to-sky-400 group-hover:bg-clip-text group-hover:text-transparent">
                relai.fi
              </span>
            </a>

            <span className="hidden h-5 w-px bg-white/10 md:inline-block" />

            <a
              href="https://x.com/relayaisolana"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-slate-100 transition-colors"
            >
              <Twitter className="h-4 w-4" />
              <span>@relayaisolana</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-zinc-400">
            <a
              href="mailto:hello@relai.fi"
              className="inline-flex items-center gap-2 hover:text-slate-100 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>hello@relai.fi</span>
            </a>
          </div>
        </div>

        <div className="pt-4 hidden">
          <div className="mx-auto h-40 w-40 rounded-2xl border border-white/15 bg-white/5 flex items-center justify-center">
            <div className="space-y-2 text-center">
              <div className="mx-auto h-20 w-20 rounded-lg bg-zinc-800/60" />
              <p className="text-[11px] text-zinc-500">QR code</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

