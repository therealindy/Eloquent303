import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ students }) {
    const [sortConfig, setSortConfig] = useState({ key: 'student_name', direction: 'ascending' });
    const [filteredStudents, setFilteredStudents] = useState(students.data);

    // ฟังก์ชันสำหรับการจัดเรียงข้อมูล
    const sortedStudents = [...filteredStudents].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1; //ให้ a อยู่ก่อน b
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1; //a อยู่หลัง b
        }
        return 0;
    });

    // ฟังก์ชันสำหรับการขอจัดเรียงข้อมูล
    const requestSort = (key) => {
        let direction = 'ascending';
        // ถ้า key ที่ส่งมาเหมือนกับ key ที่กำหนดและ direction เป็น ascending ให้เปลี่ยนเป็น descending
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        //กำกหนดค่าใหม่เป็น direction
        setSortConfig({ key, direction });
    };


    // ฟังก์ชันสำหรับการสร้างปุ่มการแบ่งหน้า
    const renderPagination = () => {
        const currentPage = students.current_page;
        const lastPage = students.last_page;
        const paginationLinks = [];

        // ถ้าหน้าปัจจุบันมากกว่า 1 ให้แสดงปุ่ม Previous
        if (currentPage > 1) {
            paginationLinks.push(
                <button
                    key="prev"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={() => window.location.assign(students.prev_page_url)}>
                    Previous
                </button>
            );
        }

        // ถ้ามากกว่า3หน้าจะแสดงปุ่มหน้าที่1ขึ้นมาด้วย
        if (currentPage > 3) {
            paginationLinks.push(
                <button key="1"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    onClick={() => window.location.assign(students.links[1].url)}>
                    1
                </button>
            );
            paginationLinks.push(
                <span key="ellipsis1"
                    className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'>...</span>);
        }

        // เริ่มลูปตั้งแต่หน้าที่ 1 หรือหน้าปัจจุบันลบ 1 (แล้วแต่ค่าไหนมากกว่า) จนถึงหน้าสุดท้ายหรือหน้าปัจจุบันบวก 1(แล้วแต่ค่าน้อยกว่า)
        for (let i = Math.max(1, currentPage - 1); i <= Math.min(lastPage, currentPage + 1); i++) {
            // เพิ่มปุ่มสำหรับแต่ละหน้าลงในอาร์เรย์ paginationLinks
            paginationLinks.push(
                // สร้างปุ่มสำหรับแต่ละหน้า
                <button
                    key={i} // กำหนด key สำหรับแต่ละปุ่มเพื่อให้ React สามารถติดตามแต่ละปุ่มได้
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 ${i === currentPage ? 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-500 focus:outline-offset-0' : ''}`} // กำหนดคลาส CSS สำหรับปุ่ม ถ้าเป็นหน้าปัจจุบันให้เพิ่มคลาส 'active'
                    onClick={() => window.location.assign(students.links[i].url)} // เมื่อคลิกปุ่ม ให้เปลี่ยนหน้าไปยัง URL ของหน้านั้น
                >
                    {i}
                </button>
            );
        }

        // ถ้าหน้าปัจจุบันน้อยกว่าหน้าสุดท้ายให้แสดง ... และหน้าสุดท้าย
        if (currentPage < lastPage - 1) {
            paginationLinks.push(<span key="ellipsis2"
                className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'>...</span>);
            paginationLinks.push(
                <button key={lastPage} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                    onClick={() => window.location.assign(students.last_page_url)}>
                    {lastPage}
                </button>
            );
        }

        // ถ้าหน้าปัจจุบันน้อยกว่าหน้าสุดท้าย ให้แสดงปุ่ม Next
        if (currentPage < lastPage) {
            paginationLinks.push(
                <button key="next" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={() => window.location.assign(students.next_page_url)}>
                    Next
                </button>
            );
        }

        return paginationLinks;
    };

    return (
        <div>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Student
                    </h2>
                }
            >
                <Head title="Register" />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 text-gray-900">
                        <table className="min-w-full divide-y divide-gray-200 mt-4">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                        onClick={() => requestSort('student_name')}>
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                        onClick={() => requestSort('student_name')}>
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                    onClick={() => requestSort('student_name')}>
                                        Phone Number
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                    onClick={() => requestSort('student_name')}>
                                        Major
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students && students.data.length > 0 ? (
                                    sortedStudents.map((student) => (
                                        <tr key={student.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                                                {student.StudentName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.Email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.Phone}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.Major}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            ไม่มีข้อมูลนักเรียน
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {sortedStudents.length > 0 && (
                            <div className="flex justify-center mt-10">
                                {renderPagination()}
                            </div>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    )
}
