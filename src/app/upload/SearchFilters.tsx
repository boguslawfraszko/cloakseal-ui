'use client'


import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import {Container} from '@/components/Container';

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
		<Container className="mt-8 sm:mt-10 lg:mt-12">
			<Disclosure
				as="section"
				aria-labelledby="filter-heading"
				className="grid items-center border-b border-t border-gray-200"
			>

				{({ open }) => (
					<>
						<div className="relative col-start-1 row-start-1 py-4">
							<div
								className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
								<div>
									<Disclosure.Button className="group flex items-center text-gray-700">
										<FunnelIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
										            aria-hidden="true"/>
										<span>{filtersApplied} Filters</span>
										<ChevronDownIcon
											className={`${open ? 'transform rotate-180' : ''} ml-2 h-5 w-5 text-gray-400`}
											aria-hidden="true"/>
									</Disclosure.Button>
								</div>
								<div className="pl-6">
									<button type="button" className="text-gray-500" onClick={handleClearAll}>
										Clear all
									</button>
								</div>
							</div>
						</div>
						<Disclosure.Panel className="border-t border-gray-200 py-10">
							<div
								className="mx-auto grid max-w-7xl grid-cols-1 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8" >
								<div className="grid auto-rows-min grid-cols-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
									<fieldset>
										<legend className="block font-medium">Name contains</legend>
										<div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
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
										</div>
									</fieldset>
									<fieldset>
										<legend className="block font-medium">Status</legend>
										<div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
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
										</div>
									</fieldset>

									<fieldset>
										<legend className="block font-medium">Created </legend>
										<div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
											<label htmlFor="startDate" className="block text-sm font-medium text-gray-700">from:</label>
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
											<label htmlFor="startDate" className="block text-sm font-medium text-gray-700">to:</label>
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
									</fieldset>


								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</Container>
	);
}


/**
 *
 * 							<select
 * 								value={sortOrder}
 * 								onChange={(e) => {
 * 									setSortOrder(e.target.value);
 * 									onSortChange(e.target.value);
 * 								}}
 * 								className="form-select px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
 * 							>
 * 								<option value="latest">Latest</option>
 * 								<option value="oldest">Oldest</option>
 * 							</select>
 */
