const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-[580px] px-4 py-8">{children}</div>
    </div>
  );
};

export default AuthLayout;
