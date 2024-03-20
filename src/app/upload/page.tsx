'use client'

import {useEffect, useState} from 'react';
import {Container} from '@/components/Container';
import FileCard from '@/components/FileCard';
import {FadeIn} from '@/components/FadeIn';
import {FileUploader} from '@/components/FileUploader';
import {Dialog} from '@/components/Dialog';
import {File} from '@/types';
import {SearchFilters, SearchFiltersProps, SortOrder} from '@/app/upload/SearchFilters';
import {fetchTransactionsForWallet} from '@/app/upload/FileReader';
import {arweave} from '@/app/upload/config';
import {subMonths} from 'date-fns';

export default function UploadPage() {
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('latest');
    const [statusFilter, setStatusFilter] = useState('');

    const [dateRange, setDateRange] = useState<{startDate: string | undefined, endDate: string | undefined}>({startDate: undefined, endDate: undefined});



    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);


    useEffect(() => {
        const connectWallet = async () => {
            await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'DISPATCH', 'SIGN_TRANSACTION', 'ENCRYPT']);
            const address = await arweave.wallets.getAddress('use_wallet');
            setWalletAddress(address);
            console.log('Loaded AR address:', address);
        };

        if (!walletAddress) {
            connectWallet().catch(console.error);
        }
    }, [walletAddress]);

    const openUploader = () => setIsUploaderOpen(true);
    const closeUploader = () => setIsUploaderOpen(false);


    const handleSearchChange: SearchFiltersProps['onSearchChange'] = (value) => {
        setSearchTerm(value);
    };

    const handleSortChange: SearchFiltersProps['onSortChange'] = (value) => {
        setSortOrder(value);
    };

    const handleDateRangeChange: SearchFiltersProps['onDateRangeChange'] = (startDate, endDate) => {
        setDateRange({startDate, endDate})
    };

    const handleStatusFilterChange: SearchFiltersProps['onStatusFilterChange'] = (value) => {
        setStatusFilter(value);
    };


    useEffect(() => {
        console.log('Fetching files...')
        const fetchFiles = async () => {
            let fetchedFiles = (await fetchTransactionsForWallet(walletAddress, 'cloakseal') || [])
                .filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter((file) => !statusFilter || file.status === statusFilter)
                .filter((file) => (!dateRange.startDate || new Date(file.createdDate) >= new Date(dateRange.startDate))
                    && (!dateRange.endDate || new Date(file.createdDate) <= new Date(dateRange.endDate)))
                .sort((a, b) => {
                    if (sortOrder === SortOrder.Latest) {
                        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
                    } else if (sortOrder === SortOrder.Oldest) {
                        return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
                    }
                    return 0;
                });

            setFiles(fetchedFiles)
        };

        if (walletAddress) {
            fetchFiles().catch(console.error);
        }

    }, [dateRange, searchTerm, sortOrder, statusFilter]);


    return (
        <>
            <FadeIn className="w-full">
                <Container className="mt-8 sm:mt-10 lg:mt-12">
                    <div className="flex justify-end w-full">
                        <button
                            onClick={openUploader}
                            className="px-4 py-2 bg-black text-white font-semibold rounded-full hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                        >
                            New
                        </button>
                    </div>
                </Container>
            </FadeIn>
            <FadeIn className="w-full">
                <Container className="mt-8 sm:mt-10 lg:mt-12">
                    <SearchFilters
                        onSearchChange={handleSearchChange}
                        onSortChange={handleSortChange}
                        onStatusFilterChange={handleStatusFilterChange}
                        onDateRangeChange={handleDateRangeChange}
                    />
                </Container>
            </FadeIn>


            <FadeIn className="w-full">
                <Container className="mt-8 sm:mt-10 lg:mt-12">


                    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                        {files.map((client) => (

                            <li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">
                                <FileCard client={client} />
                            </li>

                        ))}
                    </ul>

                </Container>
            </FadeIn>

            <Dialog isOpen={isUploaderOpen} onClose={closeUploader}>
                <FileUploader walletAddress={walletAddress} />
            </Dialog>
        </>
    );
}
