"use client";

import { toaster } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  Alert,
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  Table,
  VStack,
} from "@chakra-ui/react";

export default function AdminDashboard() {
  const { data, isLoading, refetch, error } =
    api.admin.getUnapprovedCompanies.useQuery();

  const { mutate, isPending } = api.admin.approveCompany.useMutation({
    onError: (error) => {
      toaster.create({
        type: "error",
        title: error.message,
      });
    },
    onSuccess: () => {
      void refetch();
      toaster.create({
        type: "success",
        title: "会社を承認しました",
      });
    },
  });

  return (
    <VStack align="stretch" gap={4} py={8} px={{ base: 2, md: 8 }}>
      <Heading size="lg">未承認会社一覧</Heading>
      <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
        {isLoading ? (
          <Center h="100%" p={8}>
            <Spinner size="xl" />
          </Center>
        ) : error ? (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>エラーが発生しました</Alert.Title>
              <Alert.Description>{error.message}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ) : !data || data.length === 0 ? (
          <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>未承認の会社はありません</Alert.Title>
              <Alert.Description>
                現在、承認待ちの会社はありません。
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>会社名</Table.ColumnHeader>
                <Table.ColumnHeader>作成日</Table.ColumnHeader>
                <Table.ColumnHeader>承認状態</Table.ColumnHeader>
                <Table.ColumnHeader>所在地</Table.ColumnHeader>
                <Table.ColumnHeader>ビジネス情報</Table.ColumnHeader>
                <Table.ColumnHeader>支払い情報</Table.ColumnHeader>
                <Table.ColumnHeader>操作</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((company) => (
                <Table.Row key={company.id}>
                  <Table.Cell>
                    {company.information?.companyName ?? "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {company.createdAt.toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {company.isApproved ? "承認済" : "未承認"}
                  </Table.Cell>
                  <Table.Cell>
                    {company.address
                      ? `${company.address.prefecture} ${company.address.city} ${company.address.town}`
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {company.business
                      ? `${company.business.contactName} (${company.business.department})`
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {company.payment
                      ? `${company.payment.bankName}（${company.payment.accountHolder}）`
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      loading={isPending}
                      onClick={() => mutate({ companyId: company.id })}
                    >
                      承認
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Box>
    </VStack>
  );
}
