import {StaticImageData} from 'next/image';

export interface Client {
	id: number;
	name: string;
	imageUrl: string | StaticImageData;
	createdDate: string;
	status: 'SENT' | 'SIGNED' | 'SIGN_PENDING';
}
