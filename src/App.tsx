import {
  // createBrowserRouter,
  RouterProvider,
  Navigate,
  createHashRouter,
} from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './pages/RootLayout';

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',
        element: <ProductDetailPage />,
      },
      {
        path: '/create-product',
        element: <CreateProductPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
