import { Route, Routes } from 'react-router-dom';
import { routes, basePath } from './router';

export const registerRoutes = () => {
    return (
        <Routes>
            {routes.map((route: any, index: number) => (
                <Route key={index} path={basePath + route.path} element={<route.component />} />
            ))}
        </Routes>
    );
};
