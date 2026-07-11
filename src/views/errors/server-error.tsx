import { useNavigate } from "react-router";
import { Button } from "@heroui/react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { SuiEmptyState } from "../../components/serviceui";

const ServerErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SuiEmptyState
        icon={<AlertTriangle size={64} className="text-danger" />}
        title="500 - 服务器错误"
        description="服务器遇到意外错误，请稍后重试"
        action={<Button variant="primary" onPress={() => navigate(0)}><RefreshCw size={16} />刷新重试</Button>}
      />
    </div>
  );
};
export default ServerErrorPage;
