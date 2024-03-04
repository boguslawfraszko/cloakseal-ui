'use client'


import React, {Fragment, useEffect, useState} from 'react';
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon, FunnelIcon} from '@heroicons/react/20/solid';

export interface SearchFiltersProps {
	onSearchChange: (searchTerm: string) => void;
	onSortChange: (sortOption: string) => void;
	onStatusFilterChange: (status: string) => void;
	onDateRangeChange: (startDate: string, endDate: string) => void;
}

export enum SortOrder {
	Latest = 'latest',
	Oldest = 'oldest'
}

export function SearchFilters({ onSearchChange, onSortChange, onStatusFilterChange, onDateRangeChange }: SearchFiltersProps) {
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

	const statusOptions = [
		{ value: "", label: "All Statuses" },
		{ value: "SENT", label: "SENT" },
		{ value: "SIGNED", label: "SIGNED" },
		{ value: "SIGN_PENDING", label: "SIGN PENDING" }
	];


	return (
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
								className="mx-auto grid max-w-7xl grid-cols-1 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
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
											{statusOptions.map((option, optionIdx) => (
												<div key={option.value}
												     className="flex items-center text-base sm:text-sm">
													<input
														id={`status-${optionIdx}`}
														name="status[]"
														value={option.value}
														type="radio"
														className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														checked={statusFilter === option.value}
														onChange={(e) => {
															setStatusFilter(e.target.value);
															onStatusFilterChange(e.target.value);
														}}
													/>
													<label htmlFor={`status-${optionIdx}`}
													       className="ml-3 min-w-0 flex-1 text-gray-600">
														{option.label}
													</label>
												</div>
											))}
										</div>
									</fieldset>

									<fieldset>
										<legend className="block font-medium">Created</legend>
										<div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
											<label htmlFor="startDate"
											       className="block text-sm font-medium text-gray-700">from:</label>
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
											<label htmlFor="startDate"
											       className="block text-sm font-medium text-gray-700">to:</label>
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
						<div className="col-start-1 row-start-1 py-4">
							<div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
								<Menu as="div" className="relative inline-block">
									<div className="flex">
										<Menu.Button
											className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
											Sort
											<ChevronDownIcon
												className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
												aria-hidden="true"
											/>
										</Menu.Button>
									</div>

									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items
											className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
											<div className="py-1">
												<Menu.Item key="Latest">
													{({active}) => (
														<a
															href="Latest"
															onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
																e.preventDefault();
																setSortOrder(SortOrder.Latest);
																onSortChange(SortOrder.Latest);
															}}
														>
															Latest
														</a>
													)}
												</Menu.Item>
											</div>
											<div className="py-1">
												<Menu.Item key="Oldest">
													{({active}) => (
														<a
															href="Oldest"
															onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
																e.preventDefault();
																setSortOrder(SortOrder.Oldest);
																onSortChange(SortOrder.Oldest);
															}}
														>
															Oldest
														</a>
													)}
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>

					</>
				)}
			</Disclosure>
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
