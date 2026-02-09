import { clsx, type ClassValue } from 'clsx';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  label: string;
}

export function Button({ variant = 'primary', size = 'md', label, className, ...props }: ButtonProps) {
  const baseStyles = "items-center justify-center rounded-lg active:opacity-80";
  
  const variants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    outline: "border-2 border-primary bg-transparent",
  };

  const sizes = {
    sm: "px-3 py-1.5",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  };

  const textStyles = {
    primary: "text-white font-bold",
    secondary: "text-white font-bold",
    outline: "text-primary font-bold",
  };

  return (
    <TouchableOpacity 
      className={cn(baseStyles, variants[variant], sizes[size], className)} 
      {...props}
    >
      <Text className={cn("text-center", textStyles[variant])}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
