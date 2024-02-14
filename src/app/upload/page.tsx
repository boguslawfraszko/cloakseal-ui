'use client'

import {FileUploader} from '@/components/FileUploader'
import {FadeIn} from '@/components/FadeIn';
import {Container} from '@/components/Container';
import FileCard from '@/components/FileCard';

export default function Contact() {
  return (
    <>
        <Container className="mt-24 sm:mt-32 lg:mt-40">
            <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
                <FileUploader/>
            </div>
        </Container>
        <FadeIn className="lg:order-last">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
            <FileCard/>.
        </div>
      </FadeIn>
    </>
  )
}
