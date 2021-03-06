import React, { ReactNode } from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../constants/colors";

export interface NumberContainerProps {
	children: ReactNode;
}

const NumberContainer: React.FunctionComponent<NumberContainerProps> = ({
	children,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.number}>{children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: colors.secondary,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	number: {
		color: colors.secondary,
		fontSize: 22,
	},
});

export default NumberContainer;
