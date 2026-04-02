import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import MethodSection from '@/components/MethodSection'
import ProgramsSection from '@/components/ProgramsSection'
import TransformationSection from '@/components/TransformationSection'
import CommunitySection from '@/components/CommunitySection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MethodSection />
        <ProgramsSection />
        <TransformationSection />
        <CommunitySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
