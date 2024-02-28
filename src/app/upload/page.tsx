'use client'

import {useState} from 'react';
import {Container} from '@/components/Container';
import FileCard from '@/components/FileCard';
import {FadeIn} from '@/components/FadeIn';
import {FileUploader} from '@/components/FileUploader';
import {Dialog} from '@/components/Dialog';
import imageTxt from '@/images/files/211656_text_document_icon.png';
import imagePdf from '@/images/files/9055322_bxs_file_pdf_icon.png';
import imageDoc from '@/images/files/8541993_file_word_icon.png';
import {File} from '@/types';
import {SearchFilters} from '@/app/upload/SearchFilters';

export default function UploadPage() {
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('latest');
    const [statusFilter, setStatusFilter] = useState('');

    const files: File[] = [
        {
            id: 1,
            name: 'myDocument.txt',
            imageUrl: imageTxt,
            createdDate: '2023-01-22',
            status: 'SIGN_PENDING',
        },
        {
            id: 2,
            name: 'contract.pdf',
            imageUrl: imagePdf,
            createdDate: '2023-01-22',
            status: 'SIGNED'
        },
        {
            id: 3,
            name: 'invoice.docx',
            imageUrl: imageDoc,
            createdDate: '2023-01-22',
            status: 'SENT'
        },
    ]

    const openUploader = () => setIsUploaderOpen(true);
    const closeUploader = () => setIsUploaderOpen(false);


    const handleSearchChange = (value) => {
        setSearchTerm(value);
        // You can also directly call the function to filter the files here if you want real-time search
    };

    const handleSortChange = (value) => {
        setSortOrder(value);
        // Implement sorting logic here or wherever you're managing the list of files
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
        // Implement status filtering logic here or wherever you're managing the list of files
    };


    const filteredAndSortedFiles = files
        .filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((file) => !statusFilter || file.status === statusFilter)
        // Implement date range filtering here if needed
        .sort((a, b) => {
            if (sortOrder === 'latest') {
                return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
            } else if (sortOrder === 'oldest') {
                return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
            }
            return 0;
        });




    return (
        <>
            <FadeIn className="w-full">
                <SearchFilters
                    onSearchChange={handleSearchChange}
                    onSortChange={handleSortChange}
                    onStatusFilterChange={handleStatusFilterChange} onDateRangeChange={undefined}                // Pass the date range change handler if implemented
                    // onDateRangeChange={handleDateRangeChange}
                />
                </FadeIn>


            <FadeIn className="w-full">
                <Container className="mt-8 sm:mt-10 lg:mt-12">


                    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                        {filteredAndSortedFiles.map((client) => (

                            <li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">
                                <FileCard client={client} />
                            </li>

                        ))}
                    </ul>

                </Container>
            </FadeIn>

            <Dialog isOpen={isUploaderOpen} onClose={closeUploader}>
                <FileUploader />
            </Dialog>
        </>
    );
}
