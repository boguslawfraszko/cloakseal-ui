import React, {useState} from 'react';
import {arweave} from '@/app/upload/config';

export function FileUploader({walletAddress, onUploadSuccess }: {walletAddress: string | null, onUploadSuccess: () => void}) {
	const [file, setFile] = useState<File | null>(null);
	const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] ?? null;
		setFile(selectedFile);
		if (selectedFile) {
			console.log(`Selected file: ${selectedFile.name}, size: ${selectedFile.size}`);
		}
	};

	const uploadFile = async () => {
		if (!file || !walletAddress) return;
		setUploadStatus('uploading');

		try {
			const reader = new FileReader();
			reader.onloadend = async (event) => {
				const arrayBuffer = event.target?.result;
				if (arrayBuffer) {
					const transaction = await arweave.createTransaction({
						data: arrayBuffer,
					});
					const contentType = file.type || 'application/octet-stream';
					const createdDate = new Date().toISOString();

					transaction.addTag('Content-Type', contentType);
					transaction.addTag('App-Id', 'cloakseal');
					transaction.addTag('File-Name', file.name);

					transaction.addTag('Created-Date', createdDate);


					await arweave.transactions.sign(transaction);
					const response = await arweave.transactions.post(transaction);

					if (response.status === 200) {
						console.log('File uploaded successfully!', response);
						onUploadSuccess();
						setUploadStatus('success');
					} else {
						console.error('File upload failed:', response.statusText);
						setUploadStatus('error');
						setErrorMessage(`Upload failed: ${response.statusText}`);
					}
				}
			};
			reader.readAsArrayBuffer(file);
		} catch (error) {
			console.error('Error uploading file:', error);
			setUploadStatus('error');
			setErrorMessage(`Error uploading file: ${error instanceof Error ? error.message : String(error)}`);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center bg-gray-100">
			{uploadStatus === 'error' && errorMessage && (
				<div className="text-red-500 text-sm mb-4 text-center">
					{errorMessage}
				</div>
			)}
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
