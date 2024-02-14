'use client'

import { FileUploader } from '@/components/FileUploader';
import { FadeIn } from '@/components/FadeIn';
import { Container } from '@/components/Container';
import FileCard from '@/components/FileCard';

export default function Contact() {
    return (
        <>
            <Container className="flex flex-col items-center justify-center bg-transparent py-0 px-7"> {/* Further reduced vertical padding */}
                <FileUploader />
            </Container>

            <FadeIn className="w-full">
                <Container className="mt-8 sm:mt-10 lg:mt-12"> {/* Reduced margin for smaller screens */}
                    <FileCard />
                </Container>
            </FadeIn>
        </>
    );
}
