import { notFound } from 'next/navigation';
import DevSongReviewDashboard from '../../../components/DevSongReviewDashboard';

export default function DevMasterSongReviewPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return <DevSongReviewDashboard />;
}
