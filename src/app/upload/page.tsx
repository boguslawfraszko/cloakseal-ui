'use client'

import {PageIntro} from '@/components/PageIntro'
import {FileUploader} from '@/components/FileUploader'
import {FadeIn} from '@/components/FadeIn';

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact us" title="Let’s work together">
        <p>We can’t wait to hear from you.</p>
      </PageIntro>


        <FadeIn className="lg:order-last">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
            <FileUploader/>
        </div>
      </FadeIn>
    </>
  )
}
