import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './LoginForm.module.css';

type LoginFormValues = {
	username: string;
	password: string;
};

export const LoginForm = () => {
	const router = useRouter();
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		reset
	} = useForm<LoginFormValues>({
		mode: 'onBlur',
		defaultValues: { username: '', password: '' }
	});

	const onSubmit: SubmitHandler<LoginFormValues> = async values => {
		try {
			await login(values);

			reset({ password: '' });
			router.push('/');
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				const messageFromApi = (err.response?.data as any)?.message;
				const message =
					messageFromApi ??
					(err.response?.status === 400
						? 'Invalid login or password'
						: 'Authorization error. Please try again later.');

				setError('username', { type: 'server', message: '' });
				setError('password', { type: 'server', message: String(message) });
			} else {
				setError('password', {
					type: 'server',
					message: 'Unexpected error. Please try again later.'
				});
			}
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
			<label htmlFor='username'>Login</label>
			<input
				id='username'
				type='text'
				placeholder='Login'
				autoComplete='username'
				{...register('username', { required: 'Login required' })}
				aria-invalid={!!errors.username || undefined}
				aria-describedby={errors.username ? 'username-error' : undefined}
				className={styles.input}
			/>
			{errors.username && (
				<div id='username-error' className={styles.error}>
					{errors.username.message}
				</div>
			)}

			<label htmlFor='password'>Password</label>
			<input
				id='password'
				type='password'
				placeholder='Password'
				autoComplete='current-password'
				{...register('password', {
					required: 'Password required',
					minLength: {
						value: 6,
						message: 'The password must be at least 6 characters long.'
					}
				})}
				aria-invalid={!!errors.password || undefined}
				aria-describedby={errors.password ? 'password-error' : undefined}
				className={styles.input}
			/>
			{errors.password && (
				<div id='password-error' className={styles.error}>
					{errors.password.message}
				</div>
			)}

			<button
				type='submit'
				className={styles.btn}
				disabled={isSubmitting}
				aria-busy={isSubmitting}
			>
				{isSubmitting ? 'Logging in…' : 'Login'}
			</button>
		</form>
	);
};
