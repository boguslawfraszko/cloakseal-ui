import React, { useState, useEffect } from 'react';
import { Container } from '@/components/Container';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';

export function SearchFilters({ onSearchChange, onSortChange, onStatusFilterChange, onDateRangeChange }) {
	const [filtersApplied, setFiltersApplied] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState('latest');
	const [statusFilter, setStatusFilter] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	useEffect(() => {
		const count = [searchTerm, sortOrder !== 'latest', statusFilter, startDate, endDate].filter(Boolean).length;
		setFiltersApplied(count);
	}, [searchTerm, sortOrder, statusFilter, startDate, endDate]);

	const handleClearAll = () => {
		setSearchTerm('');
		setSortOrder('latest');
		setStatusFilter('');
		setStartDate('');
		setEndDate('');
		onSearchChange('');
		onSortChange('latest');
		onStatusFilterChange('');
		onDateRangeChange('', '');
	};

	return (
		<Disclosure as="div" className="bg-white">
			{({ open }) => (
				<>
					<div className="border-b border-t border-gray-200 px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
						<div className="flex items-center">
							<Disclosure.Button className="group flex items-center text-gray-700">
								<FunnelIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
								<span>{filtersApplied} Filters</span>
								<ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} ml-2 h-5 w-5 text-gray-400`} aria-hidden="true" />
							</Disclosure.Button>
							<button type="button" className="ml-4 text-gray-700" onClick={handleClearAll}>
								Clear all
							</button>
						</div>
						<select
							value={sortOrder}
							onChange={(e) => {
								setSortOrder(e.target.value);
								onSortChange(e.target.value);
							}}
							className="form-select px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
						>
							<option value="latest">Latest</option>
							<option value="oldest">Oldest</option>
						</select>
					</div>
					<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
						<Container className="flex flex-col items-center justify-center bg-transparent">
							<div className="flex flex-wrap gap-4 mb-4">
								<input
									type="text"
									placeholder="Search..."
									value={searchTerm}
									onChange={(e) => {
										setSearchTerm(e.target.value);
										onSearchChange(e.target.value);
									}}
									className="form-input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
								/>
								<select
									value={statusFilter}
									onChange={(e) => {
										setStatusFilter(e.target.value);
										onStatusFilterChange(e.target.value);
									}}
									className="form-select px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
								>
									<option value="">All Statuses</option>
									<option value="SENT">SENT</option>
									<option value="SIGNED">SIGNED</option>
									<option value="SIGN_PENDING">SIGN_PENDING</option>
								</select>
								<input
									type="date"
									value={startDate}
									onChange={(e) => {
										setStartDate(e.target.value);
										onDateRangeChange(e.target.value, endDate);
									}}
									className="form-input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
									placeholder="Start Date"
								/>
								<input
									type="date"
									value={endDate}
									onChange={(e) => {
										setEndDate(e.target.value);
										onDateRangeChange(startDate, e.target.value);
									}}
									className="form-input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
									placeholder="End Date"
								/>
							</div>
						</Container>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
