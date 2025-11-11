import { RouterProvider } from 'react-router-dom';
import router from '../routes.jsx';
import { SessionProvider } from './context/SessionContext.jsx';
function App() {
  

  return (
    <>
      <div className = "bg-slate-900 h-screen">
        <div className = "flex justify-center items-center h-screen">
          <SessionProvider>
              <RouterProvider router={router} />
          </SessionProvider>
         
        </div>
      </div>
    </>
  )
}

export default App
