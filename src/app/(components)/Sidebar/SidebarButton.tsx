import { SidebarContent } from "@/app/(components)/Sidebar/SidebarContent";
import { Drawer, Icon, IconButton, Portal } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";

export const SidebarButton = () => {
  return (
    <Drawer.Root placement="start" size="xs">
      <Drawer.Trigger asChild>
        <IconButton
          aria-label="メニューを開く/閉じる"
          variant="ghost"
          color="fg.inverted"
          _hover={{ bg: "none" }}
        >
          <Icon>
            <LuMenu />
          </Icon>
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <SidebarContent />
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
