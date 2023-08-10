import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@components/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@components/form';
import { Button } from '@components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/card';
import { getKeys } from '@/lib/utils';
import useAuth from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Invalid Email'),
  password: z.string().min(6, 'Password minimum of length 6'),
  rememberMe: z.boolean()
});

const Login = () => {
  const { login } = useAuth();
  const form = useForm<z.infer<typeof loginSchema>>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true
    }
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    if (getKeys(form.formState.errors).length) {
      setTimeout(() => form.clearErrors(['email', 'password']), 3000);
      return;
    }

    login(values);
  };

  return (
    <Card className="w-full lg:w-3/4 2xl:w-1/2">
      <CardHeader>
        <CardTitle>Sigmoid Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
							control={form.control}
							name="rememberMe"
							render={({ field }) => (
								<FormItem className="flex items-center gap-2">
									<FormControl>
										<Checkbox id="rememberMe" checked={field.value} onChange={field.onChange} />
									</FormControl>
									<FormLabel className={cn("my-0")} htmlFor="rememberMe">Remember me</FormLabel>
								</FormItem>
							)}
						/> */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
