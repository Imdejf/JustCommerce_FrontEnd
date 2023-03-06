import AuthForm from "./LoginForm";

const AuthPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-1 flex-col py-8">
        <AuthForm />
      </div>
    </>
  );
};

export default AuthPage;
