import PagePlaceholder from "../../components/common/PagePlaceholder";

function SignInPage() {
  return (
    <PagePlaceholder
      title="Sign In"
      description="Authentication entry page. Build the form, validation, and API connection here."
      sections={[
        { title: "Form Area", copy: "Email, password, remember me, and submit button." },
        { title: "Validation", copy: "Display input errors and loading state." },
        { title: "Navigation", copy: "Provide links to Sign Up and password recovery later." },
      ]}
    />
  );
}

export default SignInPage;
