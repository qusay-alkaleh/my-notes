import { showToast } from "@/lib/toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  setAuthenticated: (auth: boolean) => void;
}

const AuthForm: React.FC<Props> = ({ setAuthenticated }) => {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      showToast("كلمة المرور غير صحيحة", "error");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="max-w-3xl shrink-0 w-full">
        <CardHeader>
          <CardTitle>تسجيل الدخول</CardTitle>
          <CardDescription>يرجى إدخال كلمة المرور للمتابعة</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Input
            type="password"
            placeholder="كلمة المرور"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full">
            تسجيل الدخول
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
