// app/components/SignupForm.tsx
import Link from "next/link";

interface SignUpFormProps {
    signUpWithEmail: ({ name, emailAddress, password }: { name: string, emailAddress: string, password: string }) => void;
    clerkError: string;
}

const SignupForm = ({ signUpWithEmail, clerkError }: SignUpFormProps) => {
    return (
        <div className="flex items-center justify-center h-full w-full bg-gradient-to-b from-violet-100 to-violet-300">
            <div className="h-auto bg-white rounded-l shadow-lg w-96 md:w-112">
                <div className="p-6 md:p-8">
                    <h1 className="mb-4 text-3xl font-semi-bold text-black">
                        Welcome to <span className="text-violet-700">Workflow</span>!
                    </h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const target = e.target as typeof e.target & {
                                name: { value: string };
                                email: { value: string };
                                password: { value: string };
                            };
                            const name = target.name.value;
                            const email = target.email.value;
                            const password = target.password.value;
                            signUpWithEmail({ name: name, emailAddress: email, password: password });
                        }}
                    >
                        <input
                            name="name"
                            className="block w-full p-3 mb-3 text-sm font-light text-black bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            placeholder="Full name"
                            type="text"
                            required
                        />
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
                        <h2 className="text-red-500 mb-6">
                            {clerkError && <p>{clerkError}</p>}
                        </h2>
                        <button
                            className="w-full h-12 mb-4 text-sm font-light text-white bg-violet-700 hover:bg-violet-800 rounded-xl"
                            type="submit"
                        >
                            Sign up
                        </button>
                    </form>
                    <p className="text-sm font-light text-center text-black">
                        Already have an account?
                        <Link className="ml-2 text-violet-700" href="/signin">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
