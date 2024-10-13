import { TodoItem } from '@/App';
import { Button } from '@/components/ui/button'
import { Table, RowSelectionState } from '@tanstack/react-table';

export function TodoButtons (
	{
		table,
		visibility,
		setVisibility,
		setTodos,
		setRowSelection
	} : {
		table: Table<TodoItem>,
		visibility: string,
		setVisibility: React.Dispatch<React.SetStateAction<string>>,
		setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>,
		setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>,
	}
) {
	return (
		<div className='flex m-0 items-center justify-between space-x-2 py-4'>
				<div className='w-1/6 text-sm text-muted-foreground'>
					{table.getSelectedRowModel().rows.length} of{' '}
					{table.getRowModel().rows.length} todo(s) completed.
				</div>

				<div className='flex m-0 w-1/4 items-center justify-between space-x-6'>
					<Button
						className='m-0 box-border flex'
						variant={visibility === 'all' ? 'outline' : 'ghost'}
						size='sm'
						onClick={() => setVisibility('all')}
					>
						All
					</Button>
					<Button
						className='m-0 box-border flex'
						variant={visibility === 'active' ? 'outline' : 'ghost'}
						size='sm'
						onClick={() => setVisibility('active')}
						disabled={table.getIsAllPageRowsSelected()}
					>
						Active
					</Button>
					<Button
						className='m-0 box-border flex'
						variant={visibility === 'complited' ? 'outline' : 'ghost'}
						size='sm'
						onClick={() => setVisibility('complited')}
						disabled={!table.getSelectedRowModel().rows.length}
					>
						Complited
					</Button>

				</div>
				<Button
					variant={table.getSelectedRowModel().rows.length ? 'outline' : 'destructive'}
					size='sm'
					onClick={() => {
						const arr: TodoItem[] = [];

						table.getRowModel().rows.forEach((row) => {
							if (!row.getIsSelected()) {
								arr.push(row.original)
							} else {
								setRowSelection({})
							}
						})

						setTodos(arr);
						setVisibility('all');
					}}
					disabled={!table.getSelectedRowModel().rows.length}
				>
					Cleare complited
				</Button>

			</div>
	)
}
