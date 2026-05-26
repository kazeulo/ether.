import { createClient } from '@/utils/supabase/server'
import HeroSection from "./components/homepage_components/HeroSection";

export default async function HomePage() {
  const supabase = await createClient()
  const { data: todos } = await supabase.from('todos').select()

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <HeroSection />
    </div>
  );
}