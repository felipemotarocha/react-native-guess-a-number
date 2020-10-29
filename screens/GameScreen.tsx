import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card";
import BodyText from "../components/BodyText";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const generateRandomBetween: any = (
	min: number,
	max: number,
	exclude: number
) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

export interface GameScreenProps {
	userChoice: number;
	gameOver: (rounds: number) => void;
}

const GameScreen: React.FunctionComponent<GameScreenProps> = ({
	userChoice,
	gameOver,
}) => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, userChoice)
	);
	const [rounds, setRounds] = useState(0);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		if (currentGuess === userChoice) {
			gameOver(rounds);
		}
	}, [currentGuess, userChoice, gameOver]);

	const handleNextGuess = (direction: "lower" | "greater") => {
		if (
			(direction === "lower" && currentGuess < userChoice) ||
			(direction === "greater" && currentGuess > userChoice)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{
					text: "Sorry!",
					style: "cancel",
				},
			]);
			return;
		}
		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setRounds((currentRounds) => currentRounds + 1);
	};

	return (
		<View style={styles.container}>
			<BodyText>Opponent's guess:</BodyText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonsContainer}>
				<MainButton onPress={() => handleNextGuess("lower")}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={() => handleNextGuess("greater")}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 300,
		maxWidth: "80%",
	},
});

export default GameScreen;
