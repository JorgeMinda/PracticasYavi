import { TextInput } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function AppInput({
  value,
  onChangeText,
  placeholder,
}: Props) {
  return (
    <TextInput
      className="border border-gray-300 rounded-lg p-3"
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
    />
  );
}