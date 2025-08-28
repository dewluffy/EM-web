import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validators";
import FormInput from "../../components/form/FormInput";
import { actionRegister } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await actionRegister(data);
      toast.success("Register success 🎉",);
      navigate("/login")
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Register failed ❌";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto mt-10 space-y-4"
    >
      <FormInput
        label="First Name"
        name="firstName"
        register={register}
        error={errors.firstName?.message}
      />
      <FormInput
        label="Last Name"
        name="lastName"
        register={register}
        error={errors.lastName?.message}
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
      />
      <FormInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword?.message}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 rounded text-white ${
          isSubmitting ? "bg-gray-400" : "bg-blue-600"
        }`}
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export default Register;
