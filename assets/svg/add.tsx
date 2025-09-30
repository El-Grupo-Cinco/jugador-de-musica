import Svg, { Circle, Path } from "react-native-svg";

export function AddIcon({ size = 10, color = "white" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <Path
        d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}
