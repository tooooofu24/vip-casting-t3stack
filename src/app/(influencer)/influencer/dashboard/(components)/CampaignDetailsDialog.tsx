"use client";

import {
  Alert,
  Box,
  Button,
  Dialog,
  Icon,
  Portal,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { type Campaign } from "@prisma/client";
import {
  LuCalendar,
  LuCircleAlert,
  LuFileText,
  LuMessageSquare,
  LuX,
} from "react-icons/lu";

// モックデータ
const mockDeliverables = [
  "商品レビュー投稿（1200文字以上）",
  "商品使用動画（60秒以上）",
  "ストーリーズ投稿（3件）",
];

type Props = {
  isOpen: boolean;
  onClose: (e: { open: boolean }) => void;
  campaign: Campaign | null;
};

export default function CampaignDetailsDialog({
  isOpen,
  onClose,
  campaign,
}: Props) {
  if (!campaign) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="2xl">
            <Dialog.Header>
              <Stack direction="row" justify="space-between" align="center">
                <Box>
                  <Dialog.Title>
                    <Text fontSize="2xl" fontWeight="bold">
                      {campaign.title}
                    </Text>
                  </Dialog.Title>
                  <Text color="gray.600" mt={1}>
                    {campaign.companyId}
                  </Text>
                </Box>
                <Dialog.CloseTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Icon as={LuX} />
                  </Button>
                </Dialog.CloseTrigger>
              </Stack>
            </Dialog.Header>

            <Dialog.Body>
              <SimpleGrid columns={2} gap={6} mb={6}>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    キャンペーン期間
                  </Text>
                  <Stack direction="row" align="center" color="gray.700">
                    <Icon as={LuCalendar} />
                    <Text>締切: {campaign.deadline.toLocaleDateString()}</Text>
                  </Stack>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    報酬
                  </Text>
                  <Text color="gray.700">
                    ¥{campaign.budgetFrom.toLocaleString()} 〜 ¥
                    {campaign.budgetTo.toLocaleString()}
                  </Text>
                </Box>
              </SimpleGrid>

              <Box mb={6}>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  成果物
                </Text>
                <VStack align="stretch" gap={2}>
                  {mockDeliverables.map((deliverable, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      align="center"
                      color="gray.700"
                    >
                      <Box w={2} h={2} bg="purple.600" rounded="full" />
                      <Text>{deliverable}</Text>
                    </Stack>
                  ))}
                </VStack>
              </Box>

              {campaign.status === "IN_PROGRESS" && campaign.draftDeadline && (
                <Alert.Root status="warning" variant="subtle">
                  <Alert.Indicator>
                    <Icon as={LuCircleAlert} />
                  </Alert.Indicator>
                  <Alert.Content>
                    <Alert.Title>下書き提出の締切が近づいています</Alert.Title>
                    <Alert.Description>
                      締切: {campaign.draftDeadline.toLocaleDateString()}まで
                    </Alert.Description>
                  </Alert.Content>
                </Alert.Root>
              )}
            </Dialog.Body>

            <Dialog.Footer>
              <Stack direction="row" gap={4} width="full">
                <Button flex={1}>
                  <Icon as={LuMessageSquare} />
                  担当者にメッセージ
                </Button>
                <Button flex={1} variant="outline">
                  <Icon as={LuFileText} />
                  契約書を確認
                </Button>
              </Stack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
