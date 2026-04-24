import {StrictMode, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { useAuthStore } from './store/useAuthStore.ts';

const Root = () => {
  const { setLoading } = useAuthStore();

  useEffect(() => {
    // Simulate checking session on mount
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading]);

  return <App />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
