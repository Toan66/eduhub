import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Pencil from '../../Components/Icons/Pencil.jsx';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase.jsx';
import IconAddCircleOutline from '../../Components/Icons/IconAddCircleOutline.jsx';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import IconDragHandleDots2 from '../../Components/Icons/IconDragHandleDots2.jsx';

function CourseEditor() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [editTitle, setEditTitle] = useState(false); // Quản lý việc hiển thị form chỉnh sửa
    const [newTitle, setNewTitle] = useState(''); // Giá trị title mới
    const [editDescription, setEditDescription] = useState(false); // Quản lý việc hiển thị form chỉnh sửa mô tả
    const [newDescription, setNewDescription] = useState(''); // Giá trị mô tả mới
    const [editImage, setEditImage] = useState(false); // Quản lý việc hiển thị form chỉnh sửa mô tả
    const [imageFile, setImageFile] = useState(null); // File ảnh được chọn
    const [selectedCategory, setSelectedCategory] = useState(''); // State để lưu trữ danh mục được chọn
    const [editCategory, setEditCategory] = useState(false); // Quản lý việc hiển thị form chỉnh sửa danh mục
    const [categories, setCategories] = useState([]); // State để lưu trữ danh sách các danh mục
    const [editChapterOrder, setEditChapterOrder] = useState(false);
    const [levels, setLevels] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState('');
    const [editLevel, setEditLevel] = useState(false);
    const [editPrice, setEditPrice] = useState(false);
    const [newPrice, setNewPrice] = useState('');
    const [editEarnings, setEditEarnings] = useState(false);
    const [newEarnings, setNewEarnings] = useState('');

    const navigate = useNavigate(); // Sử dụng hook useNavigate


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`https://localhost:7291/api/Course/${courseId}/details/edit`, { withCredentials: true });
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
                navigate("/Unauthorized");
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://localhost:7291/api/Course/category', { withCredentials: true });
                const categoriesData = response.data.$values;
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchLevels = async () => {
            try {
                const response = await axios.get('https://localhost:7291/api/Course/level', { withCredentials: true });
                const levelsData = response.data.$values;
                setLevels(levelsData);
            } catch (error) {
                console.error('Error fetching levels:', error);
            }
        };

        setEditChapterOrder(false);

        fetchCourse();
        fetchCategories();
        fetchLevels();
    }, [courseId, editChapterOrder, editCategory, editLevel, editPrice, editEarnings]);

    const handleUpdateTitle = async () => {
        try {
            await axios.put(`https://localhost:7291/api/Course/${courseId}/updateName`, {
                courseName: newTitle,
            }, { withCredentials: true });
            // Cập nhật state của course để UI phản ánh sự thay đổi
            setCourse(prev => ({ ...prev, courseName: newTitle }));
            setEditTitle(false); // Ẩn form chỉnh sửa
        } catch (error) {
            console.error('Error updating course title:', error);
            alert(error);
        }
    };

    const handleUpdateDescription = async () => {
        try {
            await axios.put(`https://localhost:7291/api/Course/${courseId}/updateDescription`, {
                courseDescription: newDescription,
            }, { withCredentials: true });
            // Cập nhật state của course để UI phản ánh sự thay đổi
            setCourse(prev => ({ ...prev, courseDescription: newDescription }));
            setEditDescription(false); // Ẩn form chỉnh sửa
        } catch (error) {
            console.error('Error updating course description:', error);
        }
    };
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImage = async () => {
        if (imageFile) {
            const imageRef = ref(storage, `featureImages/${imageFile.name}`);
            const uploadTask = uploadBytesResumable(imageRef, imageFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Bạn có thể thêm mã để hiển thị tiến trình tải lên nếu muốn
                },
                (error) => {
                    console.error("Error uploading image:", error);
                },
                () => {
                    // Khi tải lên thành công, lấy URL của ảnh
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        // Cập nhật URL ảnh của khóa học trên server của bạn
                        updateCourseImage(url);
                    });
                }
            );
        }
    };

    const updateCourseImage = async (imageUrl) => {
        try {
            await axios.put(`https://localhost:7291/api/Course/${courseId}/updateImage`, {
                featureImage: imageUrl,
            }, { withCredentials: true });
            // Cập nhật state của course để UI phản ánh sự thay đổi
            setCourse(prev => ({ ...prev, featureImage: imageUrl }));
            setEditImage(false); // Ẩn form chỉnh sửa
        } catch (error) {
            console.error('Error updating course image:', error);
        }
    };
    const handleUpdateCategory = async () => {
        try {
            await axios.put(`https://localhost:7291/api/Course/${courseId}/updateCategory`, {
                categoryId: selectedCategory, // Sử dụng ID danh mục đã chọn
            }, { withCredentials: true });
            setCourse(prev => ({ ...prev, categoryId: selectedCategory }));
            setEditCategory(false);
        } catch (error) {
            console.error('Error updating course category:', error);
            alert('Failed to update category');
        }
    };
    // Example function to update the course level
    const handleUpdateLevel = async () => {
        try {
            await axios.put(`https://localhost:7291/api/Course/${courseId}/updateLevel`, {
                courseLevelId: selectedLevel,
            }, { withCredentials: true });
            setCourse(prev => ({ ...prev, levelId: selectedLevel }));
            setEditLevel(false);
        } catch (error) {
            console.error('Error updating course level:', error);
            alert('Failed to update level');
        }
    };

    // Example function to update the course price
    const handleUpdatePrice = async () => {
        try {
            await axios.put(`https://localhost:7291/api/Course/${courseId}/updatePrice`, {
                coursePrice: newPrice,
            }, { withCredentials: true });
            setCourse(prev => ({ ...prev, price: newPrice }));
            setEditPrice(false);
        } catch (error) {
            console.error('Error updating course price:', error);
            alert('Failed to update price');
        }
    };

    // Example function to update the course earnings
    const handleUpdateEarnings = async () => {
        try {
            await axios.put(`https://localhost:7291/api/Course/${courseId}/updateEarn`, {
                courseEarn: newEarnings
            }, { withCredentials: true });
            setCourse(prev => ({ ...prev, earnings: newEarnings }));
            setEditEarnings(false);
        } catch (error) {
            console.error('Error updating course earnings:', error);
            alert('Failed to update earnings');
        }
    };


    // Giả sử đây là hàm xử lý khi việc kéo và thả kết thúc
    async function handleOnDragEnd(result) {
        // Kiểm tra xem phần tử được kéo có được thả vào một vị trí hợp lệ không
        if (!result.destination) return;

        // Tạo một bản sao của mảng chapters hiện tại
        const items = Array.from(course.chapters.$values);
        // Lấy ra phần tử được kéo
        const [reorderedItem] = items.splice(result.source.index, 1);
        // Chèn phần tử vào vị trí mới
        items.splice(result.destination.index, 0, reorderedItem);

        // Tạo JSON để gửi lên server với thứ tự mới
        const chaptersOrder = items.map((chapter, index) => ({
            chapterId: chapter.chapterId,
            newOrder: index + 1 // Giả sử thứ tự bắt đầu từ 1
        }));

        // Gửi dữ liệu thứ tự mới đến server
        try {
            const response = await axios.put(`https://localhost:7291/api/Chapter/Course/${courseId}/updateChapterOrder`, {
                chaptersOrder: chaptersOrder
            }, { withCredentials: true });

            setEditChapterOrder(true);
            // Xử lý phản hồi từ server ở đây, ví dụ: cập nhật UI, thông báo thành công, v.v...
            console.log('Chapter order updated successfully:', response.data);

        } catch (error) {
            console.error('Error updating chapter order:', error);
        }
    }

    const handleDeleteCourse = async () => {
        // Hiển thị hộp thoại xác nhận
        const isConfirmed = window.confirm('Are you sure you want to delete this chapter?');
        if (isConfirmed) {
            try {
                await axios.delete(`https://localhost:7291/api/Course/${courseId}`, { withCredentials: true });
                alert('Course deleted successfully');
                navigate(-1); // Quay lại trang trước sau khi xóa
            } catch (error) {
                console.error('Error deleting course:', error);
                alert('Failed to delete course');
            }
        }
    };

    if (!course) return <div className="container mx-auto px-4 sm:max-w-screen-lg">
        Loading ...
    </div>;

    return (
        <div className="container mx-auto px-4 sm:max-w-screen-lg">
            <div className="text-3xl font-bold mb-4 flex align-middle items-center justify-between">
                Course Setup
                <button className=' text-xl bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5 float-right' onClick={handleDeleteCourse}>
                    Delete Course
                </button>
            </div>



            <div className='flex flex-col justify-between md:flex-row'>

                <div className="mb-8 w-full lg:w-1/2 pr-3">
                    <div className="mb-8 text-xl font-semibold">Customize your course</div>

                    <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                        <div className='flex flex-row justify-between mb-4 text-lg'>
                            <div className='font-semibold w-1/2'>Course title</div>
                            <button onClick={() => { setEditTitle(true); setNewTitle(course.courseName); }} className='font-semibold w-autobutton text-right items-center'>
                                <span className='inline-block mr-2'><Pencil /></span>
                                Edit title
                            </button>
                        </div>

                        {editTitle ? (
                            <div>
                                <input className='w-full p-3 h-11 rounded-md overflow-y-scroll' type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                                <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5' onClick={handleUpdateTitle}>
                                    Save
                                </button>
                                <button onClick={() => { setEditTitle(false) }} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>

                            </div>
                        ) : (
                            <div className='font-normal'>
                                {course.courseName}
                            </div>
                        )}
                    </div>

                    <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                        <div className='flex flex-row justify-between mb-4 text-lg'>
                            <div className='font-semibold w-1/2'>Course description</div>
                            <button onClick={() => { setEditDescription(true); setNewDescription(course.courseDescription); }} className='font-semibold w-auto text-right items-center'>
                                <span className='inline-block mr-2'><Pencil /></span>
                                Edit description
                            </button>
                        </div>

                        {editDescription ? (
                            <div>
                                <textarea className='w-full p-3 h-32 rounded-md' value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></textarea>
                                <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5' onClick={handleUpdateDescription}>
                                    Save
                                </button>
                                <button onClick={() => { setEditDescription(false) }} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>

                            </div>
                        ) : (
                            <div className='font-normal'>
                                {course.courseDescription}
                            </div>
                        )}
                    </div>

                    <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                        <div className='flex flex-row justify-between mb-4 text-lg'>
                            <div className='font-semibold w-1/2'>Course image</div>
                            <button onClick={() => { setEditImage(true) }} className='font-semibold w-auto text-right items-center'>
                                <span className='inline-block mr-2'><Pencil /></span>
                                Change image
                            </button>
                        </div>

                        {editImage ? (
                            <>
                                <input type="file" id="featureImage" onChange={handleImageChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                <button onClick={() => uploadImage()} className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5'>Save</button>
                                <button onClick={() => { setEditImage(false) }} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>

                            </>
                        ) : (
                            <div className='font-normal'>
                                {!course.featureImage
                                    ?
                                    <div>Dont have images</div>
                                    :
                                    <img src={course.featureImage} alt="Feature" className="w-full rounded-lg" />}
                            </div>
                        )}

                    </div>

                    <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                        <div className='flex flex-row justify-between mb-4 text-lg'>
                            <div className='font-semibold w-1/2'>Course level</div>
                            <button onClick={() => { setEditLevel(true); setSelectedLevel(course.courseLevelId); }} className='font-semibold w-auto text-right items-center'>
                                <span className='inline-block mr-2'><Pencil /></span>
                                Edit level
                            </button>
                        </div>

                        {editLevel ? (
                            <>
                                <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="w-full p-3 h-15 rounded-md">
                                    {levels.map((level) => (
                                        <option key={level.courseLevelId} value={level.courseLevelId}>
                                            {level.courseLevelName}
                                        </option>
                                    ))}
                                </select>
                                <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5' onClick={handleUpdateLevel}>
                                    Save Level
                                </button>
                                <button onClick={() => { setEditLevel(false) }} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>
                            </>
                        ) : (
                            <div className='font-normal'>
                                {levels.find(level => level.courseLevelId === course.courseLevelId)?.courseLevelName || 'Level not found'}
                            </div>
                        )}
                    </div>


                </div>

                <div className="mb-8 w-full lg:w-1/2 pl-3">
                    <div className="mb-8 text-xl font-semibold">Course chapters</div>

                    <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                        <div className='flex flex-row justify-between items-center mb-4 text-lg'>
                            <div className='font-semibold w-1/2'>Course chapters</div>
                            <Link to={`/Course/${course.courseId}/Chapter/Create`} className='font-semibold w-auto text-right items-center'>
                                <span className='inline-block mr-2'><IconAddCircleOutline height="16px" width="16px" /></span>
                                Add a chapter
                            </Link>
                        </div>

                        {/* <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                            <div className='flex flex-row justify-between items-center mb-4 text-lg'>

                                <div className='font-semibold w-1/2'>Course chapters</div>
                                <Link to={`/Course/${course.courseId}/Chapter/Create`} className='font-semibold w-auto text-right items-center'>
                                    <span className='inline-block mr-2'><IconAddCircleOutline height="16px" width="16px" /></span>
                                    Add a chapter
                                </Link>
                            </div>

                            <div className='flex flex-col p-2'>
                                {course.chapters.$values.map((chapter) => (
                                    <div key={chapter.chapterId} className="mb-4 flex flex-row justify-between bg-indigo-100 p-2 rounded-md">
                                        <h3 className=" font-semibold w-1/2">{chapter.chapterTitle}</h3>
                                        <Link to={`/Chapter/${chapter.chapterId}/Edit`} className="w-auto text-right">
                                            Edit
                                            <span className='inline-block ml-2'><Pencil /></span>
                                        </Link>

                                    </div>
                                ))}
                            </div>
                        </div> */}

                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="chapters">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col p-2">
                                        {course.chapters.$values.sort((a, b) => a.chapterOrder - b.chapterOrder).map((chapter, index) => (
                                            <Draggable key={chapter.chapterId} draggableId={chapter.chapterId.toString()} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="mb-4 flex flex-row justify-between bg-indigo-100 p-2 rounded-md">
                                                        <h3 className="font-semibold w-1/2 flex flex-row items-center">
                                                            <IconDragHandleDots2 />
                                                            {chapter.chapterTitle}
                                                        </h3>
                                                        <Link to={`/Chapter/${chapter.chapterId}/Edit`} className="w-auto text-right font-semibold">
                                                            Edit
                                                            <span className='inline-block ml-2'><Pencil /></span>
                                                        </Link>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

                    </div>


                    <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                        <div className='flex flex-row justify-between mb-4 text-lg'>
                            <div className='font-semibold w-1/2'>Course category</div>
                            <button onClick={() => { setEditCategory(true); setSelectedCategory(course.categoryId);}} className='font-semibold w-autobutton text-right items-center'>
                                <span className='inline-block mr-2'><Pencil /></span>
                                Edit category
                            </button>
                        </div>

                        {editCategory ? (<>
                            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-3 h-15 rounded-md">
                                {categories.map((category) => (
                                    <option key={category.courseCategoryId} value={category.courseCategoryId}>
                                        {category.courseCategoryName}
                                    </option>
                                ))}
                            </select>
                            <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5' onClick={handleUpdateCategory}>
                                Save Category
                            </button>
                            <button onClick={() => { setEditCategory(false) }} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>
                        </>

                        ) : (
                            <div className='font-normal'>
                                {categories.find(category => category.courseCategoryId === course.categoryId)?.courseCategoryName || 'Category not found'}

                            </div>)}
                    </div>

                    <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                        <div className='flex flex-row justify-between mb-4 text-lg'>
                            <div className='font-semibold w-1/2'>Course price</div>
                            <button onClick={() => {setEditPrice(true); setNewPrice(course.coursePrice)}} className='font-semibold w-auto text-right items-center'>
                                <span className='inline-block mr-2'><Pencil /></span>
                                Edit price
                            </button>
                        </div>

                        {editPrice ? (
                            <div>
                                <input type="number" className='w-full p-3 h-11 rounded-md' value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                                <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5' onClick={handleUpdatePrice}>
                                    Save
                                </button>
                                <button onClick={() => setEditPrice(false)} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>
                            </div>
                        ) : (
                            <div className='font-normal'>
                                {course.coursePrice} EHT
                            </div>
                        )}
                    </div>


                    <div className="rounded-lg bg-indigo-50 p-3 mb-6">
                        <div className='flex flex-row justify-between mb-4 text-lg'>
                            <div className='font-semibold w-1/2'>Course earnings</div>
                            <button onClick={() => {setEditEarnings(true); setNewEarnings(course.courseEarn)}} className='font-semibold w-auto text-right items-center'>
                                <span className='inline-block mr-2'><Pencil /></span>
                                Edit earnings
                            </button>
                        </div>

                        {editEarnings ? (
                            <div>
                                <input type="number" className='w-full p-3 h-11 rounded-md' value={newEarnings} onChange={(e) => setNewEarnings(e.target.value)} />
                                <button className='text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5' onClick={handleUpdateEarnings}>
                                    Save
                                </button>
                                <button onClick={() => setEditEarnings(false)} className='text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5'>Cancel</button>
                            </div>
                        ) : (
                            <div className='font-normal'>
                                {course.courseEarn} EHT
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div >
    );
}

export default CourseEditor;