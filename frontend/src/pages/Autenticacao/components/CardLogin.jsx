/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/PasswordInput";

const CardLogin = ({
  emailLogin,
  setEmailLogin,
  senhaLogin,
  setSenhaLogin,
  handleLogin,
}) => {
  return (
    <div className="w-full mt-10 flex flex-col items-center border pt-10 pb-24">
      <p className="font-bold text-6xl">login</p>
      <div className="mt-12">
        <div className="w-[362px] gap-2">
          <Label htmlFor="email-login">Email</Label>
          <Input
            type="email-login"
            id="email-login"
            placeholder="Email"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
          />
        </div>
        <div className="w-[362px] gap-2 mt-4">
          <Label htmlFor="senha-login">Senha</Label>
          <PasswordInput
            id="senha-login"
            placeholder="Senha"
            value={senhaLogin}
            onChange={(e) => setSenhaLogin(e.target.value)}
          />
        </div>
      </div>
      <Button className="w-[362px] mt-8" onClick={handleLogin}>
        Conecte-se
      </Button>
    </div>
  );
};

export default CardLogin;
