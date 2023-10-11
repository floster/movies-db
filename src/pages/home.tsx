import AppSection from "../components/AppSection";
import MediaListSection from "../components/MediaList/MediaListSection";
import AppSectionHeader from "../components/AppSectionHeader";
import TrendingsCarousel from "../components/TrendingsCarousel";
import RandomMedia from "../components/RandomMedia";
import { IAvailableTrendingTypes } from "../types/tmdb.models";

export default function Home() {
  const trendingCarouselsTypes: IAvailableTrendingTypes[] = [
    "movie",
    "tv",
    "person",
  ];
  return (
    <>
      <div className="l-content m-main_page container">
        <MediaListSection />
        <main className="l-main_page_content">
          <AppSection extraClass="m-random_media">
            <AppSectionHeader title="random collection" />
            <RandomMedia />
          </AppSection>

          {trendingCarouselsTypes.map((type) => (
            <AppSection key={type}>
              <AppSectionHeader title={`trending ${type}s`} />
              <TrendingsCarousel itemsType={type} />
            </AppSection>
          ))}
        </main>
      </div>
    </>
  );
}
