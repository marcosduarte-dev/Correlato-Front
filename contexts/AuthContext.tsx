import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import { getById, login } from "@/service/actions/usuarios-service";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: UsuariosModel | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
};

type SignInData = {
  email: string;
  password: string;
};


export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<UsuariosModel | null>(null);
    const router = useRouter();

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'correlato-token': token } = parseCookies();

        if (token) {
            const decodedToken = jwtDecode(token.toString());
            const userId = decodedToken.sub;

            getById(userId, token).then((usuario) => {
                setUser(usuario);
            });
        }
    }, [])

    async function signIn({ email, password }: SignInData) {
          const loginDTO = {
            email: email,
            senha: password,
          }
      
          const result = await login(loginDTO);
      
          setCookie(undefined, 'correlato-token', result.accessToken, {
            maxAge: result.expiresIn,
          });

          const token = result.accessToken;
          const decodedToken = jwtDecode(token.toString());
          const userId = decodedToken.sub;

          const usuario = await getById(userId, token);

          setUser(usuario);

          router.push('/');
    }

  return <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>{children}</AuthContext.Provider>;
}