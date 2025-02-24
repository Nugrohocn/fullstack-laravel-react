const Input = ({ label, type, placeholder, name, id, onChange }) => {
    return (
        <div className="">
            <label
                htmlFor={name}
                className="block text-slate-700 text-sm font-bold my-3"
            >
                {label}
            </label>
            <input
                type={type}
                className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-70"
                placeholder={placeholder}
                name={name}
                id={name}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;
