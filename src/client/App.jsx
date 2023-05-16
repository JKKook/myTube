import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import NotFound from './pages/NotFound';
import Root from './pages/Root';
import Auth from './pages/Auth';
import Register from './pages/Register';

export default function App() {
    return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Videos /> },
            { path: 'users/login', element: <Auth /> },
            { path: 'users/register', element: <Register /> },
            { path: 'videos', element: <Videos /> },
            { path: 'videos/:keyword', element: <Videos /> },
            { path: 'videos/watch/:videoId', element: <VideoDetail /> },
        ],
    },
]);
