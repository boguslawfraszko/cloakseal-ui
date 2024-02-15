'use client';

export function Dialog({ isOpen, onClose, children }) {
	if (!isOpen) return null;

	return (
		// Backdrop
		<div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
			{/* Dialog box */}
			<div className="bg-white rounded-lg shadow-xl m-4 sm:m-8">
				<div className="flex justify-between items-center border-b border-gray-200 p-4">
					<h5 className="text-lg font-medium text-gray-900">Upload File</h5>
					{/* Close button */}
					<button onClick={onClose} className="text-gray-400 hover:text-gray-500">
						<span className="sr-only">Close</span>
						{/* Assuming you're using Heroicons, for example */}
						<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				{/* Dialog content */}
				<div className="p-4">
					{children}
				</div>
			</div>
		</div>
	);
}
