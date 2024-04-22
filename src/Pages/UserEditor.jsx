import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.jsx';

function UserEditor() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [editName, setEditName] = useState(false);
    const [newName, setNewName] = useState('');
    const [editEmail, setEditEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [editDateOfBirth, setEditDateOfBirth] = useState(false);
    const [newDateOfBirth, setNewDateOfBirth] = useState('');
    const [editPhoneNumber, setEditPhoneNumber] = useState(false);
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [editGender, setEditGender] = useState(false);
    const [newGender, setNewGender] = useState('');
    const [editAvatar, setEditAvatar] = useState(false);
    const [newAvatar, setNewAvatar] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://localhost:7291/api/User/detail`, { withCredentials: true, });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUser();
    }, [userId, navigate, editName, editDateOfBirth, editEmail, editPhoneNumber, editGender]);

    const handleUpdateName = async () => {
        try {
            await axios.put(`https://localhost:7291/api/User/updateFullName`, {
                fullName: newName,
            }, { withCredentials: true, });
            setUser(prev => ({ ...prev, name: newName }));
            console.log(user);
            setEditName(false);
        } catch (error) {
            console.error('Error updating user name:', error);
        }
    };

    const handleUpdateEmail = async () => {
        try {
            await axios.put(`https://localhost:7291/api/User/updateEmail`, {
                email: newEmail,
            }, { withCredentials: true, });
            setUser(prev => ({ ...prev, email: newEmail }));
            setEditEmail(false);
        } catch (error) {
            console.error('Error updating user email:', error);
        }
    };

    // Hàm cập nhật Date of Birth
    const handleUpdateDateOfBirth = async () => {
        try {
            await axios.put(`https://localhost:7291/api/User/updateDateOfBirth`, {
                dateOfBirth: newDateOfBirth,
            }, { withCredentials: true, });
            setUser(prev => ({ ...prev, userInfo: { ...prev.userInfo, dateOfBirth: newDateOfBirth } }));
            setEditDateOfBirth(false);
        } catch (error) {
            console.error('Error updating user date of birth:', error);
        }
    };

    // Hàm cập nhật Phone Number
    const handleUpdatePhoneNumber = async () => {
        try {
            await axios.put(`https://localhost:7291/api/User/updatePhoneNumber`, {
                phoneNumber: newPhoneNumber,
            }, { withCredentials: true, });
            setUser(prev => ({ ...prev, userInfo: { ...prev.userInfo, phoneNumber: newPhoneNumber } }));
            setEditPhoneNumber(false);
        } catch (error) {
            console.error('Error updating user phone number:', error);
        }
    };

    // Hàm cập nhật Gender
    const handleUpdateGender = async () => {
        try {
            await axios.put(`https://localhost:7291/api/User/updateGender`, {
                gender: newGender,
            }, { withCredentials: true, });
            setUser(prev => ({ ...prev, userInfo: { ...prev.userInfo, gender: newGender } }));
            setEditGender(false);
        } catch (error) {
            console.error('Error updating user gender:', error);
        }
    };

    const [imageFile, setImageFile] = useState(null); // State để lưu file ảnh được chọn

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImage = async () => {
        if (imageFile) {
            const imageRef = ref(storage, `userAvatars/${imageFile.name}`);
            const uploadTask = uploadBytesResumable(imageRef, imageFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Hiển thị tiến trình tải lên nếu muốn
                },
                (error) => {
                    console.error("Error uploading image:", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        // Cập nhật URL ảnh của người dùng trên server
                        updateAvatar(url);
                    });
                }
            );
        }
    };

    const updateAvatar = async (imageUrl) => {
        try {
            await axios.put(`https://localhost:7291/api/User/updateAvatar`, {
                avatar: imageUrl,
            }, { withCredentials: true });
            // Cập nhật state của user để UI phản ánh sự thay đổi
            setUser(prev => ({ ...prev, userInfo: { ...prev.userInfo, avatar: imageUrl } }));
            setEditAvatar(false); // Ẩn form chỉnh sửa
        } catch (error) {
            console.error('Error updating user avatar:', error);
        }
    };


    if (!user) return <div className="container mx-auto px-4 sm:max-w-screen-lg">Loading...</div>;

    return (
        <div className="container mx-auto px-4 sm:max-w-screen-lg flex flex-row flex-wrap justify-between">
            <div className="text-2xl w-full font-bold mb-4">User Info Edit</div>

            <div className='w-full lg:w-5/12'>
                <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                    <div className='flex flex-row justify-between mb-4 text-lg'>
                        <div className='font-semibold w-1/2'>User Avatar</div>
                        <button onClick={() => { setEditAvatar(true); setNewAvatar(user.userInfo.Avata); }} className='font-semibold w-auto text-right items-center'>
                            Edit Avatar
                        </button>
                    </div>

                    {editAvatar ? (
                        <div>
                            <p>Choose a square or circle image for better experience!!!</p>
                            <input className='inline-block w-1/2' type="file" onChange={handleImageChange} />
                            <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5 inline-block' onClick={uploadImage}>
                                Upload
                            </button>
                            <button onClick={() => { setEditAvatar(false) }} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5 inline-block'>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className='font-normal '>
                            <img title='User Avatar' className='m-auto rounded-full w-60 h-60' src={user.userInfo.avatar} />
                        </div>
                    )}
                </div>

                <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                    <div className='flex flex-row justify-between mb-4 text-lg'>
                        <div className='font-semibold w-1/2'>User Full Name</div>
                        <button onClick={() => { setEditName(true); setNewName(user.userInfo.fullName); }} className='font-semibold w-auto text-right items-center'>
                            Edit Full Name
                        </button>
                    </div>

                    {editName ? (
                        <div>
                            <input className='w-full p-3 h-11 rounded-md' type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                            <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5' onClick={handleUpdateName}>
                                Save
                            </button>
                            <button onClick={() => { setEditName(false) }} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>
                        </div>
                    ) : (
                        <div className='font-normal'>
                            {user.userInfo.fullName}
                        </div>
                    )}
                </div>

                <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                    <div className='flex flex-row justify-between mb-4 text-lg'>
                        <div className='font-semibold w-1/2'>User Email</div>
                        <button onClick={() => { setEditEmail(true); setNewEmail(user.userInfo.email); }} className='font-semibold w-auto text-right items-center'>
                            Edit Email
                        </button>
                    </div>

                    {editEmail ? (
                        <div>
                            <input className='w-full p-3 h-11 rounded-md' type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                            <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5' onClick={handleUpdateEmail}>
                                Save
                            </button>
                            <button onClick={() => { setEditEmail(false) }} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>
                        </div>
                    ) : (
                        <div className='font-normal'>
                            {user.userInfo.email}
                        </div>
                    )}
                </div>
            </div>

            <div className='w-full lg:w-5/12'>
                <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                    <div className='flex flex-row justify-between mb-4 text-lg'>
                        <div className='font-semibold w-1/2'>Date of Birth</div>
                        <button onClick={() => { setEditDateOfBirth(true); setNewDateOfBirth(user.userInfo.dateOfBirth); }} className='font-semibold w-auto text-right items-center'>
                            Edit
                        </button>
                    </div>

                    {editDateOfBirth ? (
                        <div>
                            <input className='w-full p-3 h-11 rounded-md' type="date" value={newDateOfBirth} onChange={(e) => setNewDateOfBirth(e.target.value)} />
                            <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5' onClick={handleUpdateDateOfBirth}>
                                Save
                            </button>
                            <button onClick={() => { setEditDateOfBirth(false) }} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>
                        </div>
                    ) : (
                        <div className='font-normal'>
                            {new Date(user.userInfo.dateOfBirth).toLocaleDateString()}
                        </div>
                    )}
                </div>

                <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                    <div className='flex flex-row justify-between mb-4 text-lg'>
                        <div className='font-semibold w-1/2'>Phone Number</div>
                        <button onClick={() => { setEditPhoneNumber(true); setNewPhoneNumber(user.userInfo.phoneNumber); }} className='font-semibold w-auto text-right items-center'>
                            Edit
                        </button>
                    </div>

                    {editPhoneNumber ? (
                        <div>
                            <input className='w-full p-3 h-11 rounded-md' type="text" value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
                            <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5' onClick={handleUpdatePhoneNumber}>
                                Save
                            </button>
                            <button onClick={() => { setEditPhoneNumber(false) }} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>
                        </div>
                    ) : (
                        <div className='font-normal'>
                            {user.userInfo.phoneNumber}
                        </div>
                    )}
                </div>

                <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                    <div className='flex flex-row justify-between mb-4 text-lg'>
                        <div className='font-semibold w-1/2'>Gender</div>
                        <button onClick={() => { setEditGender(true); setNewGender(user.userInfo.gender); }} className='font-semibold w-auto text-right items-center'>
                            Edit
                        </button>
                    </div>

                    {editGender ? (
                        <div>
                            <select className='w-full p-3 h-11 rounded-md' value={newGender} onChange={(e) => setNewGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5' onClick={handleUpdateGender}>
                                Save
                            </button>
                            <button onClick={() => { setEditGender(false) }} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>
                        </div>
                    ) : (
                        <div className='font-normal'>
                            {user.userInfo.gender}
                        </div>
                    )}
                </div>
            </div>


        </div>
    );
}

export default UserEditor;