import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVkAuth } from '@/components/extensions/vk-auth/useVkAuth';

const VkCallback = () => {
  const navigate = useNavigate();
  const auth = useVkAuth({
    apiUrls: {
      authUrl: 'https://functions.poehali.dev/198632ae-67a0-4dcb-a577-6da8333f3097?action=auth-url',
      callback: 'https://functions.poehali.dev/198632ae-67a0-4dcb-a577-6da8333f3097?action=callback',
      refresh: 'https://functions.poehali.dev/198632ae-67a0-4dcb-a577-6da8333f3097?action=refresh',
      logout: 'https://functions.poehali.dev/198632ae-67a0-4dcb-a577-6da8333f3097?action=logout',
    },
  });

  useEffect(() => {
    auth.handleCallback().then((success) => {
      if (success) {
        navigate('/');
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-purple-50 to-blue-50">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🔄</div>
        <h2 className="text-2xl font-bold mb-2">Авторизация...</h2>
        <p className="text-muted-foreground">Подождите немного</p>
      </div>
    </div>
  );
};

export default VkCallback;
