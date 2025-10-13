export const Card = ({children, className = '', ...props}) => {
    return (
        <div 
        className={`glassmorphism shadow-lg p-6 rounded-2xl ${className}`}
        {...props}>
         {children}
    </div>
    );    
};