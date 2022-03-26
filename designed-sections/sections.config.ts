import { FunctionComponent } from "react";
import BusinessBanterSection from "./common/BusinessBanterSection";
import ClientFeatureSection from "./common/ClientFeatureSection";
import HeroSection from "./common/HeroSection";
import NewsSection from "./common/NewsSection";
import ProductSection from "./common/ProductSection";
import SuccessStoriesSection from "./common/SuccessStoriesSection";
import BlogsDisplaySection from "./common/BlogsDisplaySection";
import HighlightNewsSection from "./common/HighlightNewsSection";
import SponsorSection from "./customized/SponsorSection";
import RecentMatchesSection from "./customized/RecentMatchesSection";
import CalendarSection from "./customized/CalendarSection";
import TeamsInfoSection from "./customized/TeamsInfoSection";
import ContactPersonnelSection from "./customized/ContactPersonnelSection";
import MapBoxStaticMapSection from "./customized/MapBoxStaticMapSection";
import DownloadsSection from "./common/DownloadsSection";

const sections: { [key: string]: FunctionComponent<any> } = {
  BusinessBanterSection,
  ClientFeatureSection,
  HeroSection,
  NewsSection,
  ProductSection,
  SuccessStoriesSection,
  BlogsDisplaySection,
  HighlightNewsSection,
  SponsorSection,
  RecentMatchesSection,
  CalendarSection,
  TeamsInfoSection,
  ContactPersonnelSection,
  MapBoxStaticMapSection,
  DownloadsSection,
};

export default sections;
