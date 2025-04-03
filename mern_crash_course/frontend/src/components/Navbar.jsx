import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  CloseButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon, BellIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useProductStore } from "../store/product";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { notifications, removeNotification, clearNotifications } =
    useProductStore();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Menu>
            <MenuButton as={Button} position="relative">
              <BellIcon fontSize={20} />
              {notifications.length > 0 && (
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  position="absolute"
                  top="0"
                  right="0"
                >
                  {notifications.length}
                </Badge>
              )}
            </MenuButton>
            <MenuList>
              {notifications.map((notification, index) => (
                <MenuItem
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {notification.message}
                  <CloseButton onClick={() => removeNotification(index)} />
                </MenuItem>
              ))}
              {notifications.length > 0 && (
                <MenuItem
                  onClick={clearNotifications}
                  color="red.500"
                  justifyContent="center"
                >
                  Clear All
                </MenuItem>
              )}
            </MenuList>
          </Menu>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};
export default Navbar;
