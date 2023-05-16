import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YoutubeApiProvider } from '../context/youtubeApiContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

export default function Root() {
    return (
        <div>
            <div>
                <Header />
                {/* 헤더아래에서 api관련 context 전달 */}
                <YoutubeApiProvider>
                    {/* query로 router의 outlet을 감싸 줌 */}
                    <QueryClientProvider client={queryCilent}>
                        {/* Recoil 상태관리 */}
                        <RecoilRoot>
                            <Outlet />
                            <ReactQueryDevtools initialIsOpen={false} />
                        </RecoilRoot>
                    </QueryClientProvider>
                </YoutubeApiProvider>
            </div>
        </div>
    );
}

const queryCilent = new QueryClient();
