import { Box, Flex, Heading } from "@chakra-ui/react";
import * as React from "react";
import { DynamicsBlog, DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import BlogTile from "../BlogTile";

interface IBlogsDisplaySectionProps {
  dynamicsBlogs?: DynamicsBlog[];
  dynamicsPageSection: DynamicsPageSection;
}

const BlogsDisplaySection: React.FunctionComponent<
  IBlogsDisplaySectionProps
> = ({ dynamicsBlogs, dynamicsPageSection }) => {
  // If no blogs are fed into this section, simply render nothing to avoid broken pages
  if (!dynamicsBlogs) {
    return null;
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
