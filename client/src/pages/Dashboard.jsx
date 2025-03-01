import ChatSection from '../components/ChatSection';
import { useGetUserSubjectsQuery, useGetUserQuery } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUserInfo } from '../store';
import { setSubjects } from '../store';

const Dashboard = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const dispatch = useDispatch();
    const { data: userData } = useGetUserQuery();
    const { data } = useGetUserSubjectsQuery();
    
    dispatch(setSubjects(data));
    const { subjects } = useSelector((state) => state.subjects);
    
    useEffect(() => {
        if (userData) {
            dispatch(setUserInfo({
                name: userData.name,
                email: userData.email,
                age: userData.age,
                rollNo: userData.rollNo,
                department: userData.department,
                year: userData.year,
                sem: userData.sem,
            }));    
        }
    }, [userData]);

    return (
        <div className="h-[80vh] flex bg-gradient-to-br from-sky-50 to-gray-100 overflow-hidden">
            <div className="w-2/7 bg-white/80 backdrop-blur-md p-6 overflow-y-auto shadow-lg
                          scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-gray-100/50
                          scrollbar-thumb-rounded-full scrollbar-track-rounded-full over">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Subjects</h2>
                <ul className="space-y-6">
                    {subjects?.map((subject) => (
                        <li 
                            key={subject._id}
                            className="p-4 bg-white rounded-xl shadow-md hover:shadow-gray-200 transition-all duration-300 
                                     hover:scale-[1.02] cursor-pointer border border-sky-100 
                                     hover:bg-gradient-to-r hover:from-sky-50 hover:to-white
                                     backdrop-blur-sm group"
                        >
                            <iframe src={subject.pdf_url} width="100%" height="200px" className="rounded-lg mb-3"></iframe>
                            <h3 className="font-semibold text-lg text-gray-800 group-hover:text-sky-600">{subject.subjectCode}</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Semester: {subject.sem} | Year: {subject.year}
                            </p>
                            <button 
                                onClick={() => setSelectedSubject(subject.pdf_url)}
                                className="mt-3 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 
                                         transition-colors duration-300"
                            >
                                Ask AI about this subject
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Side - Chat Interface */}
            <div className="flex-1 p-6 bg-white/50 backdrop-blur-sm">
                <ChatSection selectedSubject={selectedSubject} />
            </div>
        </div>
    );
}

export default Dashboard;
