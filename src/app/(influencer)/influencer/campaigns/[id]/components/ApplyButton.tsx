"use client";

import { ApplyModal } from "@/app/(influencer)/influencer/campaigns/[id]/components/ApplyModal";
import { Button, Dialog } from "@chakra-ui/react";

export function ApplyButton() {
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
      <ApplyModal />
    </Dialog.Root>
  );
}
