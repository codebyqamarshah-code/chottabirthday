import BirthdayHero from '@/components/BirthdayHero';
import BirthdayCake from '@/components/BirthdayCake';
import GreetingCard from '@/components/GreetingCard';
import BirthdayCharacter from '@/components/BirthdayCharacter';
import FinalCelebration from '@/components/FinalCelebration';
import ConfettiEffect from '@/components/ConfettiEffect';
import PartyBomb from '@/components/PartyBomb';
import FloatingBalloons from '@/components/FloatingBalloons';
import Bunting from '@/components/Bunting';
import SparkleEffect from '@/components/SparkleEffect';
import MusicToggle from '@/components/MusicToggle';
import PolaroidMemories from '@/components/PolaroidMemories';

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden min-h-screen bg-cream">

      {/* ── Global Overlays ── */}
      <SparkleEffect />
      <FloatingBalloons />
      <MusicToggle />

      {/* ── SECTION 1 – HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center pt-6 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF8F2 0%, #FFF0F4 60%, #FFD6C9 100%)' }}
      >
        {/* Bunting at top */}
        <div className="absolute top-0 left-0 right-0 w-full">
          <Bunting />
        </div>

        <BirthdayHero />
      </section>

      {/* ── SECTION 2 – BIRTHDAY CAKE ── */}
      <section
        id="cake"
        className="min-h-screen flex flex-col items-center justify-center py-20 relative"
        style={{ background: 'linear-gradient(160deg, #FFF0F4 0%, #FFD6C9 100%)' }}
      >
        <h2 className="text-3xl md:text-5xl font-display text-dark-ink mb-12 text-center">
          Make a <span className="text-primary">Wish</span> ✨
        </h2>
        <BirthdayCake />
      </section>

      {/* ── SECTION 3 – PARTY BOMB ── */}
      <section
        id="bomb"
        className="min-h-[60vh] flex flex-col items-center justify-center py-20 relative"
        style={{ background: 'linear-gradient(160deg, #FFF8F2 0%, #FFF0F4 100%)' }}
      >
        <h2 className="text-3xl md:text-5xl font-display text-dark-ink mb-4 text-center">
          Party <span className="text-primary">Time!</span> 🥳
        </h2>
        <PartyBomb />
      </section>

      {/* ── SECTION 4 – GREETING CARD ── */}
      <section
        id="card"
        className="min-h-screen flex flex-col items-center justify-center py-20 relative"
        style={{ background: 'linear-gradient(160deg, #FFD6C9 0%, #FFF0F4 60%, #FFF8F2 100%)' }}
      >
        <h2 className="text-3xl md:text-5xl font-display text-dark-ink mb-12 text-center">
          Your <span className="text-primary">Card</span> 💌
        </h2>
        <GreetingCard />
      </section>

      {/* ── SECTION 5 – 3D CHARACTER ── */}
      <section
        id="character"
        className="min-h-screen flex flex-col items-center justify-center py-20 relative"
        style={{ background: 'linear-gradient(160deg, #FFF8F2 0%, #FFD6C9 100%)' }}
      >
        <BirthdayCharacter />
      </section>

      {/* ── SECTION 5.5 – POLAROID MEMORIES ── */}
      <section
        id="memories"
        className="min-h-screen flex flex-col items-center justify-center py-20 relative"
        style={{ background: 'linear-gradient(160deg, #FFD6C9 0%, #FFF0F4 100%)' }}
      >
        <h2 className="text-3xl md:text-5xl font-display text-dark-ink mb-12 text-center">
          Why I <span className="text-primary">Love</span> You ❤️
        </h2>
        <PolaroidMemories />
      </section>

      {/* ── SECTION 6 – FINAL CELEBRATION ── */}
      <section
        id="final"
        className="min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF0F4 0%, #FFD6C9 60%, #FFF8F2 100%)' }}
      >
        <FinalCelebration />
        <ConfettiEffect />
      </section>

    </main>
  );
}
