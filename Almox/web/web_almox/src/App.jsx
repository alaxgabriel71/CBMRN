import { UserProvider } from './components/contexts/UserContext'
import AppRoutes from './AppRoutes'
import { BrowserRouter } from 'react-router-dom'


function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
