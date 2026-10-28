
import {  createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import Feed from './Features/feed/Feed'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Profile from './Features/profile/Profile'
import ProtectedRoute from './middleware/ProtectedRoute'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PostDetails from './Features/feed/components/Posts/PostDetails'
import MainRouting from './middleware/MainRouting'
import SavedPost from './Features/feed/pages/SavedPost'
import MainFeed from './Features/feed/pages/MainFeed'
import { lazy, Suspense } from 'react'
import Loading from './Components/loading/Loading'
import Settings from './Components/settings/Settings'
// import Notifications from './Features/Notifications/Notifications'
const Notifications = lazy(() => import('./Features/Notifications/Notifications'));


function App() {
  const routes = createHashRouter([
    { path: '/', element: <MainRouting><Home></Home></MainRouting> },
    { path: '/auth', element: <Home></Home> },
    {
      path: '', element: <Layout></Layout>, children: [
        // middleware for protected routes
        { path: 'feed', element: <ProtectedRoute> <Feed></Feed> </ProtectedRoute> ,children:[
          { index: true, element: <MainFeed /> },
          {path: 'saved', element:<SavedPost></SavedPost>}
        ]},
        { path: 'profile', element: <ProtectedRoute><Profile></Profile></ProtectedRoute> },
        { path: 'settings', element: <ProtectedRoute><Settings></Settings></ProtectedRoute> },
        { path: 'postDetails/:id', element: <ProtectedRoute><PostDetails></PostDetails></ProtectedRoute> },
        { path: 'notifications', element: <ProtectedRoute>
            <Suspense fallback={<Loading></Loading>}>
              <Notifications></Notifications>
            </Suspense>
          </ProtectedRoute> },
        { path: '*', element: <NotFound></NotFound> },
      ]
    }
  ])
  const query = new QueryClient();
  return (
    <>
      <QueryClientProvider client={query}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer></ToastContainer>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </>
  )
}

export default App
