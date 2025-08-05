import AuthGuard from "@/components/auth-guard";
import TaskManager from "@/components/home-page";

export default function HomePage() {
  return (
    <AuthGuard>
      <TaskManager />;
    </AuthGuard>
  );
}
