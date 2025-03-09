import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export const useFocus = () => {
	const [focused, setFocused] = useState(false);
	useFocusEffect(
		// Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
		useCallback(() => {
			// Invoked whenever the route is focused.
			setFocused(true);
			// Return function is invoked whenever the route gets out of focus.
			return () => {
				setFocused(false);
			};
		}, []),
	);
	return focused;
};
