import {Query} from '@irys/query';
import {File} from '@/types';

export async function fetchTransactionsForWallet(
	walletAddress: string | null,
	appId: string | null
): Promise<File[] | null> {
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
		console.log(files);

		return files.map( file => {
			return {
				id: file.id,
				name: file.tags.find(tag => tag.name === 'File-Name')?.value || '',
				createdDate: file.tags.find(tag => tag.name === 'Created-Date')?.value || '',
				//createdDate: new Date(file.block.timestamp * 1000).toISOString() || '',
				fileType: file.tags.find(tag => tag.name === 'Content-Type')?.value || '',
				status: 'SENT',
			}
		})

	} catch (error) {
		console.error('Error fetching transactions:', error);
		return null;
	}
}
