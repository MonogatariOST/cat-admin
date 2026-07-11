import { useNavigate } from "react-router";
import { Button } from "@heroui/react";
import { SearchX, Home } from "lucide-react";
import { SuiEmptyState } from "../../components/serviceui";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SuiEmptyState
        icon={<SearchX size={64} className="text-danger" />}
        title="404 - 页面未找到"
        description="访问的页面不存在或已被移除"
        action={<Button variant="primary" onPress={() => navigate("/dashboard")}><Home size={16} />返回首页</Button>}
      />
    </div>
  );
};
export default NotFoundPage;
