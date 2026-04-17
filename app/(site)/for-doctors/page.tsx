import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import DoctorsVideoPage from '@/components/DoctorsVideoPage';
import { DOCTORS_COOKIE_NAME, verifyDoctorsCookie } from '@/lib/doctorsAccess';

export const metadata: Metadata = {
  title: 'Dla lekarzy',
  description: 'Materiały edukacyjne EstiTalk przygotowane specjalnie dla środowiska lekarskiego.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function ForDoctorsPage() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(DOCTORS_COOKIE_NAME)?.value;
  const initialUnlocked = verifyDoctorsCookie(cookieValue);
  return <DoctorsVideoPage initialUnlocked={initialUnlocked} />;
}
