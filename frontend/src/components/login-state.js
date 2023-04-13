import { useRouter } from "next/router";

export default function LoginState() {
    const router = useRouter();

    return(
        <button type="button" onClick={() => router.push('/authentication/login')}>Login.</button>
    )
}