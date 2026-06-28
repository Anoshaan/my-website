"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button 
      variant="secondary"
      onClick={() => {
        if (window.history.length > 2) {
          router.back();
        } else {
          router.push('/selected-work');
        }
      }}
      leadingIcon={
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      }
    >
      Back
    </Button>
  );
}
