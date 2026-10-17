import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
    const navigate = useNavigate();

    function handleSuccess(email: string) {
        // Salva o e-mail ou nome no localStorage para o Header ler
        localStorage.setItem("travel_user_email", email);

        // Dispara o evento para atualizar o Header instantaneamente
        window.dispatchEvent(new Event("authChange"));

        alert(`Bem-vindo de volta, ${email}!`);
        navigate("/");
    }

    function handleGoToRegister() {
        navigate("/cadastro"); // Redireciona para a sua rota específica de cadastro
    }

    return (
        <div className="min-h-screen bg-brand-dark-bg text-white selection:bg-brand-lime selection:text-brand-dark-bg">
            <main className="min-h-screen bg-passagem bg-cover bg-center bg-no-repeat text-white flex items-center justify-center px-4 py-20">
                <div className="absolute inset-0 -z-10 bg-brand-dark-bg/70" />
                <LoginForm
                    onSuccess={handleSuccess}
                    onNavigateToRegister={handleGoToRegister}
                />
            </main>
        </div>
    );
};

export default Login;