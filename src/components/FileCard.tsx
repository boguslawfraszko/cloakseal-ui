import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {EllipsisHorizontalIcon} from '@heroicons/react/20/solid'
import Image, {StaticImageData} from 'next/image'
import imagePdf from '@/images/files/9055322_bxs_file_pdf_icon.png'
import imageDoc from '@/images/files/8541993_file_word_icon.png'
import imageTxt from '@/images/files/211656_text_document_icon.png'


const statuses = {
	SENT: 'text-blue-700 bg-blue-50 ring-blue-600/20',
	SIGNED: 'text-green-700 bg-green-50 ring-green-600/20',
	SIGN_PENDING: 'text-yellow-700 bg-yellow-50 ring-yellow-600/20',
}
const clients: {id: number, name: string, imageUrl: string | StaticImageData, createdDate: string, status: 'SENT' | 'SIGNED' | 'SIGN_PENDING'}[] = [
	{
		id: 1,
		name: 'myDocument.txt',
		imageUrl: imageTxt,
		createdDate: '2023-01-22', status: 'SIGN_PENDING',
	},
	{
		id: 2,
		name: 'contract.pdf',
		imageUrl: imagePdf,
		createdDate: '2023-01-22', status: 'SIGNED'
	},
	{
		id: 3,
		name: 'invoice.docx',
		imageUrl: imageDoc,
		createdDate: '2023-01-22',
		status: 'SENT'
	},
]

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ')
}

export default function FileCard() {
	return (
		<ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
			{clients.map((client) => (
				<li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">
					<div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
						<Image
							src={client.imageUrl}
							alt={client.name}
							width={48}
							height={48}
							className="rounded-lg"
						/>
						<div className="text-sm font-medium leading-6 text-gray-900">{client.name}</div>
						<Menu as="div" className="relative ml-auto">
							<Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
								<span className="sr-only">Open options</span>
								<EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
								<Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
									<Menu.Item>
										{({ active }) => (
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
										{({ active }) => (
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
				</li>
			))}
		</ul>
	)
}
