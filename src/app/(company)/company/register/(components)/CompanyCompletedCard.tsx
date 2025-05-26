import { Card, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { LuMailCheck } from "react-icons/lu";

export function CompanyCompletedCard() {
  return (
    <Card.Root>
      <Card.Body>
        <VStack gap={4} align="center">
          <Icon as={LuMailCheck} fontSize="7xl" color="green.400" />
          <Heading size="lg" textAlign="center">
            企業アカウント登録申請を受け付けました
          </Heading>
          <Text fontSize="md" color="fg.muted" textAlign="center">
            ご登録内容をもとに審査を行います。
            <br />
            審査が完了しましたら、ご登録のメールアドレス宛にご連絡いたします。
            <br />
            今しばらくお待ちください。
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
