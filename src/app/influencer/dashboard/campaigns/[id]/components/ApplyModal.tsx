"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Icon,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { LuSend } from "react-icons/lu";

export function ApplyModal() {
  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content mx="4">
          <Dialog.Header>
            <Dialog.Title>応募メッセージ</Dialog.Title>
          </Dialog.Header>
          <form>
            <Dialog.Body>
              <Textarea
                placeholder="案件への意気込みや、これまでの実績などをご記入ください"
                h="40"
                required
              />
            </Dialog.Body>
            <Dialog.Footer gap="4">
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost">キャンセル</Button>
              </Dialog.ActionTrigger>
              <Button
                type="submit"
                bg="purple.600"
                color="white"
                px="6"
                _hover={{ bg: "purple.500" }}
              >
                <Icon as={LuSend} />
                応募する
              </Button>
            </Dialog.Footer>
          </form>
          <Dialog.CloseTrigger asChild>
            <CloseButton />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}
