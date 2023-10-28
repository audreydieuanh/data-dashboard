import { Outlet, Link } from "react-router-dom";
import "./Layout.css"

const Layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li className="menu-link" key="home-button">
                        <Link to="/">🏡 Dashboard</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

export default Layout;