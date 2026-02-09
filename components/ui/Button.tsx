import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  label: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  variant = "primary",
  size = "md",
  label,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const getButtonStyle = () => {
    const stylesList: ViewStyle[] = [styles.base];

    // Variant styles
    if (variant === "primary") stylesList.push(styles.primary);
    else if (variant === "secondary") stylesList.push(styles.secondary);
    else if (variant === "outline") stylesList.push(styles.outline);

    // Size styles
    if (size === "sm") stylesList.push(styles.sm);
    else if (size === "md") stylesList.push(styles.md);
    else if (size === "lg") stylesList.push(styles.lg);

    if (style) stylesList.push(style);

    return stylesList;
  };

  const getTextStyle = () => {
    const stylesList: TextStyle[] = [styles.textBase];

    if (variant === "primary" || variant === "secondary")
      stylesList.push(styles.textWhite);
    else if (variant === "outline") stylesList.push(styles.textPrimary);

    if (textStyle) stylesList.push(textStyle);

    return stylesList;
  };

  return (
    <TouchableOpacity style={getButtonStyle()} activeOpacity={0.8} {...props}>
      <Text style={getTextStyle()}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  primary: {
    backgroundColor: "#00b894",
  },
  secondary: {
    backgroundColor: "#0984e3",
  },
  outline: {
    borderWidth: 2,
    borderColor: "#00b894",
    backgroundColor: "transparent",
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  md: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  lg: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  textBase: {
    textAlign: "center",
    fontWeight: "bold",
  },
  textWhite: {
    color: "#ffffff",
  },
  textPrimary: {
    color: "#00b894",
  },
});
