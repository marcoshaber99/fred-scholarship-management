const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300">
      {children}
    </div>
  );
};

export default AuthLayout;
