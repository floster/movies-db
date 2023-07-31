import AppSection from '../components/AppSection';
import MainPageSidebar from '../components/MainPageSidebar';
import AppSectionHeader from '../components/AppSectionHeader';
import MediaHero from '../components/MediaHero';
import AppCarousel from '../components/AppCarousel';

export default function Home() {
    return (
        <>
            <div className="l-content m-main_page container">
                <MainPageSidebar />
                <main className="l-main_page_content">
                    <AppSection extraClass="m-random_media">
                        <AppSectionHeader title="random collection" />
                        <MediaHero type='random' />
                    </AppSection>

                    <AppSection>
                        <AppSectionHeader title="trending movies" />
                        <AppCarousel itemsType='movie' />
                    </AppSection>

                    <AppSection>
                        <AppSectionHeader title="trending TV shows" />
                        <AppCarousel itemsType='tv' />
                    </AppSection>

                    <AppSection>
                        <AppSectionHeader title="trending poeple" />
                        <AppCarousel itemsType='person' />
                    </AppSection>
                </main>
            </div>
        </>
    )
}
