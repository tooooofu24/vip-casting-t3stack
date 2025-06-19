"use client";

import { ApplyModal } from "@/app/influencer/dashboard/campaigns/[id]/(components)/ApplyModal";
import { Button, Dialog, Icon } from "@chakra-ui/react";
import { LuSend } from "react-icons/lu";

export type ApplyButtonProps = {
  campaignId: string;
};

export function ApplyButton({ campaignId }: ApplyButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="lg" width="100%">
          <Icon as={LuSend} />
          この案件に応募する
        </Button>
      </Dialog.Trigger>
      <ApplyModal campaignId={campaignId} />
    </Dialog.Root>
  );
}
