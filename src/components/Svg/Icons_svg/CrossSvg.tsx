import React from "react";
import Svg, { Path } from "react-native-svg";

const CrossIcon = ({ color, fw }: { color?: string; fw?: string }) => {
    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M18.2414 18.1429L1 1M18.2414 1L1 18.1429" stroke={'white'} strokeWidth={2} stroke-linecap="round" />
        </Svg>
    );
};

export default CrossIcon;
