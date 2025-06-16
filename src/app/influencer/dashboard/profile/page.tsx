"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import { InfluencerAddressForm } from "@/app/influencer/(public)/register/(components)/InfluencerAddressForm";
import { InfluencerInformationForm } from "@/app/influencer/(public)/register/(components)/InfluencerInformationForm";
import { InfluencerSnsForm } from "@/app/influencer/(public)/register/(components)/InfluencerSnsForm";
import { InfluencerWorkForm } from "@/app/influencer/(public)/register/(components)/InfluencerWorkForm";
import { showSuccessToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  influencerAddressDefaultValues,
  type InfluencerAddressRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/address";
import {
  influencerInformationDefaultValues,
  type InfluencerInformationRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/information";
import {
  influencerSnsDefaultValues,
  type InfluencerSnsRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/sns";
import {
  influencerWorkDefaultValues,
  type InfluencerWorkRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/work";
import { Spinner, Tabs, VStack } from "@chakra-ui/react";
import { LuMapPin, LuUser, LuBriefcase } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";

export default function ProfilePage() {
  const { data: profile, isLoading } = api.influencer.profile.get.useQuery();

  const handleInformationUpdate = (data: InfluencerInformationRequest) => {
    console.log("Information updated:", data);
    showSuccessToast("基本情報を更新しました");
  };

  const handleAddressUpdate = (data: InfluencerAddressRequest) => {
    console.log("Address updated:", data);
    showSuccessToast("住所情報を更新しました");
  };

  const handleSnsUpdate = (data: InfluencerSnsRequest) => {
    console.log("SNS updated:", data);
    showSuccessToast("SNS情報を更新しました");
  };

  const handleWorkUpdate = (data: InfluencerWorkRequest) => {
    console.log("Work updated:", data);
    showSuccessToast("案件情報を更新しました");
  };

  if (isLoading) {
    return (
      <VStack gap={6} align="stretch">
        <BreadcrumbSection
          items={[{ label: "プロフィール" }]}
          title="プロフィール"
          description="プロフィールを編集して、ブランドとのマッチングをサポートしましょう。"
        />
        <VStack gap={4}>
          <Spinner size="lg" />
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack gap={6} align="stretch">
      {/* Breadcrumb Section */}
      <BreadcrumbSection
        items={[{ label: "プロフィール" }]}
        title="プロフィール"
        description="プロフィールを編集して、ブランドとのマッチングをサポートしましょう。"
      />
      <Tabs.Root defaultValue="information">
        <Tabs.List>
          <Tabs.Trigger value="information">
            <LuUser />
            基本情報
          </Tabs.Trigger>
          <Tabs.Trigger value="address">
            <LuMapPin />
            住所情報
          </Tabs.Trigger>
          <Tabs.Trigger value="sns">
            <FaInstagram />
            SNS情報
          </Tabs.Trigger>
          <Tabs.Trigger value="work">
            <LuBriefcase />
            案件情報
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="information">
          <InfluencerInformationForm
            onSubmit={handleInformationUpdate}
            defaultValues={{
              firstName: "",
              lastName: "",
              firstNameKana: "",
              lastNameKana: "",
              displayName: "",
              birthday: "",
              gender: undefined,
              email: "",
              phone: "",
            }}
          />
        </Tabs.Content>
        <Tabs.Content value="address">
          <InfluencerAddressForm
            onSubmit={handleAddressUpdate}
            onBack={() => void 0}
            defaultValues={{
              postalCode: "",
              prefecture: undefined,
              city: "",
              town: "",
              street: "",
              building: "",
            }}
          />
        </Tabs.Content>
        <Tabs.Content value="sns">
          <InfluencerSnsForm
            onSubmit={handleSnsUpdate}
            onBack={() => void 0}
            defaultValues={{
              instagramName: "",
              instagramFollowers: undefined,
              youtubeName: "",
              youtubeFollowers: undefined,
              tiktokName: "",
              tiktokFollowers: undefined,
              xName: "",
              xFollowers: undefined,
            }}
          />
        </Tabs.Content>
        <Tabs.Content value="work">
          <InfluencerWorkForm
            onSubmit={handleWorkUpdate}
            onBack={() => void 0}
            defaultValues={{
              postFee: undefined,
              videoFee: undefined,
              liveFee: undefined,
              eventFee: undefined,
              workTypes: [],
              regions: [],
              ngProducts: [],
              ngCompanies: [],
              ngOther: "",
              prResults: [],
            }}
          />
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
}
