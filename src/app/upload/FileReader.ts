import {Query} from '@irys/query'; // Assuming direct browser compatibility or a browser-friendly version

interface TransactionNode {
	id: string;
	fileName: string;
	createdDate: Date;
	contentType: string;
}

// Define the function parameters with types
export async function fetchTransactionsForWallet(
	walletAddress: string | null,
	startDate: Date,
	endDate: Date,
	appId: string | null,
	fileNamePart: string | null
): Promise<TransactionNode[] | null> {
	if (!walletAddress) {
		console.error('Wallet address is not available.');
		return null;
	}

	try {
		const files = await new Query({ url: "https://arweave.net/graphql" })
			.search("arweave:transactions")
			.from([walletAddress])
			.tags([
				{ name: "App-Id", values: [appId || ''] },
			]);

		let filesFiltered = files
			.filter(files => files.tags.find(tag => tag.name === 'File-Name' && tag.value.includes(fileNamePart || '')))
			.filter(files => new Date(files.block.timestamp * 1000) >= startDate)
			.filter(files => new Date(files.block.timestamp * 1000) <= endDate)
	    console.log(files, filesFiltered)

		return filesFiltered.map( file => {
			return {
				id: file.id,
				fileName: file.tags.find(tag => tag.name === 'File-Name')?.value || '',
				createdDate: new Date(file.block.timestamp * 1000),
				contentType: file.tags.find(tag => tag.name === 'Content-Type')?.value || '',
			}
		})

	} catch (error) {
		console.error('Error fetching transactions:', error);
		return null;
	}
}
