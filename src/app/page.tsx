import AuthGuard from "@/components/auth-guard";
import Header from "@/components/header";
import TaskManager from "@/components/home-page";

export default function HomePage() {
  return (
    <AuthGuard>
      <TaskManager />;
    </AuthGuard>
  );
}
