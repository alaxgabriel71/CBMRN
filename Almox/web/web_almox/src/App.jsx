import AppRoutes from './AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './components/contexts/UserContext'


function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
