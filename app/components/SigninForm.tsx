// app/components/SignInForm.tsx
import Link from "next/link";
import { FormEvent } from 'react';

interface SignInFormProps {
    signInWithEmail: ({
        emailAddress,
        password,
    }: {
        emailAddress: string;
        password: string;
    }) => void;
    clerkError: string;
}

const SigninForm = ({ signInWithEmail, clerkError }: SignInFormProps) => {
    return (
        <div className="flex items-center justify-center h-full bg-gradient-to-b from-violet-100 to-violet-300">
            <div className="h-auto bg-white rounded-l shadow-lg w-96 md:w-112">
                <div className="p-6 md:p-8">
                    <h1 className="mb-6 text-3xl font-semi-bold text-black">
                        Welcome to <span className="text-purple-700">Workflow</span>!
                    </h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const target = e.target as typeof e.target & {
                                email: { value: string };
                                password: { value: string };
                            };
                            const email = target.email.value;
                            const password = target.password.value;
                            signInWithEmail({ emailAddress: email, password: password });
                        }}
                    >
                        <input
                            name="email"
                            className="block w-full p-3 mb-3 text-sm font-light text-black bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            placeholder="Your email"
                            type="email"
                            required
                        />
                        <input
                            name="password"
                            className="block w-full p-3 mb-3 text-sm font-light text-black bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            placeholder="Password"
                            type="password"
                            required
                        />
                        <h2 className="text-red-500 mb-8">
                            {clerkError && <p>{clerkError}</p>}
                        </h2>
                        <button
                            className="w-full h-12 mb-6 text-sm font-light text-white bg-purple-700 hover:bg-purple-800 rounded-xl"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-sm font-light text-center text-black">
                        Dont have an account?
                        <Link className="ml-2 text-purple-700" href="/signup">
                            new account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SigninForm;
