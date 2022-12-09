import ProfileImagePreview from "../profile/ProfileImagePreview";
import NavBar from "../NavBar";

const ProfilePage = () => {
    return (
        <div className={"profile-page-layout"}>
            <ProfileImagePreview />
            <NavBar />
        </div>
    );
}

export default ProfilePage;