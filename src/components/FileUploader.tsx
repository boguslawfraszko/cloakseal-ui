import React, { useEffect, useState } from "react";
import Arweave from "arweave";

function TextInput({
	                   label,
	                   type = "text",
	                   ...props
                   }: React.ComponentPropsWithoutRef<'input'> & { label: string, type?: string }) {
	let id = React.useId();

	return (
		<div className="group relative z-0 transition-all focus-within:z-10 my-4">
			<input
				type={type}
				id={id}
				{...props}
				placeholder=" "
				className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
			/>
			<label
				htmlFor={id}
				className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-placeholder-shown:-translate-y-4 peer-placeholder-shown:scale-75 peer-placeholder-shown:font-semibold peer-placeholder-shown:text-neutral-950"
			>
				{label}
			</label>
		</div>
	);
}

export function FileUploader() {
	const [file, setFile] = useState<Blob>();
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const arweave = new Arweave({
		host: "ar-io.net",
		port: 443,
		protocol: "https"
	});

	useEffect(() => {
		window.arweaveWallet
			.connect(["ACCESS_ADDRESS", 'DISPATCH', 'SIGN_TRANSACTION', 'ENCRYPT'])
			.then(() => {
				arweave?.wallets
					.getAddress("use_wallet") // Use the first wallet from ArConnect
					.then((address: string) => {
						setWalletAddress(address);
						console.log("Loaded AR address : ", address)
					})
			})
	}, [walletAddress]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let file = event.target.files?.[0];
		if (file) {
			console.log("selected file " + file.name + " size " + file.size);
			setFile(file);
		}
	};

	const encrypt = async (arrayBuffer: string | ArrayBuffer) => {
		let decodedString = ""
		if (arrayBuffer instanceof ArrayBuffer) {
			const decoder = new TextDecoder('utf-8');
			decodedString = decoder.decode(new Uint8Array(arrayBuffer));
		} else {
			decodedString = arrayBuffer;
		}

		const encryptedData = await window.arweaveWallet.encrypt(
			decodedString,
			{ algorithm: "RSA-OAEP", hash: "SHA-256" }
		);
		return encryptedData;
	}

	const uploadFile = async () => {
		try {
			if (file && walletAddress) {
				const reader = new FileReader();
				reader.onload = async (e) => {
					const arrayBuffer = e.target?.result;
					if (arrayBuffer) {
						const encryptedData = await encrypt(arrayBuffer);

						const transaction = await arweave.createTransaction(
							{ data: encryptedData },
							undefined // No need to specify a key as ArConnect handles it
						);
						await arweave.transactions.sign(transaction);
						const uploader = await arweave.transactions.getUploader(transaction);

						while (!uploader.isComplete) {
							await uploader.uploadChunk();
						}

						const response = await arweave.transactions.post(transaction);

						if (response.status === 200) {
							console.log("File uploaded successfully!", response);
						} else {
							console.error("File upload failed : " + response.statusText);
						}
					}
				};
				reader.readAsArrayBuffer(file);
			}
		} catch (error) {
			console.error("Error uploading file: ", error);
		}
	};

	return (
		<div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50 p-6">
			{walletAddress === null ? (
				<div className="text-center">
					<p className="text-base/6 text-neutral-500">
						Please install ArConnect and open your wallet.
					</p>
				</div>
			) : (
				<>
					<h2 className="font-display text-base font-semibold text-neutral-950">
						Upload your files
					</h2>
					<TextInput label="Select File" type="file" onChange={handleFileChange} />
					<button
						onClick={uploadFile}
						className="mt-4 px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
					>
						Upload
					</button>
				</>
			)}
		</div>
	);
}
