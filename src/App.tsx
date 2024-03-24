import './App.css';
import { Layout } from './components/layout/Layout';
import { MainPage } from './components/MainPage/MainPage';
import {IndexedDBProvider} from './providers/IndexedDBProvider';

function App() {
  return (
    <>
      <IndexedDBProvider>
        <Layout>
          <MainPage />
        </Layout>
      </IndexedDBProvider>
    </>
  );
}

export default App;
