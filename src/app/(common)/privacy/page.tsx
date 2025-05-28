"use client";

import { Box, Container, Heading, List, Stack, Text } from "@chakra-ui/react";

export default function PrivacyPage() {
  return (
    <Box py="8" bg="gray.50">
      <Container maxW="4xl" px="4">
        <Box bg="white" rounded="lg" shadow="sm" p="8">
          <Heading as="h1" fontSize="3xl" fontWeight="bold" mb="8">
            プライバシーポリシー（個人情報保護基本方針）
          </Heading>

          <Stack gap="8">
            <Text color="gray.600">
              当社は、インフルエンサーマッチングプラットフォーム（以下「本サービス」といいます）の運営において、個人情報保護の重要性を認識し、法令を遵守し、最善の注意を払ってお客様（企業ユーザーおよびインフルエンサーユーザーを含み、以下同様とします）の個人情報を保護することが社会的責務であると考え、お客様に安心し、また安全に本サービスをご利用いただけるよう、当社のプライバシーポリシーを定め、それに従い、厳重に取り扱ってまいります。
            </Text>

            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                1. 個人情報の取得
              </Heading>
              <Text color="gray.600">
                当社はお客様から個人情報をご提供いただく場合には、その個人情報を利用する目的（以下「利用目的」といいます）をあらかじめ明示いたします。ただし、次の場合には、利用目的の提示を省略させていただくことがございます。
              </Text>
              <List.Root listStylePosition="inside">
                <List.Item color="gray.600">
                  当社WEBサイト、お電話、FAX、E-mail等でのお問合せ、各種登録・申込手続き等により個人情報をいただく場合
                </List.Item>
                <List.Item color="gray.600">
                  名刺交換等により個人情報をいただく場合
                </List.Item>
              </List.Root>
            </Stack>

            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                2. 個人情報の範囲
              </Heading>
              <Text color="gray.600">
                当社がお客様から個人情報をいただく場合は通常次のようなものが含まれます。
              </Text>
              <List.Root listStylePosition="inside">
                <List.Item color="gray.600">
                  お客様のお名前（企業ユーザーの場合は企業名、担当者名）、お勤め先、ご連絡先（お電話、FAX、E-mailアドレス、住所等）
                </List.Item>
                <List.Item color="gray.600">
                  インフルエンサーユーザーの場合、活動するプラットフォーム、フォロワー数、得意分野、自己紹介、過去の実績、PR事例、口座情報等の個人に関わる情報
                </List.Item>
                <List.Item color="gray.600">
                  企業ユーザーの場合、企業情報、担当者情報、案件情報、支払い情報等の企業に関わる情報
                </List.Item>
              </List.Root>
            </Stack>

            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                3. 個人情報の利用目的
              </Heading>
              <Text color="gray.600">
                当社は、お客様からご提供いただいた個人情報を、次の目的の範囲内で利用させていただきます。
              </Text>
              <List.Root listStylePosition="inside">
                <List.Item color="gray.600">
                  本サービスを提供するため（マッチング、コミュニケーション、レポート機能、支払い処理等）
                </List.Item>
                <List.Item color="gray.600">
                  メール配信、イベント、キャンペーンのお知らせなどサービスに関する情報を提供するため
                </List.Item>
                <List.Item color="gray.600">
                  お客様と連絡をとるため（本人確認、問い合わせ対応、重要なお知らせ等）
                </List.Item>
                <List.Item color="gray.600">
                  本サービスの改善、新機能の開発のため
                </List.Item>
                <List.Item color="gray.600">
                  利用状況の分析、マーケティング調査のため（個人を特定できない統計データとして利用）
                </List.Item>
              </List.Root>
              <Text color="gray.600">
                また、お客様へのサービス提供向上等の目的で、それ以外の情報を質問させていただく場合がありますが、その場合は、予めその目的を明確にいたします。
              </Text>
            </Stack>

            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                4. 個人情報の第三者への開示
              </Heading>
              <Text color="gray.600">
                当社はお客様からご提供いただきました個人情報は、以下のいずれかに該当する場合を除き、いかなる第三者にも開示いたしません。
              </Text>
              <List.Root listStylePosition="inside">
                <List.Item color="gray.600">お客様の同意がある場合</List.Item>
                <List.Item color="gray.600">
                  法令等により、関係機関より開示を求められた場合
                </List.Item>
                <List.Item color="gray.600">
                  お客様の行為が、当社WEBサイトの利用規約に違反し、当社の権利、財産やサービス等を保護するため、必要と認められる場合
                </List.Item>
                <List.Item color="gray.600">
                  人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難である場合
                </List.Item>
                <List.Item color="gray.600">
                  公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難である場合
                </List.Item>
                <List.Item color="gray.600">
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがある場合
                </List.Item>
                <List.Item color="gray.600">
                  上記のうちで、お客様個人を識別することができない状態で開示する場合
                </List.Item>
              </List.Root>
            </Stack>

            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                5. 個人データの共同利用
              </Heading>
              <Text color="gray.600">
                当社は、お客様の個人情報を、本サービスの提供に必要な範囲において、業務委託先（決済代行会社、サーバー管理会社等）へ開示する場合があります。この場合、当社は業務委託先に対し、個人情報の適切な管理を義務付け、監督いたします。
              </Text>
            </Stack>

            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                6. 個人情報の安全管理について
              </Heading>
              <Text color="gray.600">
                お客様の個人情報の管理につきまして、当社では、管理責任者を定め、適切な管理を行います。個人情報の外部への流出防止に努めるとともに、不正アクセス等による個人情報の紛失、破壊、改ざん、漏洩等の危険に対して、適切かつ合理的なレベルの安全対策を実施し、お客様の個人情報の保護に努めます。
              </Text>
            </Stack>

            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                7. 当社WEBサイトからのリンク先における個人情報の保護について
              </Heading>
              <Text color="gray.600">
                当社は、当社WEBサイトからリンクする第三者のWEBサイトにおける個人情報の安全確保につきましては、責任を負うことはいたしかねます。各々のリンク先における個人情報の保護、管理につきましては、当該リンク先におけるプライバシーポリシー等をお客様ご自身でご確認いただきますようお願い申し上げます。
              </Text>
            </Stack>

            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                8. 本ポリシーの変更
              </Heading>
              <Text color="gray.600">
                お客様の個人情報の取得、範囲、利用目的等に変更が発生した場合は、当社WEBサイト上に掲示を行い、最新の情報をお知らせいたします。
              </Text>
            </Stack>

            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                9. お問い合わせ窓口
              </Heading>
              <Text color="gray.600">
                本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
