'use client'

import {useState} from 'react';
import {Container} from '@/components/Container';
import FileCard from '@/components/FileCard';
import {FadeIn} from '@/components/FadeIn';
import {FileUploader} from '@/components/FileUploader';
import {Dialog} from '@/components/Dialog';
import {Button} from '@/components/Button';
import imageTxt from '@/images/files/211656_text_document_icon.png';
import imagePdf from '@/images/files/9055322_bxs_file_pdf_icon.png';
import imageDoc from '@/images/files/8541993_file_word_icon.png';
import {File} from '@/types';

export default function UploadPage() {
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('name'); // Default sort by name
    const [cardItems, setCardItems] = useState([]); // Assuming cardItems is an array of objects


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
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSortChange = (event) => {
        setSortKey(event.target.value);
    };

    const filteredAndSortedCardItems = files
        .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a: File, b: File) => {
            if (sortKey === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortKey === 'createdDate') {
                return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
            } else if (sortKey === 'status') {
                return a.status.localeCompare(b.status);
            }
            return 0;
        });



    return (
        <>
            <Container className="flex flex-col items-center justify-center bg-transparent py-0 px-7">
                <div className="flex space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="input"
                    />
                    <select value={sortKey} onChange={handleSortChange} className="select">
                        <option value="name">Name</option>
                        <option value="createdDate">Date Created</option>
                        <option value="status">Status</option>
                    </select>
                    <Button onClick={openUploader} className="btn-new">New</Button>
                </div>
            </Container>

            <FadeIn className="w-full">
                <Container className="mt-8 sm:mt-10 lg:mt-12">


                    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                        {filteredAndSortedCardItems.map((client) => (

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
