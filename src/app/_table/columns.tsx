'use client';

import { OrderProps } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<OrderProps>[] = [
	{
		accessorKey: 'createdAt',
		header: 'Booked On',
	},
	{
		accessorKey: 'user',
		header: 'Name',
	},
	{
		accessorKey: 'persons',
		header: 'Persons',
	},
	{
		accessorKey: 'rooms',
		header: 'Room Number',
	},
	{
		accessorKey: 'checkIn',
		header: 'Check In',
	},
	{
		accessorKey: 'checkOut',
		header: 'Check Out',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
];
