"use client";

import { ApplyModal } from "@/app/influencer/dashboard/campaigns/[id]/components/ApplyModal";
import { Button, Dialog } from "@chakra-ui/react";

export type ApplyButtonProps = {
  campaignId: string;
};

export function ApplyButton({ campaignId }: ApplyButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          bg="purple.600"
          color="white"
          px="6"
          py="3"
          rounded="lg"
          _hover={{ bg: "purple.500" }}
        >
          この案件に応募する
        </Button>
      </Dialog.Trigger>
      <ApplyModal campaignId={campaignId} />
    </Dialog.Root>
  );
}
