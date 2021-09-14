import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Difficulty } from "../../../api/spec";

interface DifficultySelectorProps {
  setDifficulty: (difficulty: Difficulty) => void;
  difficulty: Difficulty;
  horizontal: boolean;
}

function DifficultySelector({
  difficulty,
  setDifficulty,
  horizontal: _horizontal,
}: DifficultySelectorProps) {
  const [selected, setSelected] = useState(difficulty ?? Difficulty.MEDIUM);
  const [horizontal] = useState(!!_horizontal);

  useEffect(() => setDifficulty(selected), [selected]);

  return (
    <View
      style={{
        maxHeight: 150,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: horizontal ? 1 : 0,
          flexDirection: horizontal ? "row" : "column",
          alignItems: horizontal ? "center" : "center",
          justifyContent: horizontal ? "center" : "space-around",
        }}
      >
        <View
          style={{
            height: selected === Difficulty.EASY ? 30 : 25,
            width: selected === Difficulty.EASY ? 30 : 25,
            borderWidth: 1,
            borderRadius: 40,
            backgroundColor:
              selected === Difficulty.EASY ? "cadetblue" : "rgba(0,0,0,0.1)",
            borderColor:
              selected === Difficulty.EASY ? "cadetblue" : "rgba(0,0,0,0.1)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setSelected(Difficulty.EASY)}
          />
          {selected === Difficulty.EASY ? (
            <View
              style={{
                width: 60,
                flex: 1,
                position: "absolute",
                bottom: -20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: selected === Difficulty.EASY ? "cadetblue" : "black",
                }}
              >
                Easy
              </Text>
            </View>
          ) : null}
        </View>
        <View
          style={{
            flex: 1,
            borderRightWidth: horizontal ? 0 : 1,
            borderBottomWidth: horizontal ? 1 : 0,
            borderColor: "rgba(0,0,0,0.1)",
          }}
        />
        <View
          style={{
            height: selected === Difficulty.MEDIUM ? 30 : 25,
            width: selected === Difficulty.MEDIUM ? 30 : 25,
            borderWidth: 1,
            borderRadius: 40,
            backgroundColor:
              selected === Difficulty.MEDIUM
                ? "cornflowerblue"
                : "rgba(0,0,0,0.1)",
            borderColor:
              selected === Difficulty.MEDIUM
                ? "cornflowerblue"
                : "rgba(0,0,0,0.1)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setSelected(Difficulty.MEDIUM)}
          />
          {selected === Difficulty.MEDIUM ? (
            <View
              style={{
                width: 60,
                position: "absolute",
                bottom: -20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color:
                    selected === Difficulty.MEDIUM ? "cornflowerblue" : "black",
                }}
              >
                Medium
              </Text>
            </View>
          ) : null}
        </View>

        <View
          style={{
            flex: 1,
            borderRightWidth: horizontal ? 0 : 1,
            borderBottomWidth: horizontal ? 1 : 0,
            borderColor: "rgba(0,0,0,0.1)",
          }}
        />
        <View
          style={{
            height: selected === Difficulty.HARD ? 30 : 25,
            width: selected === Difficulty.HARD ? 30 : 25,
            borderWidth: 1,
            borderRadius: 40,
            backgroundColor:
              selected === Difficulty.HARD
                ? "rgba(255,0,0,0.6)"
                : "rgba(0,0,0,0.1)",
            borderColor:
              selected === Difficulty.HARD
                ? "rgba(255,0,0,0.6)"
                : "rgba(0,0,0,0.1)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setSelected(Difficulty.HARD)}
          />
          {selected === Difficulty.HARD ? (
            <View
              style={{
                width: 60,
                position: "absolute",
                bottom: -20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color:
                    selected === Difficulty.HARD
                      ? "rgba(255,0,0,0.6)"
                      : "black",
                }}
              >
                Hard
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export default DifficultySelector;
