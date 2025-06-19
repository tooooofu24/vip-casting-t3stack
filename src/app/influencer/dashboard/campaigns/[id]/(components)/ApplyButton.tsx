"use client";

import { ApplyModal } from "@/app/influencer/dashboard/campaigns/[id]/(components)/ApplyModal";
import { Button, Dialog } from "@chakra-ui/react";

export type ApplyButtonProps = {
  campaignId: string;
};

export function ApplyButton({ campaignId }: ApplyButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>この案件に応募する</Button>
      </Dialog.Trigger>
      <ApplyModal campaignId={campaignId} />
    </Dialog.Root>
  );
}
