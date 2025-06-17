"use client";

import { showErrorToast, showSuccessToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  Button,
  CloseButton,
  Dialog,
  Icon,
  Portal,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuSend } from "react-icons/lu";

export type ApplyModalProps = {
  campaignId: string;
};

export function ApplyModal({ campaignId }: ApplyModalProps) {
  const [message, setMessage] = useState("");

  const applyMutation = api.influencer.campaigns.applyToCampaign.useMutation({
    onSuccess: (data) => {
      showSuccessToast(
        `「${data.application.campaignTitle}」への応募が完了しました`,
      );
      setMessage("");
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await applyMutation.mutateAsync({
        campaignId,
        message: message.trim() || undefined,
      });
    } catch (_error) {
      // エラーハンドリングはonErrorで行う
    }
  };

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content mx="4">
          <Dialog.Header>
            <Dialog.Title>応募メッセージ</Dialog.Title>
          </Dialog.Header>
          <form onSubmit={handleSubmit}>
            <Dialog.Body>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="案件への意気込みや、これまでの実績などをご記入ください"
                h="40"
                disabled={applyMutation.isPending}
              />
            </Dialog.Body>
            <Dialog.Footer gap="4">
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost" disabled={applyMutation.isPending}>
                  キャンセル
                </Button>
              </Dialog.ActionTrigger>
              <Button
                type="submit"
                bg="purple.600"
                color="white"
                px="6"
                _hover={{ bg: "purple.500" }}
                disabled={applyMutation.isPending}
              >
                {applyMutation.isPending ? (
                  <Spinner size="sm" />
                ) : (
                  <Icon as={LuSend} />
                )}
                応募する
              </Button>
            </Dialog.Footer>
          </form>
          <Dialog.CloseTrigger asChild>
            <CloseButton disabled={applyMutation.isPending} />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}
