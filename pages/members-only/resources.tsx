import { Box } from "@chakra-ui/react";
import { ParsedUrlQuery } from "querystring";
import ErrorComponent from "../../components/ErrorComponent";
import Layout from "../../components/Layout";
import { withSessionSsr } from "../../utils/authentication/withSession";
import { DynamicsPageProps } from "../../utils/types";

interface IResourcesProps extends DynamicsPageProps {}

const ResourcesPage: React.FunctionComponent<IResourcesProps> = (props) => {
  if (props.error) {
    return (
      <ErrorComponent
        status={props.error.status}
        title={props.error.name}
        message={props.error.message}
      />
    );
  }
  return <Box>You Are In!</Box>;
};

export const getServerSideProps = withSessionSsr(
  async ({ req }): Promise<any> => {
    const user = req.session.user;
    if (!user) {
      return {
        props: {
          error: {
            name: "Access Denied",
            status: 401,
            message: "You need to login to access the content on this page.",
          },
          user: null,
        },
      };
    }
    return {
      props: {
        user,
        error: null,
      },
    };
  }
);

export default ResourcesPage;
