import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { thelescopeBanner } from "../../assets";
import { deleteUserInfo } from "../../utils/clinic";
import { useAuthContext } from "../../context";
import { AuthContextType } from "../../types";

const Nav: React.FC<{}> = () => {
    const { signOutUser } = useAuthContext() as AuthContextType;
    const [openNav, setOpenNav] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const handleLogout = async () => {
        try {
            await signOutUser();
            deleteUserInfo();
            navigate("/");
            console.log("logged out");
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const navbarCollapseHandler = () => {
        if (window.innerWidth < 960) {
            setOpenNav(false);
        }
    };

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center text-light-brown lg:gap-8 w-full">
            <Typography as="li" className="p-1 font-normal">
                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        isActive ? "active-nav-link" : ""
                    }
                    onClick={navbarCollapseHandler}
                >
                    Home
                </NavLink>
            </Typography>
            <Typography as="li" className="p-1 font-normal">
                <NavLink
                    to="/patients"
                    className={({ isActive }) =>
                        isActive ? "active-nav-link" : ""
                    }
                    onClick={navbarCollapseHandler}
                >
                    Patients
                </NavLink>
            </Typography>
            <Typography as="li" className="p-1 font-normal">
                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        isActive ? "active-nav-link" : ""
                    }
                    onClick={navbarCollapseHandler}
                >
                    Transactions
                </NavLink>
            </Typography>
            <Typography as="li" className="p-1 font-normal">
                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        isActive ? "active-nav-link" : ""
                    }
                    onClick={navbarCollapseHandler}
                >
                    Clinic Info
                </NavLink>
            </Typography>

            <li>
                <button
                    className="btn whitespace-nowrap"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </li>
        </ul>
    );
    return (
        <>
            <Navbar
                className="h-max py-4 px-4 xl:px-8 lg:py-4 mx-auto rounded-md w-[95%] md:w-[98%] bg-white/10"
                shadow={false}
                blurred={false}
                fullWidth={true}
            >
                <div className="flex items-center justify-between text-light-brown">
                    <a href="/home">
                        <img
                            src={thelescopeBanner}
                            className="w-[148px] md:w-auto md:max-w-[200px]"
                        />
                    </a>

                    <div className="flex items-center gap-4">
                        <div className=" hidden lg:block">{navList}</div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <CloseIcon className="h-6 w-6 text-light-brown" />
                            ) : (
                                <MenuIcon className="h-6 w-6 text-light-brown" />
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>{openNav && navList}</Collapse>
            </Navbar>
        </>
    );
};

export default Nav;
