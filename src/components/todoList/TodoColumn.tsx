import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { TodoItem } from '@/App'


export const columns: ColumnDef<TodoItem>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				className='block w-4'
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => {
					table.toggleAllPageRowsSelected(!!value);
					table.getRowModel().rows.map(row => {
						row.original.checked = !!value
					})

					
				}}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				className='block w-4 h-4 p-10px'
				checked={row.getIsSelected()}
				onCheckedChange={(value) => {
					row.toggleSelected(!!value);
					row.original.checked = !!value;
				}}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'text',
		header: 'What needs to be done?',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('text')}</div>
		),
	},
]
