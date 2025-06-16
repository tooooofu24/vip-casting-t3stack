"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import { InfluencerAddressForm } from "@/app/influencer/(public)/register/(components)/InfluencerAddressForm";
import { InfluencerInformationForm } from "@/app/influencer/(public)/register/(components)/InfluencerInformationForm";
import { InfluencerSnsForm } from "@/app/influencer/(public)/register/(components)/InfluencerSnsForm";
import { InfluencerWorkForm } from "@/app/influencer/(public)/register/(components)/InfluencerWorkForm";
import { showSuccessToast } from "@/lib/chakra-ui/toaster";
import { Tabs, VStack } from "@chakra-ui/react";
import { LuMapPin, LuUser, LuBriefcase } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";

export default function ProfilePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInformationUpdate = (_data: any) => {
    showSuccessToast("基本情報を更新しました");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddressUpdate = (_data: any) => {
    showSuccessToast("住所情報を更新しました");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSnsUpdate = (_data: any) => {
    showSuccessToast("SNS情報を更新しました");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleWorkUpdate = (_data: any) => {
    showSuccessToast("案件情報を更新しました");
  };

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
