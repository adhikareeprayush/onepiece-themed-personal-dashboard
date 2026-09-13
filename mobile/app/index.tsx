import { Redirect } from 'expo-router';
import { Loading } from '@/components/Ui';
import { useAuth } from '@/lib/auth';

export default function Index() {
  const { ready, token } = useAuth();
  if (!ready) return <Loading />;
  if (!token) return <Redirect href="/login" />;
  return <Redirect href={"/(app)/(tabs)" as any} />;
}
