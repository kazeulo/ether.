// // import { createClient } from '@/utils/supabase/server'
// import { cookies } from 'next/headers'

// components
import HeroSection    from "./components/homepage_components/HeroSection";

// design components
import Starfield      from "./designs/Starfield";

export default function HomePage() {
  // const cookieStore = await cookies()
  // const supabase = createClient(cookieStore)

  // const { data: todos } = await supabase.from('todos').select()

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <HeroSection />
    </div>
  );
}