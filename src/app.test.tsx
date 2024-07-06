import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Todo App', () => {
	it('Проверка отображения начальных задач', () => {
		render(<App />);

		expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
		expect(screen.getByText('Прекрасный код')).toBeInTheDocument();
		expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
	});

	it('Проверка отображения новай задачи', async () => {
		render(<App />);

		const input = screen.getByPlaceholderText('Your todo item');
		const button = screen.getByRole('button', { name: /submit/i });

		await userEvent.type(input, 'Новая задача');
		await userEvent.click(button);

		expect(screen.getByText('Новая задача')).toBeInTheDocument();
	});

	it('проверка отображения и удаления выполненой задачи', async () => {
		render(<App />);

		const firstTodoCheckbox = screen.getAllByRole('checkbox')[1];
		await userEvent.click(firstTodoCheckbox);

		expect(screen.getByText('1 of 3 todo(s) completed.')).toBeInTheDocument();

		const completedButton = screen.getByRole('button', { name: 'Complited' });
		await userEvent.click(completedButton);

		expect(screen.queryByText('Тестовое задание')).toBeInTheDocument();
		expect(screen.queryByText('Прекрасный код')).not.toBeInTheDocument();
		expect(screen.queryByText('Покрытие тестами')).not.toBeInTheDocument();

		const clearCompletedButton = screen.getByRole('button', { name: /cleare complited/i });
		const allButton = screen.getByRole('button', { name: /all/i });
		await userEvent.click(allButton);
		await userEvent.click(clearCompletedButton);

		expect(screen.queryByText('Тестовое задание')).not.toBeInTheDocument();
		expect(screen.getByText('Прекрасный код')).toBeInTheDocument();
		expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
	});
});
