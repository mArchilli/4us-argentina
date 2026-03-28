import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Home/Navbar';
import HeroSection from '@/Components/Home/HeroSection';
import AboutSection from '@/Components/Home/AboutSection';
import FeaturedSection from '@/Components/Home/FeaturedSection';
import CommunityPerks from '@/Components/Home/CommunityPerks';
import ContactSection from '@/Components/Home/ContactSection';
import HomeFooter from '@/Components/Home/HomeFooter';

export default function Welcome({ auth, featuredProducts }) {
    return (
        <>
            <Head title="4us Argentina - Premium Smoking Culture" />

            <div className="bg-[#0e0e0e] text-white min-h-screen">
                <Navbar auth={auth} />

                <main>
                    <HeroSection />
                    <AboutSection />
                    <FeaturedSection products={featuredProducts} />
                    <CommunityPerks />
                    <ContactSection />
                </main>

                <HomeFooter />
            </div>
        </>
    );
}
