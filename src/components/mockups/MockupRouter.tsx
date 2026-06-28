import React, { Suspense } from "react";
import { cn } from "@/lib/utils";

// Workforce
import { DesktopDashboard } from "./pathways/workforce/DesktopDashboard";
import { MobileTimesheet } from "./pathways/workforce/MobileTimesheet";
import { ManagerApproval } from "./pathways/workforce/ManagerApproval";
import { ExtensionTimer } from "./pathways/workforce/ExtensionTimer";
import { WatchReminder } from "./pathways/workforce/WatchReminder";
import { ReportsDashboard } from "./pathways/workforce/ReportsDashboard";
import { DesignSystemComponents } from "./pathways/workforce/DesignSystemComponents";

// Analytics
import { ExecutiveDashboard } from "./pathways/analytics/ExecutiveDashboard";
import { KPICardSystem } from "./pathways/analytics/KPICardSystem";
import { AnalyticsGraphLayout } from "./pathways/analytics/AnalyticsGraphLayout";
import { FilterAndReportBuilder } from "./pathways/analytics/FilterAndReportBuilder";
import { AIInsightPanel } from "./pathways/analytics/AIInsightPanel";
import { MobileKPISummary } from "./pathways/analytics/MobileKPISummary";

// Defence
import { SecureDocumentDashboard } from "./pathways/defence/SecureDocumentDashboard";

// Shared Generics for remaining pathways (customized per pathway)
import { MockupFrame } from "./primitives/MockupFrame";
import { PhoneMockup } from "./primitives/PhoneMockup";

interface MockupRouterProps {
  label: string;
  className?: string;
}

export function MockupRouter({ label, className = "" }: MockupRouterProps) {
  const getMockup = () => {
    switch (label) {
      // Existing Pathways
      case "Desktop workforce dashboard placeholder": return <DesktopDashboard />;
      case "Executive dashboard placeholder": return <ExecutiveDashboard />;
      case "WebflowMarketingSite": return <WebflowMarketingSite title="Aeturnum" />;
      case "Food court discovery screen placeholder": return <FoodMobileView title="Discover Vendors" type="grid" />;
      case "Product listing placeholder": return <CannabisWebView title="Shop All" type="grid" />;
      case "Secure document dashboard placeholder": return <SecureDocumentDashboard />;
      case "Borrower dashboard placeholder": return <FintechWebView title="Borrower Portal" type="dashboard" />;
      
      // New pathways mapped to requested generic components
      case "Pet profile or social feed placeholder": return <MobileAppMockup title="Social Feed" color="orange" />;
      case "Workout plan or progress tracking placeholder": return <WellnessMockup title="Fitness Plan" color="emerald" />;
      case "Safety alert dashboard placeholder": return <OpsMockup title="Safety Alerts" color="red" />;
      case "Flashcard or quiz flow placeholder": return <EducationMockup title="Quiz Flow" color="blue" />;
      case "Mood tracker or journal placeholder": return <WellnessMockup title="Mood Tracker" color="indigo" />;
      case "Meditation or habit progress placeholder": return <WellnessMockup title="Habit Progress" color="teal" />;
      case "Campaign dashboard or reward flow placeholder": return <DashboardMockup title="Campaigns" color="rose" />;
      case "Editorial dashboard or article management placeholder": return <PublishingMockup title="Editorial" color="stone" />;
      case "Game home screen or reward progress placeholder": return <GameMockup title="Game UI" color="violet" />;

      // Fallback
      default: return null;
    }
  };

  const Mockup = getMockup();

  if (Mockup) {
    return (
      <div className={cn("w-full h-full flex items-center justify-center p-4 md:p-8 relative", className)}>
        <Suspense fallback={<FallbackPlaceholder label="Loading mockup..." className={className} />}>
          {Mockup}
        </Suspense>
      </div>
    );
  }

  return <FallbackPlaceholder label={label} className={className} />;
}

// --- NEW REQUIRED GENERICS ---
function DashboardMockup({ title, color = "blue" }: { title: string, color?: string }) {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-[var(--color-bg)] flex flex-col p-8">
      <div className="h-8 w-48 bg-[var(--color-fg)] opacity-20 rounded-md mb-8" />
      <div className="flex-1 grid grid-cols-3 gap-6">
        <div className="col-span-2 border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)]" />
        <div className="col-span-1 border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)]" />
      </div>
    </MockupFrame>
  );
}

function MobileAppMockup({ title, color = "blue" }: { title: string, color?: string }) {
  return (
    <PhoneMockup className="scale-75 origin-center shadow-2xl" bodyClassName={`bg-neutral-50 dark:bg-neutral-900 flex flex-col`}>
      <div className="h-16 border-b border-[var(--color-line)] flex items-center px-4"><div className="h-4 w-24 bg-[var(--color-fg)] opacity-20 rounded-md" /></div>
      <div className="flex-1 p-4 flex flex-col gap-4">
        {[1,2,3].map(i => <div key={i} className="h-20 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl" />)}
      </div>
    </PhoneMockup>
  );
}

function CommerceMockup({ title, color = "orange" }: { title: string, color?: string }) {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-[var(--color-surface)] p-8">
      <div className="grid grid-cols-4 gap-6 h-full">
        {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="bg-[var(--color-bg)] border border-[var(--color-line)] rounded-lg" />)}
      </div>
    </MockupFrame>
  );
}

function FinanceMockup({ title, color = "emerald" }: { title: string, color?: string }) {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-[var(--color-surface)] p-8 flex flex-col gap-6">
      <div className="h-16 bg-[var(--color-bg)] border border-[var(--color-line)] rounded-xl flex items-center px-6"><div className="h-4 w-32 bg-[var(--color-fg)] opacity-20 rounded-md" /></div>
      <div className="flex-1 bg-[var(--color-bg)] border border-[var(--color-line)] rounded-xl" />
    </MockupFrame>
  );
}

function WellnessMockup({ title, color = "teal" }: { title: string, color?: string }) {
  return (
    <PhoneMockup className="scale-75 origin-center shadow-2xl" bodyClassName={`bg-[var(--color-surface)] p-6 flex flex-col items-center justify-center text-center gap-4`}>
       <div className={`w-24 h-24 rounded-full border-4 border-emerald-500/50 mb-4 flex items-center justify-center`}><div className="w-16 h-16 rounded-full bg-emerald-500/20" /></div>
       <div className={`h-6 w-full bg-[var(--color-fg)] opacity-20 rounded-md`} />
       <div className={`h-4 w-2/3 bg-[var(--color-fg)] opacity-10 rounded-md`} />
       <div className={`mt-auto h-12 w-full bg-[var(--color-bg)] border border-[var(--color-line)] rounded-full`} />
    </PhoneMockup>
  );
}

function EducationMockup({ title, color = "blue" }: { title: string, color?: string }) {
  return (
    <PhoneMockup className="scale-75 origin-center shadow-2xl" bodyClassName={`bg-[var(--color-surface)] p-6 flex flex-col gap-6`}>
       <div className={`h-4 w-1/3 bg-[var(--color-fg)] opacity-20 rounded-md mx-auto`} />
       <div className={`flex-1 bg-[var(--color-bg)] border border-[var(--color-line)] rounded-2xl`} />
       <div className="grid grid-cols-2 gap-4">
         <div className={`h-12 bg-[var(--color-bg)] border border-[var(--color-line)] rounded-xl`} />
         <div className={`h-12 bg-[var(--color-bg)] border border-[var(--color-line)] rounded-xl`} />
       </div>
    </PhoneMockup>
  );
}

function PublishingMockup({ title, color = "stone" }: { title: string, color?: string }) {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-[var(--color-surface)] flex">
      <div className="w-48 border-r border-[var(--color-line)] bg-[var(--color-bg)] p-6 flex flex-col gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-4 bg-[var(--color-fg)] opacity-10 rounded-sm" />)}
      </div>
      <div className="flex-1 p-8 flex flex-col gap-4">
        <div className="h-8 w-1/2 bg-[var(--color-fg)] opacity-20 rounded-md mb-4" />
        <div className="flex-1 bg-[var(--color-bg)] border border-[var(--color-line)] rounded-xl" />
      </div>
    </MockupFrame>
  );
}

function GameMockup({ title, color = "violet" }: { title: string, color?: string }) {
  return (
    <PhoneMockup className="scale-75 origin-center shadow-2xl" bodyClassName={`bg-violet-900 p-4 flex flex-col gap-4`}>
       <div className="flex justify-between items-center"><div className="w-16 h-6 bg-white/20 rounded-full" /><div className="w-16 h-6 bg-white/20 rounded-full" /></div>
       <div className={`flex-1 bg-white/10 rounded-3xl border border-white/20`} />
       <div className={`h-16 bg-white/20 rounded-2xl`} />
    </PhoneMockup>
  );
}

function OpsMockup({ title, color = "red" }: { title: string, color?: string }) {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-[#111] p-8 flex flex-col gap-6 text-white border border-red-900/30">
      <div className="h-8 w-48 bg-red-500/20 rounded-md" />
      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="border border-red-900/30 rounded-xl bg-red-950/10 p-6"><div className="h-4 w-32 bg-red-500/30 rounded-sm" /></div>
        <div className="border border-red-900/30 rounded-xl bg-red-950/10 p-6"><div className="h-4 w-32 bg-red-500/30 rounded-sm" /></div>
      </div>
    </MockupFrame>
  );
}

// --- DEFENCE GENERICS (Mono font, severe, borders) ---
function DefenceDataView({ title, type }: { title: string, type: string }) {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-[#050505] font-mono text-[var(--color-fg)] flex flex-col border border-neutral-800">
      <div className="h-12 border-b border-neutral-800 flex items-center justify-between px-4">
        <span className="text-[10px] tracking-widest uppercase text-emerald-600">{title}</span>
        <div className="h-4 w-24 bg-neutral-800 rounded-sm" />
      </div>
      <div className="p-6 flex-1 flex flex-col gap-4">
         <div className="h-6 w-1/3 bg-neutral-800/50 rounded-sm" />
         <div className="flex-1 border border-neutral-800 rounded p-4 flex flex-col gap-3">
           {[1,2,3,4].map(i => (
             <div key={i} className="h-8 border-b border-neutral-800/50 flex items-center gap-4">
               <div className="w-16 h-4 bg-emerald-900/30 rounded-sm" />
               <div className="flex-1 h-2 bg-neutral-800 rounded-sm" />
             </div>
           ))}
         </div>
      </div>
    </MockupFrame>
  );
}

function DefenceMobileView({ title }: { title: string }) {
  return (
    <PhoneMockup className="!border-neutral-800" bodyClassName="bg-[#050505] font-mono flex flex-col">
      <div className="h-12 border-b border-neutral-800 flex items-center px-4">
        <span className="text-[10px] tracking-widest text-emerald-600 uppercase">{title}</span>
      </div>
      <div className="p-4 flex flex-col gap-4 flex-1">
        {[1,2,3,4].map(i => (
           <div key={i} className="p-4 border border-neutral-800 rounded flex flex-col gap-2">
             <div className="h-3 w-1/2 bg-neutral-800 rounded-sm" />
             <div className="h-2 w-3/4 bg-neutral-800/50 rounded-sm" />
           </div>
        ))}
      </div>
    </PhoneMockup>
  );
}

// --- FOOD COURT GENERICS (Vibrant, rounded, commerce) ---
function FoodMobileView({ title, type }: { title: string, type: string }) {
  return (
    <PhoneMockup className="!border-orange-500/10" bodyClassName="bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      <div className="h-16 flex items-center justify-between px-5">
        <div className="h-6 w-24 bg-orange-500 rounded-full opacity-80" />
        <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-5 flex flex-col gap-4">
        <div className="h-8 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="grid grid-cols-2 gap-3 mt-2">
          {[1,2,3,4].map(i => (
             <div key={i} className="aspect-square rounded-2xl bg-white dark:bg-black shadow-sm border border-neutral-100 dark:border-neutral-800 p-3 flex flex-col justify-end">
               <div className="h-3 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
               <div className="h-3 w-1/2 bg-orange-500/50 rounded-sm mt-2" />
             </div>
          ))}
        </div>
      </div>
    </PhoneMockup>
  );
}

function FoodTabletView({ title }: { title: string }) {
  return (
    <MockupFrame className="max-w-3xl aspect-[4/3] rounded-3xl" bodyClassName="bg-white dark:bg-neutral-950 flex">
      <div className="w-20 border-r border-neutral-100 dark:border-neutral-800 flex flex-col items-center py-6 gap-6">
        <div className="w-10 h-10 rounded-full bg-orange-500" />
        {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900" />)}
      </div>
      <div className="flex-1 p-6 flex flex-col gap-6">
        <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="flex-1 grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-4">
            {[1,2,3].map(i => (
               <div key={i} className="h-24 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-4 flex items-center gap-4">
                 <div className="w-16 h-16 rounded-xl bg-neutral-100 dark:bg-neutral-900" />
                 <div className="flex-1 flex flex-col gap-2"><div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-sm" /><div className="h-3 w-20 bg-orange-500/50 rounded-sm" /></div>
               </div>
            ))}
          </div>
          <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900" />
        </div>
      </div>
    </MockupFrame>
  );
}

// --- ENTERPRISE WEB GENERICS (Marketing, clean, spacious) ---
function WebflowMarketingSite({ title }: { title: string }) {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-white dark:bg-neutral-950 flex flex-col overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <div className="h-16 shrink-0 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between px-8 sticky top-0 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-pink-500 rounded-sm" />
          <div className="h-4 w-24 bg-neutral-800 dark:bg-neutral-200 rounded-sm font-semibold tracking-tight text-sm flex items-center">{title}</div>
        </div>
        <div className="flex gap-6">
          <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
        </div>
        <div className="h-8 w-28 bg-pink-500 text-white text-[10px] flex items-center justify-center font-semibold rounded-full">Contact (HubSpot)</div>
      </div>
      
      {/* Hero Section */}
      <div className="shrink-0 flex flex-col items-center justify-center p-16 text-center gap-6 border-b border-neutral-100 dark:border-neutral-800">
        <div className="px-3 py-1 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-[10px] font-bold rounded-full uppercase tracking-wider mb-2">AI-Powered Engineering</div>
        <div className="h-12 w-3/4 max-w-xl bg-neutral-800 dark:bg-neutral-200 rounded-lg opacity-90" />
        <div className="h-4 w-2/3 max-w-md bg-neutral-400 dark:bg-neutral-600 rounded-sm" />
        <div className="flex gap-4 mt-4">
          <div className="h-10 w-36 bg-neutral-900 dark:bg-neutral-100 rounded-full" />
          <div className="h-10 w-36 border border-neutral-200 dark:border-neutral-800 rounded-full" />
        </div>
      </div>

      {/* Pathways / Services (Webflow CMS Cards) */}
      <div className="shrink-0 p-12 bg-neutral-50 dark:bg-neutral-900 flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-3">
            <div className="h-6 w-48 bg-neutral-800 dark:bg-neutral-200 rounded-md" />
            <div className="h-3 w-64 bg-neutral-400 dark:bg-neutral-600 rounded-sm" />
          </div>
          <div className="h-8 w-32 border border-neutral-200 dark:border-neutral-800 rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white dark:bg-neutral-950 p-5 rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col gap-3 hover:border-pink-500/50 transition-colors">
              <div className="h-10 w-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg" />
              <div className="h-4 w-3/4 bg-neutral-800 dark:bg-neutral-200 rounded-sm mt-2" />
              <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded-sm" />
              <div className="h-3 w-4/5 bg-neutral-200 dark:bg-neutral-700 rounded-sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Proof / Logos */}
      <div className="shrink-0 p-12 flex flex-col items-center gap-6 border-t border-neutral-100 dark:border-neutral-800">
        <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">Trusted by Enterprise</div>
        <div className="flex gap-8 opacity-40">
          {[1,2,3,4,5].map(i => <div key={i} className="h-6 w-24 bg-neutral-800 dark:bg-neutral-200 rounded-sm" />)}
        </div>
      </div>
    </MockupFrame>
  );
}
function EnterpriseWebView({ title, type }: { title: string, type: string }) {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-white dark:bg-neutral-950 flex flex-col">
      <div className="h-16 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between px-8">
        <div className="h-4 w-24 bg-blue-600 rounded-sm" />
        <div className="flex gap-6"><div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" /><div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" /></div>
        <div className="h-8 w-24 bg-blue-600 rounded-full" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center gap-6">
        <div className="h-12 w-3/4 max-w-lg bg-neutral-800 dark:bg-neutral-200 rounded-lg opacity-90" />
        <div className="h-4 w-1/2 max-w-sm bg-neutral-400 dark:bg-neutral-600 rounded-sm" />
        <div className="h-4 w-1/3 max-w-xs bg-neutral-400 dark:bg-neutral-600 rounded-sm" />
        <div className="flex gap-4 mt-6">
          <div className="h-12 w-36 bg-blue-600 rounded-full" />
          <div className="h-12 w-36 border-2 border-neutral-200 dark:border-neutral-800 rounded-full" />
        </div>
      </div>
    </MockupFrame>
  );
}

function EnterpriseMobileView({ title }: { title: string }) {
  return (
    <PhoneMockup bodyClassName="bg-white dark:bg-neutral-950 flex flex-col">
       <div className="h-14 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between px-5">
         <div className="h-4 w-20 bg-blue-600 rounded-sm" />
         <div className="space-y-1"><div className="w-5 h-0.5 bg-neutral-800 dark:bg-neutral-200" /><div className="w-5 h-0.5 bg-neutral-800 dark:bg-neutral-200" /></div>
       </div>
       <div className="p-6 flex flex-col gap-4 items-center text-center mt-6">
         <div className="h-8 w-full bg-neutral-800 dark:bg-neutral-200 rounded-md" />
         <div className="h-3 w-3/4 bg-neutral-400 rounded-sm" />
         <div className="h-10 w-full bg-blue-600 rounded-full mt-4" />
       </div>
    </PhoneMockup>
  );
}

// --- CANNABIS COMMERCE GENERICS (Earthy, regulated, cards) ---
function CannabisWebView({ title, type }: { title: string, type: string }) {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-[#F9F8F6] dark:bg-[#1A1A18] flex flex-col">
      <div className="h-16 flex items-center justify-between px-8 border-b border-[#E5E4E0] dark:border-[#2A2A28]">
         <div className="h-6 w-32 bg-[#4A5D23] rounded-sm" />
      </div>
      <div className="p-8 flex-1 grid grid-cols-4 gap-6">
         <div className="col-span-1 flex flex-col gap-4">
           <div className="h-4 w-20 bg-[#4A5D23] opacity-60 rounded-sm mb-4" />
           {[1,2,3,4].map(i => <div key={i} className="h-3 w-full bg-[#E5E4E0] dark:bg-[#2A2A28] rounded-sm" />)}
         </div>
         <div className="col-span-3 grid grid-cols-3 gap-6">
           {[1,2,3,4,5,6].map(i => (
             <div key={i} className="bg-white dark:bg-[#222220] rounded-xl border border-[#E5E4E0] dark:border-[#2A2A28] overflow-hidden flex flex-col shadow-sm">
               <div className="h-32 bg-[#E5E4E0]/50 dark:bg-[#2A2A28]/50" />
               <div className="p-4 flex flex-col gap-2">
                 <div className="h-4 w-3/4 bg-neutral-800 dark:bg-neutral-200 rounded-sm" />
                 <div className="h-3 w-1/3 bg-[#4A5D23] rounded-sm" />
               </div>
             </div>
           ))}
         </div>
      </div>
    </MockupFrame>
  );
}

function CannabisMobileView({ title, type }: { title: string, type: string }) {
  return (
    <PhoneMockup bodyClassName="bg-[#F9F8F6] dark:bg-[#1A1A18] flex flex-col">
       <div className="p-6 flex-1 flex flex-col justify-center gap-6 text-center">
         <div className="h-12 w-12 mx-auto bg-[#4A5D23] rounded-full" />
         <div className="h-6 w-full bg-neutral-800 dark:bg-neutral-200 rounded-md" />
         <div className="h-4 w-3/4 mx-auto bg-neutral-500 rounded-sm" />
         <div className="h-12 w-full bg-[#4A5D23] rounded-full mt-4" />
         <div className="h-12 w-full border border-[#4A5D23] rounded-full" />
       </div>
    </PhoneMockup>
  );
}

// --- FINTECH GENERICS (Trust, blue, dashboards) ---
function FintechWebView({ title, type }: { title: string, type: string }) {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-slate-50 dark:bg-slate-950 flex">
      <div className="w-56 bg-slate-900 text-white p-6 flex flex-col gap-6">
        <div className="h-6 w-32 bg-white rounded-sm opacity-90" />
        <div className="flex flex-col gap-3 mt-8">
           {[1,2,3,4].map(i => <div key={i} className="h-4 w-full bg-white/20 rounded-sm" />)}
        </div>
      </div>
      <div className="flex-1 p-8 flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div className="h-8 w-48 bg-slate-800 dark:bg-slate-200 rounded-md" />
          <div className="h-10 w-32 bg-blue-600 rounded-md" />
        </div>
        <div className="grid grid-cols-3 gap-6">
           {[1,2,3].map(i => (
             <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
               <div className="h-3 w-20 bg-slate-400 rounded-sm" />
               <div className="h-8 w-32 bg-slate-800 dark:bg-slate-200 rounded-md" />
             </div>
           ))}
        </div>
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800" />
      </div>
    </MockupFrame>
  );
}

function FintechMobileView({ title, type }: { title: string, type: string }) {
  return (
    <PhoneMockup bodyClassName="bg-slate-50 dark:bg-slate-950 flex flex-col">
       <div className="p-6 pb-2">
         <div className="h-6 w-32 bg-slate-800 dark:bg-slate-200 rounded-md" />
       </div>
       <div className="p-6 flex-1 flex flex-col gap-4">
         {[1,2,3,4].map(i => (
           <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
             <div className="flex gap-3 items-center">
               <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800" />
               <div className="flex flex-col gap-1.5"><div className="h-3 w-24 bg-slate-800 dark:bg-slate-200 rounded-sm" /><div className="h-2 w-16 bg-slate-400 rounded-sm" /></div>
             </div>
             <div className="h-4 w-16 bg-blue-600 rounded-sm opacity-80" />
           </div>
         ))}
       </div>
    </PhoneMockup>
  );
}

// --- AI ASSISTANT GENERICS (Chat, panels, modern) ---
function AIWebView({ title, type }: { title: string, type: string }) {
  return (
    <MockupFrame className="max-w-4xl aspect-[16/10]" bodyClassName="bg-[var(--color-surface)] flex">
      <div className="flex-1 p-8 flex flex-col gap-6 justify-center">
         <div className="h-8 w-64 bg-[var(--color-fg)] rounded-md opacity-90 mx-auto" />
         <div className="max-w-xl w-full mx-auto flex flex-col gap-4">
           <div className="bg-[var(--color-surface-2)] rounded-2xl rounded-tl-sm p-4 border border-[var(--color-line)] mr-12">
             <div className="h-3 w-full bg-[var(--color-fg)] rounded-sm opacity-80 mb-2" />
             <div className="h-3 w-3/4 bg-[var(--color-fg)] rounded-sm opacity-80" />
           </div>
           <div className="bg-purple-500/10 text-purple-500 rounded-2xl rounded-tr-sm p-4 border border-purple-500/20 ml-12">
             <div className="h-3 w-full bg-purple-500 opacity-90 rounded-sm mb-2" />
             <div className="h-3 w-1/2 bg-purple-500 opacity-90 rounded-sm" />
           </div>
         </div>
         <div className="max-w-2xl w-full mx-auto h-14 bg-[var(--color-bg)] border border-[var(--color-line)] rounded-full mt-8 flex items-center px-4 justify-between">
           <div className="h-3 w-40 bg-[var(--color-line)] rounded-sm" />
           <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center" />
         </div>
      </div>
    </MockupFrame>
  );
}

function AIMobileView({ title }: { title: string }) {
  return (
    <PhoneMockup bodyClassName="bg-[var(--color-bg)] flex flex-col p-4">
      <div className="flex-1 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-line)] flex flex-col p-4 justify-end gap-4 shadow-sm">
         <div className="bg-[var(--color-surface-2)] p-3 rounded-xl rounded-bl-sm"><div className="h-2 w-full bg-[var(--color-fg)] rounded-sm opacity-70" /></div>
         <div className="bg-purple-500/10 p-3 rounded-xl rounded-br-sm ml-8"><div className="h-2 w-full bg-purple-500 rounded-sm" /></div>
      </div>
      <div className="h-12 w-full rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] mt-4 px-4 flex items-center"><div className="h-2 w-32 bg-[var(--color-line)] rounded-sm" /></div>
    </PhoneMockup>
  );
}

// Fallback Placeholder
function FallbackPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div 
      className={cn(
        "relative w-full h-full min-h-[200px] flex items-center justify-center p-6 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)] border border-[var(--color-line)] rounded-2xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        className
      )}
    >
      <div className="relative flex flex-col items-center gap-3 text-center opacity-60">
        <span className="text-sm font-medium tracking-wide">
          {label}
        </span>
      </div>
    </div>
  );
}
