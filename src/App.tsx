import { HomePage } from '@/pages/Home/home';
import { registerRoutes } from './router/registerRoutes';
import { Layout } from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import './iconfont/iconfont.css';
function App() {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <main>{registerRoutes()}</main>
                </Layout>
            </BrowserRouter>
        </>
    );
}

export default App;
