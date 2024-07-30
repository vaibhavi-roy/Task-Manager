// app/components/VerifyForm.tsx
import { FormEvent } from "react"

interface VerifyFormProps {
    handleVerify: (e: FormEvent) => void
    code: string
    setCode: (value: string) => void
}

const VerifyForm = ({ handleVerify, code, setCode }: VerifyFormProps) => {
    return (
        <div className="flex items-center justify-center h-full w-full bg-gradient-to-b from-violet-100 to-violet-300">
            <div className="h-auto bg-white rounded-l shadow-lg w-96 md:w-96 ">
                <div className="p-6 md:p-8">
                    <h1 className="mb-6 text-3xl font-light text-black">
                        Verification Code
                    </h1>
                    <form onSubmit={handleVerify}>
                        <input
                            value={code}
                            className="block w-full p-3 mb-3 text-sm font-light text-black bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            placeholder="Code"
                            type="text"
                            onChange={(e) => setCode(e.target.value)}
                        />

                        <button
                            className="w-full h-12 mb-6 text-sm font-light text-white hover:text-violet-700 hover:bg-white bg-purple-700 rounded-md"
                            type="submit"
                        >
                            Complete sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VerifyForm
