import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

function LogOut() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)
    useEffect(() => {
        dispatch(signOutAsync());
    })
    return (
        <>
            {!user && <Navigate to='/' replace={true} ></Navigate>}
        </>
    );
}

export default LogOut;