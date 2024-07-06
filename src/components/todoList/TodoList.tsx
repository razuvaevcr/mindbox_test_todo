'use client'

import { useState } from 'react'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { TodoItem } from '@/App'
import { columns } from './TodoColumn'


export function TodoList(
	{
		todos,
		setTodos
	}: {
		todos: TodoItem[],
		setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>
	}
) {
	const [rowSelection, setRowSelection] = useState({})
	const [visibility, setVisibility] = useState('all')

	const table = useReactTable({
		data: todos,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			rowSelection,
		},
	})

	return (
		<div className='w-full py-6'>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => {
								if (visibility === 'active' && !row.getIsSelected()
									|| visibility === 'complited' && row.getIsSelected()
									|| visibility === 'all') {
									return (
										<TableRow
											className='flex-auto w-full'
											key={row.id}
											data-state={row.getIsSelected()}
										>
											{row.getAllCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</TableCell>
											))}
										</TableRow>
									)
								}
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-right'
								>
									You ghot no todos.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className='flex items-center justify-between space-x-2 py-4'>
				<div className='text-sm text-muted-foreground'>
					{table.getSelectedRowModel().rows.length} of{' '}
					{table.getRowModel().rows.length} todo(s) completed.
				</div>

				<div className='flex items-center justify-between space-x-6'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => setVisibility('all')}
					>
						All
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => setVisibility('active')}
						disabled={table.getIsAllPageRowsSelected()}
					>
						Active
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => setVisibility('complited')}
						disabled={!table.getSelectedRowModel().rows.length}
					>
						Complited
					</Button>

				</div>
				<Button
					variant='outline'
					size='sm'
					onClick={() => {
						const arr: TodoItem[] = [];

						table.getRowModel().rows.forEach((row) => {
							if (!row.getIsSelected()) {
								arr.push(row.original)
							} else {
								setRowSelection(false)
							}
						})

						setTodos(arr)
					}}
					disabled={!table.getSelectedRowModel().rows.length}
				>
					Cleare complited
				</Button>

			</div>
		</div>
	)
}
