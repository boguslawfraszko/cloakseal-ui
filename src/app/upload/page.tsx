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
import {SearchFilters, SearchFiltersProps} from '@/app/upload/SearchFilters';

export default function UploadPage() {
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('latest');
    const [statusFilter, setStatusFilter] = useState('');

    const [dateRange, setDateRange] = useState<{startDate: string | undefined, endDate: string | undefined}>({startDate: undefined, endDate: undefined});

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


    const handleSearchChange: SearchFiltersProps['onSearchChange'] = (value) => {
        setSearchTerm(value);
    };

    const handleSortChange: SearchFiltersProps['onSortChange'] = (value) => {
        setSortOrder(value);
    };

    const handleDateRangeChange: SearchFiltersProps['onDateRangeChange'] = (startDate, endDate) => {
        setDateRange({startDate, endDate})
    };

    const handleStatusFilterChange: SearchFiltersProps['onStatusFilterChange'] = (value) => {
        setStatusFilter(value);
    };


    const filteredAndSortedFiles = files
        .filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((file) => !statusFilter || file.status === statusFilter)
        .filter((file) => (!dateRange.startDate || new Date(file.createdDate) >= new Date(dateRange.startDate))
            && (!dateRange.endDate || new Date(file.createdDate) <= new Date(dateRange.endDate)))
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
            <Container>
                <button
                    onClick={openUploader} // Ensure you define the `openUploader` function in your component
                    className="px-4 py-2 bg-black text-white font-semibold rounded-full hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                >
                    New
                </button>
            </Container>
            <FadeIn className="w-full">
                <Container className="mt-8 sm:mt-10 lg:mt-12">
                    <SearchFilters
                        onSearchChange={handleSearchChange}
                        onSortChange={handleSortChange}
                        onStatusFilterChange={handleStatusFilterChange}
                        onDateRangeChange={handleDateRangeChange}
                    />
                </Container>
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
