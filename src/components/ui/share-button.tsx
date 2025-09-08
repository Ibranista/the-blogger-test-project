"use client";

import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { toast } from "react-toastify";

export default function ShareButton() {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!", { autoClose: 2000 });
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1 text-xs cursor-pointer"
      onClick={handleShare}
    >
      <Share className="h-3 w-3" />
      Share
    </Button>
  );
}
