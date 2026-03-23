import PagePlaceholder from "../../components/common/PagePlaceholder";

function SignUpPage() {
  return (
    <PagePlaceholder
      title="Sign Up"
      description="New learner registration page. Keep the form reusable with the Sign In flow."
      sections={[
        { title: "Registration Form", copy: "Capture learner details and account credentials." },
        { title: "Validation Rules", copy: "Confirm required fields and password strength." },
        { title: "Success Flow", copy: "Redirect users to sign in or directly into onboarding later." },
      ]}
    />
  );
}

export default SignUpPage;
