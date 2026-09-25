import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login", {
            replace: true
        });

    };

    return (

        <header className="top-header">

            <div className="header-title">

                <h1>
                    Cloud Cost Optimization
                </h1>

                <p>
                    Monitor and optimize your cloud spending
                </p>

            </div>


            <div className="header-right">

                <div className="environment-badge">

                    <span className="status-dot"></span>

                    Development

                </div>


                <div className="user-profile">

                    <div className="user-avatar">
                        P
                    </div>

                    <div className="user-info">

                        <strong>
                            Cloud Admin
                        </strong>

                        <span>
                            Administrator
                        </span>

                    </div>

                </div>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </header>

    );

}

export default Header;