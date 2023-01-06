import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Root() {
  return (
    <div>
      <div>
        <Header />
        {/* query로 router의 outlet을 감싸 줌 */}
        <QueryClientProvider client={queryCilent}>
          <Outlet />
        </QueryClientProvider>
      </div>
    </div>
  );
}

const queryCilent = new QueryClient();
