'use client'

import { useState } from 'react'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
	TableCell
} from '@/components/ui/table'
import { TodoItem } from '@/App'
import { columns } from './TodoColumn'
import { TodoButtons } from './TodoButtons'


export function TodoList(
	{
		todos,
		setTodos
	} : {
		todos: TodoItem[],
		setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>
	}
) {
	const [rowSelection, setRowSelection] = useState({});
	const [visibility, setVisibility] = useState('all');

	const table = useReactTable({
		data: todos,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			rowSelection,
		},
	});

	return (
		<div className='w-full py-6'>
			<div className='rounded-md border'>
				<Table className='flex flex-col'>
					<TableHeader className='block w-full'>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className='w-full' key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											className={header.id === 'text' ? 'w-full' : ''}
											key={header.id}
										>
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

					<TableBody className='flex flex-col w-full'>
						{
							visibility === 'active' && table.getRowModel().rows.map((row) => { if (!row.original.checked) return row }).length - table.getSelectedRowModel().rows.length ? (
								table.getRowModel().rows.map((row) => {
									if (!row.original.checked) {
										return (
											<TableRow
												key={row.id}
												data-state={row.getIsSelected()}
											>
												{row.getAllCells().map((cell) => (
													<TableCell
														className={'w-full h-full whitespace-pre-line break-words' + cell.id === ' 0_text' ? ' w-full' : ''}
														key={cell.id}>
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
							) : visibility === 'complited' && table.getSelectedRowModel().rows.length ? (
								table.getRowModel().rows.map((row) => {
									if (row.original.checked) {
										return (
											<TableRow
												key={row.id}
												data-state={row.getIsSelected()}
											>
												{row.getAllCells().map((cell) => (
													<TableCell
														className={'w-full h-full whitespace-pre-line break-words' + cell.id === ' 0_text' ? ' w-full' : ''}
														key={cell.id}>
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
							) : visibility === 'all' && table.getRowModel().rows.length ? (
								table.getRowModel().rows.map((row) => {
									return (
										<TableRow
												key={row.id}
												data-state={row.getIsSelected()}
											>
												{row.getAllCells().map((cell) => (
													<TableCell
														className={'w-full h-full whitespace-pre-line break-words' + cell.id === ' 0_text' ? ' w-full' : ''}
														key={cell.id}>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext()
														)}
													</TableCell>
												))}
											</TableRow>
									)
								})
							) : (
								<TableRow>
									<TableCell colSpan={columns.length}>
										You ghot no todos here.
									</TableCell>
								</TableRow>
							)
						}
					</TableBody>
				</Table>
			</div>

			<TodoButtons
				table={table}
				visibility={visibility}
				setVisibility={setVisibility}
				setTodos={setTodos}
				setRowSelection={setRowSelection}
			/>
		</div>
	)
}
