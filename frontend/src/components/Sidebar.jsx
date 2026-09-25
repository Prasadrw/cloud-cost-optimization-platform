import { NavLink } from "react-router-dom";

function Sidebar() {

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">

                <div className="brand-icon">
                    ☁
                </div>

                <div>
                    <h2>Cloud</h2>
                    <span>Optimizer</span>
                </div>

            </div>


            <div className="sidebar-section">

                <p className="sidebar-label">
                    MAIN MENU
                </p>


                <nav className="sidebar-nav">

                    <NavLink
                        to="/analytics"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        <span className="nav-icon">
                            ▣
                        </span>

                        <span>
                            Dashboard
                        </span>
                    </NavLink>


                    <NavLink
                        to="/resources"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        <span className="nav-icon">
                            ◈
                        </span>

                        <span>
                            Resources
                        </span>
                    </NavLink>


                    <NavLink
                        to="/recommendations"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        <span className="nav-icon">
                            ⚡
                        </span>

                        <span>
                            Recommendations
                        </span>
                    </NavLink>

                </nav>

            </div>


            <div className="sidebar-footer">

                <div className="status-dot"></div>

                <div>
                    <strong>System Online</strong>

                    <small>
                        Cloud services active
                    </small>
                </div>

            </div>

        </aside>
    );
}

export default Sidebar;