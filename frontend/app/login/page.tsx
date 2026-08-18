'use client';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from '@tanstack/react-form';
import LoginRequest from '@/features/authentication/types/LoginRequest';
import useLogin from '@/features/authentication/hooks/use-login';
import { useRouter } from 'next/navigation';

export default function Page() {
	const requestLogin = useLogin();
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		validators: {
			onSubmit: LoginRequest,
		},
		onSubmit: async (values) => {
			const resp = await requestLogin.mutateAsync(values.value);
			if (resp.success) {
				router.push('/dashboard');
			}
		}
	});

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Login to your account</CardTitle>
							<CardDescription>
								Enter your email below to login to your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									form.handleSubmit();
								}}
							>
								<FieldGroup>
									<form.Field
										name="email"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Email</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														value={field.state.value}
														type="email"
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder="demo@demo.com"
														required
													/>
												</Field>
											);
										}}
									/>
									<form.Field
										name="password"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Password</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														type="password"
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder="••••••••"
														required
													/>
												</Field>
											);
										}}
									/>
									<Field>
										<Button type="submit">Login</Button>
									</Field>
								</FieldGroup>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
