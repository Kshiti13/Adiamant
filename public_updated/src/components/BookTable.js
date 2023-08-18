import React, { useState, useEffect } from 'react';

const BookTable = ({ bookData }) => {
    console.log(bookData);


    const handleDownload = async (e, id,) => {
        e.preventDefault()
        try {
            const response = await fetch('https://adiamant-server-production.up.railway.app/api/getpdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id
                }), 
            });

            if (response.ok) {
                const pdfBlob = await response.blob();
                const url = URL.createObjectURL(pdfBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${id}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
            } else {
                alert('Something went wrong !! Please try again')
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong')
        }

    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-lg font-semibold mb-4">Book Data</h2>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border py-2 px-4">ID</th>
                        <th className="border py-2 px-4">Title</th>
                        <th className="border py-2 px-4">Download</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log(bookData)}
                    {Array.isArray(bookData) && bookData.length > 0 ? (
                        bookData.map((book) => (
                            <tr key={book.id} className="border">
                                <td className="border py-2 px-4">{book.id}</td>
                                <td className="border py-2 px-4">{book.name}</td>
                                <td className="border py-2 px-4">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                        onClick={(e) => handleDownload(e, book.id)}
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))

                    ) : (
                        <tr>
                            <td colSpan="3" className="border py-4 text-center">
                                No book data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookTable;
