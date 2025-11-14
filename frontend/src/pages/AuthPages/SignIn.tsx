import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Admin Login | Rail Madad AI - Complaint Management System"
        description="Sign in to the Rail Madad AI admin dashboard to manage railway passenger complaints"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
