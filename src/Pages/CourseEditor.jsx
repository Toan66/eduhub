import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Pencil from '../Components/Icons/Pencil';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.jsx';
import IconAddCircleOutline from '../Components/Icons/IconAddCircleOutline';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import IconDragHandleDots2 from '../Components/Icons/IconDragHandleDots2';

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
    const navigate = useNavigate(); // Sử dụng hook useNavigate


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`https://localhost:7291/api/Course/${courseId}/details/edit`, { withCredentials: true });
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
                // alert(error);
                navigate("/Unauthorized");

            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://localhost:7291/api/Course/category', { withCredentials: true });
                // Trích xuất mảng các danh mục từ thuộc tính $values của đối tượng trả về
                const categoriesData = response.data.$values;
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        setEditChapterOrder(false);

        fetchCourse();
        fetchCategories();
    }, [courseId, editChapterOrder,editCategory]);

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

    if (!course) return <div className="container mx-auto px-4 sm:max-w-screen-lg">
        Loading ...
    </div>;

    return (
        <div className="container mx-auto px-4 sm:max-w-screen-lg">
            <div className="text-3xl font-bold mb-4">Course Setup</div>

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
                            <button onClick={() => { setEditCategory(true); }} className='font-semibold w-autobutton text-right items-center'>
                                <span className='inline-block mr-2'><Pencil /></span>
                                Edit course Category
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
                </div>
            </div>

        </div >
    );
}

export default CourseEditor;