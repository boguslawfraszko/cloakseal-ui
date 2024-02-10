import React, {useEffect, useState} from "react";
import Arweave from "arweave";

const FileUploader = () => {
	const [file, setFile] = useState<Blob>();
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const arweave = new Arweave({
		host: "ar-io.net",
		port: 443,
		protocol: "https"
	})

	useEffect(() => {
		window.arweaveWallet
			.connect(["ACCESS_ADDRESS", 'DISPATCH', 'SIGN_TRANSACTION', 'ENCRYPT' ])
			.then(() => {
				arweave?.wallets
					.getAddress("use_wallet") // Use the first wallet from ArConnect
					.then((address: string) => {
						setWalletAddress(address);
						console.log("Loaded AR address : ", address)
					})
			})
	}, [walletAddress]);

	const handleFileChange = (event: any) => {
		let file: File = event.target.files[0];
		console.log("selected file " + file.name + " size " + file.size);
		setFile(file);
	};

	const encrypt = async (arrayBuffer: string | ArrayBuffer)=> {
		let decodedString = ""
		if (arrayBuffer instanceof ArrayBuffer) {
			const decoder = new TextDecoder('utf-8');
			decodedString = decoder.decode(new Uint8Array(arrayBuffer));
		} else {
			decodedString = arrayBuffer;
		}

		const encryptedData = await window.arweaveWallet.encrypt(
			decodedString,
			{algorithm: "RSA-OAEP", hash: "SHA-256"}
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
		<>
			{walletAddress === null && (
				<section id="key" >
					<div >
						<p >
							Please install ArConnect and open your wallet.
						</p>
					</div>
				</section>
			)}
			{walletAddress !== null && (
				<section id="upload" >
					<div >
						<p >
							Upload your files here
						</p>
						<input type="file" onChange={handleFileChange} className="my-4" />
						<button
							onClick={uploadFile}
							className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
						>
							Upload
						</button>
					</div>
				</section>
			)}
		</>
	);
};

export default FileUploader;
