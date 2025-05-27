"use client";

import { toaster } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  Box,
  Button,
  Heading,
  Spinner,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function AdminDashboard() {
  const { data, isLoading, error, refetch } =
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
          <Spinner />
        ) : error ? (
          <Text color="red.500">{error.message}</Text>
        ) : !data || data.length === 0 ? (
          <Text>未承認の会社はありません。</Text>
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
