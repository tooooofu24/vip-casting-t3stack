import { Breadcrumb, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import type { Route } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { LuHouse } from "react-icons/lu";

export type BreadcrumbItem = {
  label: string;
  href?: Route;
};

export type BreadcrumbSectionProps = {
  items: BreadcrumbItem[];
  title: string;
  description?: string;
};

export function BreadcrumbSection({
  items,
  title,
  description,
}: BreadcrumbSectionProps) {
  return (
    <VStack gap={6} align="stretch">
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild>
              <Link href="/company/dashboard">
                <Icon as={LuHouse} />
              </Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          {items.map((item, idx) => (
            <Fragment key={idx}>
              <Breadcrumb.Item>
                {item.href ? (
                  <Breadcrumb.Link asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </Breadcrumb.Link>
                ) : (
                  <Breadcrumb.CurrentLink>{item.label}</Breadcrumb.CurrentLink>
                )}
              </Breadcrumb.Item>
              {idx < items.length - 1 && <Breadcrumb.Separator />}
            </Fragment>
          ))}
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <VStack gap={1} align="stretch">
        <Heading as="h1" size="xl" fontWeight="bold">
          {title}
        </Heading>
        {description && (
          <Text fontSize="sm" color="fg.muted">
            {description}
          </Text>
        )}
      </VStack>
    </VStack>
  );
}
