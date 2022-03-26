import { Badge, Box, Flex, Heading, Image, Link } from "@chakra-ui/react";
import * as React from "react";
import {
  DynamicsBlog,
  DynamicsPageSection,
} from "../../types/dynamics-365/common/types";
import AnchorSection from "../../components/common/AnchorSection";
import BlogTile from "../../components/common/BlogTile";

interface IBlogsDisplaySectionProps {
  dynamicsBlogs?: DynamicsBlog[];
  dynamicsPageSection: DynamicsPageSection;
}

const BlogsDisplaySection: React.FunctionComponent<
  IBlogsDisplaySectionProps
> = ({ dynamicsBlogs, dynamicsPageSection }) => {
  // If no blogs are fed into this section, simply render nothing to avoid broken pages
  if (!dynamicsBlogs || !dynamicsPageSection) {
    return null;
  }
  if (dynamicsBlogs.length === 1) {
    return (
      <AnchorSection
        sectionId={dynamicsPageSection.bsi_sectionid}
        key={dynamicsPageSection.bsi_pagesectionid}
        py={32}
        backgroundColor={
          dynamicsPageSection.bsi_backgroundcolor || "rgb(241,241,241)"
        }
      >
        <Flex
          flexDirection={"column"}
          width="80%"
          align="flex-start"
          mx="auto"
          my={12}
        >
          <Image
            src={`${dynamicsBlogs[0].bsi_BlogCoverImage.bsi_cdnurl}?fm=jpg&fl=progressive`}
            alt={dynamicsBlogs[0].bsi_BlogCoverImage.bsi_alttext}
            objectFit="contain"
            objectPosition="center"
            height="450px"
            alignSelf="center"
          />
          <Flex
            flexDirection="column"
            align="stretch"
            my={16}
            width="100%"
            style={{ gap: "20px" }}
          >
            <Heading as="h3">{dynamicsBlogs[0].bsi_name}</Heading>
            <Flex justify="flex-start">
              <Flex align="center">
                {dynamicsBlogs[0].bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor.map(
                  (b) => (
                    <Link
                      mr={3}
                      key={b.bsi_slug}
                      href={`/blogs/author/${b.bsi_slug}/page/1`}
                    >
                      {b.bsi_name}
                    </Link>
                  )
                )}
              </Flex>
              <div suppressHydrationWarning>
                {new Date(dynamicsBlogs[0].modifiedon).toLocaleDateString()}
              </div>
              <Flex align="center" ml={12}>
                {dynamicsBlogs[0].bsi_BlogCategory_bsi_Blog_bsi_Blog.map(
                  (b) => (
                    <Link
                      key={b.bsi_slug}
                      href={`/blogs/category/${b.bsi_slug}/page/1`}
                    >
                      <Badge colorScheme="teal" ml={2}>
                        {b.bsi_name}
                      </Badge>
                    </Link>
                  )
                )}
              </Flex>
            </Flex>

            <article>
              <Box
                dangerouslySetInnerHTML={{
                  __html: dynamicsBlogs[0].bsi_blogbody,
                }}
              ></Box>
            </article>
          </Flex>
        </Flex>
      </AnchorSection>
    );
  }
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
      py={32}
      bgColor="rgb(241,241,241)"
    >
      <Box>
        <Heading
          as="h2"
          width="90%"
          fontSize="1rem"
          mx="auto"
          pt={16}
          pb={2}
          color={dynamicsPageSection.bsi_mainheadingtextcolor || "inherit"}
        >
          {dynamicsPageSection.bsi_mainheading}
        </Heading>
        <Heading
          as="h3"
          width="90%"
          pb={16}
          mx="auto"
          color={dynamicsPageSection.bsi_subheadingtextcolor || "inherit"}
        >
          {dynamicsPageSection.bsi_subheading}
        </Heading>
        <Flex
          width="90%"
          mx="auto"
          flexWrap="wrap"
          style={{ gap: "6%" }}
          bgColor="rgb(241,241,241)"
        >
          {dynamicsBlogs.map((db) => (
            <Box
              key={db.bsi_blogid}
              width={{ base: "100%", md: "47%" }}
              mb={8}
              boxShadow="rgb(0 0 0 / 5%) 0px 5px 10px 0px"
              bgColor="white"
              borderRadius="4px"
              overflow="hidden"
            >
              <BlogTile
                blogTitle={db.bsi_name}
                blogAuthors={db.bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor}
                blogTags={db.bsi_BlogCategory_bsi_Blog_bsi_Blog}
                blogSlug={db.bsi_slug}
                blogCoverImageUrl={db.bsi_BlogCoverImage.bsi_cdnurl}
                blogCoverImageAltText={db.bsi_BlogCoverImage.bsi_alttext}
                blogCoverText={db.bsi_blogcovertext}
                publishDate={new Date(db.modifiedon)}
              />
            </Box>
          ))}
        </Flex>
      </Box>
    </AnchorSection>
  );
};

export default BlogsDisplaySection;
