import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const y = Dimensions.get("window").height;

interface ProgressTimerProps {
  setTimer: { min: number; sec: number };
  onPlayerToggle?: (value: boolean) => void;
  onFinish?: () => void;
}

const TimerComponent = forwardRef(
  ({ setTimer, onPlayerToggle, onFinish }: ProgressTimerProps, ref) => {
    const [time, setTime] = useState(setTimer);
    const [duration, setDuration] = useState(setTimer.min * 60 + setTimer.sec);
    const [paused, setPaused] = useState(false);

    const [ticker, setTicker] = useState<number>();

    function getSeparateTimeUnits(duration: number) {
      return {
        min: duration < 60 ? 0 : Math.floor(duration / 60),
        sec: duration < 60 ? duration : duration % 60,
      };
    }

    useImperativeHandle(ref, () => ({
      togglePlayer() {
        setPaused(!paused);
      },
    }));

    useEffect(() => {
      setDuration(setTimer.min * 60 + setTimer.sec);
    }, [setTimer]);

    useEffect(() => {
      setTime(getSeparateTimeUnits(duration));
    }, [duration]);

    useEffect(() => {
      if (!!ticker) clearInterval(ticker);
      let _ticker: number;

      if (paused) {
        clearInterval(ticker as number);
      } else if (duration > 0) {
        _ticker = setInterval(() => {
          setDuration(duration - 1);
        }, 1000);

        setTicker(_ticker);
      } else {
        if (!!ticker) onFinish();
      }

      return () => {
        clearInterval(_ticker as number);
      };
    }, [duration, paused]);

    return (
      <>
        <View style={styles.circle}>
          <Text style={{ color: "white", fontSize: 50 }}>
            {`${
              time.min > 0 || time.sec > 0
                ? `${
                    time.min > 0
                      ? `${time.min > 9 ? `${time.min}` : `0${time.min}`}`
                      : `00`
                  }:${
                    time.sec > 0
                      ? `${time.sec > 9 ? `${time.sec}` : `0${time.sec}`}`
                      : `00`
                  }`
                : ` 00:00`
            }`}
          </Text>
          <Text style={{ color: "white", fontSize: 22 }}>__</Text>
          <Text style={{ color: "white", fontSize: 20 }}>
            {time.min > 0 ? "Minutes" : "Seconds"}
          </Text>
        </View>
      </>
    );
  }
);

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    height: y * 0.23,
    width: y * 0.23,
    borderRadius: y * 0.23 * 0.5,
  },
});

export default TimerComponent;
