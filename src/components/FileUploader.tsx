import React, {useState} from 'react';
import {arweave} from '@/app/upload/config';

export function FileUploader({walletAddress}: {walletAddress: string | null}) {
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] ?? null;
		setFile(selectedFile);
		if (selectedFile) {
			console.log(`Selected file: ${selectedFile.name}, size: ${selectedFile.size}`);
		}
	};

	const uploadFile = async () => {
		if (!file || !walletAddress) return;

		try {
			const reader = new FileReader();
			reader.onloadend = async (event) => {
				const arrayBuffer = event.target?.result;
				if (arrayBuffer) {
					const transaction = await arweave.createTransaction({
						data: arrayBuffer,
					});
					const contentType = file.type || 'application/octet-stream'; // Default to 'application/octet-stream' if the type is not detected
					const createdDate = new Date().toISOString();

					transaction.addTag('Content-Type', contentType);
					transaction.addTag('App-Id', 'cloakseal');
					transaction.addTag('File-Name', file.name);


					await arweave.transactions.sign(transaction);
					const response = await arweave.transactions.post(transaction);

					if (response.status === 200) {
						console.log('File uploaded successfully!', response);
					} else {
						console.error('File upload failed:', response.statusText);
					}
				}
			};
			reader.readAsArrayBuffer(file);
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	};

	return (
		<div className="flex items-center justify-center bg-gray-100">
			<div className="max-w-lg w-full space-y-8 p-10 bg-white shadow rounded-xl">
				<div className="text-center">
					<svg
						className="mx-auto h-12 w-12 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							vectorEffect="non-scaling-stroke"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
						/>
					</svg>
					<h2 className="mt-6 text-3xl font-semibold text-gray-900">Upload your files</h2>
					<p className="mt-2 text-sm text-gray-600">
						Connect your wallet and upload files securely
					</p>
				</div>
				<div className="mt-8 space-y-6">
					<input
						type="file"
						onChange={handleFileChange}
						className="cursor-pointer block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-opacity-80"
					/>
					<button
						onClick={uploadFile}
						className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
					>
						Upload
					</button>
				</div>
			</div>
		</div>
	);
};
