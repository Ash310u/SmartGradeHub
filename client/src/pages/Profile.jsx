import { useGetUserQuery, useGetAvatarQuery, useUploadAvatarMutation, setUserInfo, setUserAvatar, useDeleteAvatarMutation } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from 'react';
import defaultAvatar from "../assets/default_avatar.jpg";
import EditPhotoButton from "../components/features/EditPhotoButton";
import RemovePhotoButton from "../components/features/RemovePhotoButton";

const Profile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const userData = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const { data: user, isLoading, error } = useGetUserQuery(undefined, {
    skip: !!(userData.username && userData.email)
  });
  const { data: avatarBlob } = useGetAvatarQuery(userId);
  const [uploadAvatar] = useUploadAvatarMutation();
  const [deleteAvatar] = useDeleteAvatarMutation();

  // Handle avatar blob changes
  useEffect(() => {
    if (avatarBlob) {
      // Clean up any existing object URL to prevent memory leaks
      if (userData.avatarUrl) {
        URL.revokeObjectURL(userData.avatarUrl);
      }
      const avatarUrl = URL.createObjectURL(avatarBlob);
      dispatch(setUserAvatar(avatarUrl));
    }
  }, [avatarBlob]);

  // Handle user data changes
  useEffect(() => {
    if (user && !userData.username) {
      dispatch(setUserInfo({
        username: user.name,
        email: user.email,
        age: user.age,
        joinedDate: user.joinedDate
      }));
    }
  }, [user, userData.username]);

  const handleEditPhoto = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPEG, PNG, or JPG image');
      return;
    }

    // Create FormData and append file
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      await uploadAvatar(formData).unwrap();
      // Refetch avatar after successful upload
      window.location.reload(); // This is a temporary solution to refresh the avatar
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar. Please try again.');
    }
  };

  const handleRemovePhoto = async () => {
    try {
      await deleteAvatar().unwrap();
      // Clear the avatar URL from Redux store
      dispatch(setUserAvatar(defaultAvatar));
    } catch (error) {
      console.error('Error removing avatar:', error);
      alert('Failed to remove avatar. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 md:p-8 lg:p-12 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 md:p-8 lg:p-12 flex items-center justify-center">
        <p>Error loading profile</p>
      </div>
    );
  }

  // Use data from Redux store if available, otherwise use API response
  const displayUser = userData.username ? {
    name: userData.username,
    email: userData.email,
    age: userData.age,
    avatarUrl: userData.avatarUrl,
    department: userData.department,
    year: userData.year,
    sem: userData.sem,
    rollNo: userData.rollNo,
  } : user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="rounded-full overflow-hidden border-4 border-white shadow-md w-full h-full">
                    <img 
                      src={userData.avatarUrl}
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                      style={{ objectFit: 'cover', aspectRatio: '1/1' }}
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <EditPhotoButton 
                      onEdit={handleEditPhoto}
                      fileInputRef={fileInputRef}
                      onFileChange={handlePhotoUpload}
                    />
                    <RemovePhotoButton onRemove={handleRemovePhoto} />
                  </div>
                </div>
                <h2 className="text-2xl font-medium text-gray-700 mt-4">{displayUser.name}</h2>
                {[
                  { label: '', value: displayUser.email },
                  { label: 'Age', value: displayUser.age },
                  { label: 'Department', value: displayUser.department },
                  { label: 'Year', value: displayUser.year },
                  { label: 'Semester', value: displayUser.sem },
                  { label: 'Roll No', value: displayUser.rollNo }
                ].map((item, index) => (
                  <p key={index} className="text-gray-500 mt-1">
                    {item.label && `${item.label}: `}{item.value || 'Not specified'}
                  </p>
                ))}
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-purple-50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-500">Subjects</p>
                    <p className="text-2xl font-semibold text-navy-800">5</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-500">Progress</p>
                    <p className="text-2xl font-semibold text-navy-800">70%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Academic Details */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-semibold text-navy-800">Academic Profile</h1>
                  <p className="text-gray-600 mt-2 font-thin">Track your academic progress with SmartGradeHub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
