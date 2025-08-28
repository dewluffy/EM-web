import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validators";
import FormInput from "../../components/form/FormInput";
import useAuthStore from "../../store/auth.store";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.actionLoginWithZustand);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const result = await login(formData);

      if (result.success) {
        // แสดง toast ก่อน navigate
        toast.success("Login successful 🎉");

        // navigate ทันที
        if (result.role === "USER") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(result.message || "Login failed ❌");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>

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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
