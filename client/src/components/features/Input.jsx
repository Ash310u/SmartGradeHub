const Input = ({ 
    type = 'text',
    id,
    name,
    placeholder,
    value,
    onChange,
    className = '',
    ...props 
  }) => {
    return (
      <div className="transform hover:-translate-y-1 transition-transform duration-200">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 ${className}`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  };
  
  export default Input; 