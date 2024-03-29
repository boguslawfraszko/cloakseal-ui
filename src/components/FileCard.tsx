import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {EllipsisHorizontalIcon} from '@heroicons/react/20/solid'
import Image from 'next/image'
import {File} from '@/types';


const statuses = {
	SENT: 'text-blue-700 bg-blue-50 ring-blue-600/20',
	SIGNED: 'text-green-700 bg-green-50 ring-green-600/20',
	SIGN_PENDING: 'text-yellow-700 bg-yellow-50 ring-yellow-600/20',
}

import imageTxt from '@/images/files/211656_text_document_icon.png';
import imagePdf from '@/images/files/9055322_bxs_file_pdf_icon.png';
import imageDoc from '@/images/files/8541993_file_word_icon.png';


const fileTypesIcons = new Map([
	['text/plain', imageTxt.src],
	['application/pdf', imagePdf.src],
	['docx', imageDoc.src],
	['image/jpeg', imageTxt.src]
])


function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ')
}

export default function FileCard({ client }: { client: File }) {
	return (
		<>
			<div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
				<Image
					src={fileTypesIcons.get(client.fileType) || imageTxt.src}
					alt={client.name}
					width={48}
					height={48}
					className="rounded-lg"
				/>
				<div className="text-sm font-medium leading-6 text-gray-900">{client.name}</div>
				<Menu as="div" className="relative ml-auto">
					<Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
						<span className="sr-only">Open options</span>
						<EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true"/>
					</Menu.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items
							className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
							<Menu.Item>
								{({active}) => (
									<a
										href="#"
										className={classNames(
											active ? 'bg-gray-50' : '',
											'block px-3 py-1 text-sm leading-6 text-gray-900'
										)}
									>
										View<span className="sr-only">, {client.name}</span>
									</a>
								)}
							</Menu.Item>
							<Menu.Item>
								{({active}) => (
									<a
										href="#"
										className={classNames(
											active ? 'bg-gray-50' : '',
											'block px-3 py-1 text-sm leading-6 text-gray-900'
										)}
									>
										Edit<span className="sr-only">, {client.name}</span>
									</a>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
			<dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
				<div className="flex justify-between gap-x-4 py-3">
					<dt className="text-gray-500">Created Date</dt>
					<dd className="text-gray-700">
						<time dateTime={client.createdDate}>{client.createdDate}</time>
					</dd>
				</div>
				<div className="flex justify-between gap-x-4 py-3">
					<dd className="flex items-start gap-x-2">
						<div
							className={classNames(
								statuses[client.status],
								'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
							)}
						>
							{client.status}
						</div>
					</dd>
				</div>
			</dl>
		</>

	)
}
