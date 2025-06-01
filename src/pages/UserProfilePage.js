import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/UserProfile";

function UserProfilePage() {
    return ( 
        <div>
            <Navbar>
                <h1 className="mx-auto text-2" >My Profile</h1>
                <UserProfile></UserProfile>
            </Navbar>
        </div>
     );
}

export default UserProfilePage;