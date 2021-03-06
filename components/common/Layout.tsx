import { NotAllowedIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { Button, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { CurrentUser } from "../../types/authentication";
import Footer from "./Footer";
import Header from "./Header";

interface ILayoutProps {
  children?: React.ReactNode | string;
  headerMenuItems: any[];
  footerMenuItems: any[];
  dynamicsSocialPlatforms: any[];
  companyLogoUrl: string;
  preview?: boolean;
  user?: CurrentUser;
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  const router = useRouter();

  const exitPreview = async () => {
    await fetch(
      `/api/exit-preview?pathName=${encodeURIComponent(router.asPath)}`
    );
    router.reload();
  };
  return (
    <Box w="100%">
      <Header
        menuItems={props.headerMenuItems}
        companyLogoUrl={props.companyLogoUrl}
      />

      {props.preview && (
        <Tooltip hasArrow label="Exit preview mode" bg="red.600">
          <Button
            aria-label="Exit preview mode"
            position="fixed"
            zIndex="99"
            bottom={8}
            left={8}
            colorScheme="pink"
            rightIcon={<NotAllowedIcon fontSize="20px" fontWeight="bold" />}
            onClick={exitPreview}
          >
            PREVIEW MODE
          </Button>
        </Tooltip>
      )}
      {props.children}
      <Footer
        menuItems={props.footerMenuItems}
        companyLogoUrl={props.companyLogoUrl}
        dynamicsSocialPlatforms={props.dynamicsSocialPlatforms}
      />
    </Box>
  );
};

export default Layout;
