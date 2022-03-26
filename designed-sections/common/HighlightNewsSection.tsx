import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Box, IconButton, SlideFade, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  DynamicsBlog,
  DynamicsPageSection,
} from "../../utils/dynamics-365/common/types";
import AnchorSection from "../../components/common/AnchorSection";
import BlogTile from "../../components/common/BlogTile";

interface IHighlightNewsSectionProps {
  dynamicsBlogs?: DynamicsBlog[];
  dynamicsPageSection: DynamicsPageSection;
}

const HighlightNewsSection: React.FunctionComponent<
  IHighlightNewsSectionProps
> = ({ dynamicsBlogs, dynamicsPageSection }) => {
  const [activeBlog, setActiveBlog] = useState(0);
  const [userHasManuallyChangedBlog, setUserHasManuallyChangedBlog] =
    useState(false);
  const prevPage = () => {
    setActiveBlog((prevState) => {
      if (prevState === 0) {
        return 3;
      } else {
        return prevState - 1;
      }
    });
  };
  const nextPage = () => {
    setActiveBlog((prevState) => {
      if (prevState === 3) {
        return 0;
      } else {
        return prevState + 1;
      }
    });
  };

  useEffect(() => {
    if (userHasManuallyChangedBlog) {
      return;
    }
    let timer = setInterval(() => nextPage(), 5000);
    return () => {
      clearInterval(timer);
    };
  }, [userHasManuallyChangedBlog]);
  if (!dynamicsBlogs) {
    return null;
  }
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
      py={16}
      backgroundColor={
        dynamicsPageSection.bsi_backgroundcolor || "rgb(241,241,241)"
      }
    >
      <Box w="100%" overflowX="hidden" h="auto" pb={12}>
        <Flex w="400%" transform={`translateX(-${activeBlog * 25}%)`}>
          {dynamicsBlogs.map((db, index) => {
            if (index < 4)
              return (
                <Box
                  key={db.bsi_blogid}
                  width="100vw"
                  h="fit-content"
                  px={{ base: 4, md: 8 }}
                >
                  <SlideFade
                    in={activeBlog === index}
                    offsetX="100px"
                    transition={{ enter: { duration: 0.5 } }}
                  >
                    <BlogTile
                      size="xl"
                      blogTitle={db.bsi_name}
                      blogAuthors={db.bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor}
                      blogTags={db.bsi_BlogCategory_bsi_Blog_bsi_Blog}
                      blogSlug={db.bsi_slug}
                      blogCoverImageUrl={db.bsi_BlogCoverImage.bsi_cdnurl}
                      blogCoverImageAltText={db.bsi_BlogCoverImage.bsi_alttext}
                      blogCoverText={db.bsi_blogcovertext}
                      publishDate={new Date(db.modifiedon)}
                    />
                  </SlideFade>
                </Box>
              );
          })}
        </Flex>
      </Box>
      <Flex
        mx="auto"
        justify="center"
        align="center"
        backgroundColor="rgb(241,241,241)"
        pb={8}
        style={{ gap: "15px" }}
      >
        <IconButton
          aria-label="Previous Post"
          icon={<ChevronLeftIcon />}
          backgroundColor="transparent"
          onClick={() => {
            prevPage();
            setUserHasManuallyChangedBlog(() => true);
          }}
        />
        <Text as="span">{activeBlog + 1}/4</Text>
        <IconButton
          aria-label="Next Post"
          icon={<ChevronRightIcon />}
          backgroundColor="transparent"
          onClick={() => {
            nextPage();
            setUserHasManuallyChangedBlog(() => true);
          }}
        />
      </Flex>
      <Flex
        width="100%"
        display={{ base: "none", md: "flex" }}
        align="stretch"
        mx="auto"
        px={16}
        flexWrap="wrap"
        pb={16}
        style={{ gap: "4%" }}
        backgroundColor="rgb(241,241,241)"
      >
        {dynamicsBlogs.map((db, index) => {
          if (index < 4)
            return (
              <Box
                key={db.bsi_blogid}
                width="22%"
                pb={8}
                cursor="pointer"
                onClick={() => {
                  setActiveBlog(() => index);
                  setUserHasManuallyChangedBlog(() => true);
                }}
              >
                <BlogTile
                  size="mini"
                  active={activeBlog === index}
                  userClicked={userHasManuallyChangedBlog}
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
            );
        })}
      </Flex>
    </AnchorSection>
  );
};

export default HighlightNewsSection;
