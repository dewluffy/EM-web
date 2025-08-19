function FormInput({ label, name, type = 'text', register, error }) {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type={type}
        {...register(name)}
        className={`w-full border px-3 py-2 rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default FormInput