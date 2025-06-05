"use client";

import { CampaignForm } from "@/app/company/dashboard/campaigns/(components)/CampaignForm";
import { api } from "@/lib/trpc/react";
import { updateCampaignSchema } from "@/validations/company/campaign/updateCampaign";
import {
  Box,
  Card,
  Container,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";

export default function EditCampaignPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  // キャンペーン詳細を取得
  const {
    data: campaign,
    isLoading,
    refetch,
  } = api.company.campaigns.getById.useQuery({
    id: params.id,
  });

  // キャンペーン更新のミューテーション
  const updateCampaign = api.company.campaigns.update.useMutation({
    onSuccess: () => {
      void refetch();
      router.push("/company/dashboard/campaigns");
    },
  });

  if (isLoading) {
    return (
      <Container py={8}>
        <VStack>
          <Spinner size="xl" />
          <Text>読み込み中...</Text>
        </VStack>
      </Container>
    );
  }

  if (!campaign) {
    return (
      <Container py={8}>
        <Card.Root>
          <Card.Body>
            <Text>キャンペーンが見つかりません。</Text>
          </Card.Body>
        </Card.Root>
      </Container>
    );
  }

  return (
    <Box>
      <Container py={8}>
        <VStack gap={8} align="stretch">
          <Box>
            <Heading size="lg" mb={2}>
              キャンペーン編集
            </Heading>
            <Text color="gray.600">キャンペーンの情報を編集できます。</Text>
          </Box>

          <CampaignForm
            schema={updateCampaignSchema}
            defaultValues={{
              id: campaign.id,
              title: campaign.title,
              description: campaign.description,
              platform: campaign.platform,
              recruitment: campaign.recruitment,
              applicationDue: new Date(campaign.applicationDue)
                .toISOString()
                .split("T")[0],
              postDue: new Date(campaign.postDue).toISOString().split("T")[0],
              rewardType: campaign.rewardType,
              rewardAmount: campaign.rewardAmount,
              requirements: campaign.requirements ?? [],
              note: campaign.note ?? "",
            }}
            onSubmit={(data) => {
              updateCampaign.mutate({
                ...data,
                id: campaign.id,
              });
            }}
          />
        </VStack>
      </Container>
    </Box>
  );
}
