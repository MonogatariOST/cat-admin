/**
 * User Detail page / 用户详情页面
 * Lazy-loaded route component for viewing and editing a single user.
 * / 查看和编辑单个用户的懒加载路由组件
 */

import { useParams, useNavigate } from 'react-router';
import { useCallback } from 'react';
import { BuiPage } from '../../components/baseui';
import { Card, Button } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';

/**
 * UserDetail - User detail/edit page / 用户详情/编辑页面
 * Reads userId from URL params via react-router / 从路由参数中读取 userId
 */
const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate('/users');
  }, [navigate]);

  return (
    <BuiPage>
      { /* Back button / 返回按钮 */ }
      <Button variant="ghost" className="mb-4" onPress={goBack}>
        <ArrowLeft size={16} />
        <span>返回列表</span>
      </Button>

      <Card className="p-6">
        <Card.Header>
          <Card.Title>用户信息</Card.Title>
          <Card.Description>
            {'用户标识: ' + (id ?? '')}
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="py-8 text-center text-foreground-400">
           用户详情表单将在此处渲染
          </p>
        </Card.Content>
      </Card>
    </BuiPage>
  );
};

export default UserDetail;
