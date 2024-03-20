import {StaticImageData} from 'next/image';

export interface File {
	id: string;
	name: string;
	fileType: string;
	createdDate: string;
	status: 'SENT' | 'SIGNED' | 'SIGN_PENDING';
}

