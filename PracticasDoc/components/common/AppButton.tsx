import { TouchableOpacity, Text } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
}

export default function AppButton({
  title,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      className="bg-blue-600 p-4 rounded-lg"
      onPress={onPress}
    >
      <Text className="text-white text-center font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}