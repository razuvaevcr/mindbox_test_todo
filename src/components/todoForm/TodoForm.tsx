'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TodoItem } from '../../App'

const formSchema = z.object({
	text: z.string().min(2, {
		message: 'Todos must have at least 2 characters.',
	}),
})

export function TodoForm({
	addTodo
}: {
	addTodo: (todo: TodoItem) => void
}) {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			text: '',
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		addTodo(values);
	}

	useEffect(() => {
		form.reset({ text: '' })
	}, [form, form.formState.isSubmitSuccessful])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex justify-between'>
				<FormField
					control={form.control}
					name='text'
					render={({ field }) => (
						<FormItem className='w-9/12'>
							<FormControl>
								<Input placeholder='Your todo item' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='m-0 w-1/6'>Submit</Button>
			</form>
		</Form>
	)
}
