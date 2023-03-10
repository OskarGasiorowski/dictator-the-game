import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './pages';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TokenContextProvider } from './hooks';
import { Layout } from '#modules';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <TokenContextProvider>
                <Layout>
                    <RouterProvider router={router} />
                </Layout>
            </TokenContextProvider>
        </QueryClientProvider>
    </StrictMode>,
);
