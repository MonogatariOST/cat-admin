import { useNavigate } from "react-router";
import { Button } from "@heroui/react";
import { Lock, Home } from "lucide-react";
import { SuiEmptyState } from "../../components/serviceui";

const ForbiddenPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SuiEmptyState
        icon={<Lock size={64} className="text-warning" />}
        title="403 - 没有访问权限"
        description="您没有权限访问此页面"
        action={<Button variant="primary" onPress={() => navigate("/dashboard")}><Home size={16} />返回首页</Button>}
      />
    </div>
  );
};
export default ForbiddenPage;
