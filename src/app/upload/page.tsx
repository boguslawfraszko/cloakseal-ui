'use client'

import { useState } from 'react';
import { Container } from '@/components/Container';
import FileCard from '@/components/FileCard';
import { FadeIn } from '@/components/FadeIn';
import { FileUploader } from '@/components/FileUploader';
// Assuming Dialog is a component you have or from a UI library you're using
import {Dialog} from '@/components/Dialog';

export default function Contact() {
    // State to manage dialog visibility
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);

    // Function to open the dialog
    const openUploader = () => setIsUploaderOpen(true);

    // Function to close the dialog
    const closeUploader = () => setIsUploaderOpen(false);

    return (
        <>
            <Container className="flex flex-col items-center justify-center bg-transparent py-0 px-7">
                {/* Button to trigger the dialog */}
                <button onClick={openUploader} className="btn-new">New</button>
            </Container>

            <FadeIn className="w-full">
                <Container className="mt-8 sm:mt-10 lg:mt-12">
                    <FileCard />
                </Container>
            </FadeIn>

            {/* Dialog wrapping the FileUploader */}
            <Dialog isOpen={isUploaderOpen} onClose={closeUploader}>
                <FileUploader />
                {/* You can also add a close button inside the Dialog if needed */}
            </Dialog>
        </>
    );
}
