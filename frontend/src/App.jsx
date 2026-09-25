import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import Recommendations from "./pages/Recommendations";
import Login from "./pages/Login";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Route */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Protected Routes */}

                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resources"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Resources />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recommendations"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Recommendations />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/analytics"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;