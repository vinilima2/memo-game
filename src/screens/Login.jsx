import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import '../index2.css';
import {TokenContext} from "../main.jsx";
import Logo from "../components/Logo.jsx";
import {get, post} from "../services/api.js";

const LoginPage = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();
        const {setToken} = useContext(TokenContext);

        const handleLogin = async (e) => {
            e.preventDefault();
            if (username.trim() === '' || password.trim() === '') {
                setError('Por favor, preencha todos os campos.');
                return;
            }


            const {accessToken} = await post("/login", {
                email: username,
                password: password
            })
            if (accessToken) {
                setToken(accessToken)
                localStorage.setItem("memo-game-token", accessToken)
                localStorage.setItem("email", username) // NUNCA FAÇA ISSO NA VIDA REAL
                navigate('/inicio');
            } else {
                setError('Credenciais inválidas');
            }
        }

        const handleRegister = async () => {
            navigate('/registro');
        };

        return (
            <div className="login-page">
                <div className="login-container">
                    <Logo/>
                    <h2 className="login-title">MemoGame</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="username">Usuário</label>
                            <input
                                className={`form-input ${error ? 'error' : ''}`}
                                type="text"
                                placeholder='Usuário'
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Senha</label>
                            <input
                                className={`form-input ${error ? 'error' : ''}`}
                                type="password"
                                placeholder='Senha'
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="login-button" type="submit">
                            Entrar
                        </button>
                    </form>
                    <button className="register-button" onClick={handleRegister}>
                        Registrar
                    </button>
                </div>
            </div>
        );
    }
;

export default LoginPage;