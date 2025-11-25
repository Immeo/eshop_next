import { API } from '@/helpers/api';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		mode: 'onBlur'
	});

	const onSubmit = async data => {
		try {
			const response = await axios.post(
				`${API}/login`,
				{ headers: { 'Content-Type': 'application/json' } },
				data
			);
			console.log(response.data);
			reset();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor='login'>Login</label>
			{/* login input */}
			<input
				type='text'
				placeholder='Login'
				{...register('username')}
				className={styles.input}
			/>
			{errors?.login && (
				<div className={styles.error}>{`${errors?.login?.message}`}</div>
			)}
			<label htmlFor='password'>Password</label>
			<input
				type='password'
				placeholder='Password'
				{...register('password', {
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'Password must be at least 6 characters'
					}
				})}
				className={styles.input}
			/>
			{errors?.password && (
				<div className={styles.error}>{`${errors?.password?.message}`}</div>
			)}
			<button type='submit' className={styles.btn}>
				Login
			</button>
		</form>
	);
};
