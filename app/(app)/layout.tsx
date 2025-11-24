import AppShell from '@/components/layout/AppShell';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // TODO: protect route via auth
  return <AppShell>{children}</AppShell>;
}
