import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";

const Cadastro = () => {
    const navigate = useNavigate();

    function handleSuccess(email: string) {
        alert(`Conta criada com sucesso para ${email}! Seja bem-vindo à Travel.com.`);
        navigate("/login");
    }

    function handleGoToLogin() {
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-brand-dark-bg text-white selection:bg-brand-lime selection:text-brand-dark-bg">
            <main className="min-h-screen bg-passagem bg-cover bg-center bg-no-repeat text-white flex items-center justify-center px-4 py-20">
                <div className="absolute inset-0 -z-10 bg-brand-dark-bg/70" />
                <RegisterForm
                    onSuccess={handleSuccess}
                    onNavigateToLogin={handleGoToLogin}
                />
            </main>
        </div>
    );
};

export default Cadastro;