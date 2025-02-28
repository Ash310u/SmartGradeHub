const Blob = ({ className, color, delay = 0 }) => {
    return (
      <div 
        className={`
          absolute w-72 h-72 rounded-full 
          mix-blend-multiply filter blur-2xl opacity-60
          animate-blob ${delay ? `animation-delay-${delay}` : ''} 
          bg-gradient-to-br from-${color}-300 to-${color}-100
          hover:scale-110 transition-transform duration-500
          ${className}
        `}
      />
    );
  };
  
  export default Blob;