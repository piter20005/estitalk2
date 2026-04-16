import type { Metadata } from 'next';
import DoctorsVideoPage from '@/components/DoctorsVideoPage';

export const metadata: Metadata = {
  title: 'Dla lekarzy',
  description: 'Materiały edukacyjne EstiTalk przygotowane specjalnie dla środowiska lekarskiego.',
  robots: { index: false, follow: false },
};

export default function ForDoctorsPage() {
  return <DoctorsVideoPage />;
}
