import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, {
  forwardRef,
  Props,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const y = Dimensions.get("window").height;

interface ProgressTimerProps extends Props<any> {
  containerStyle: any;
  innerStyle: any;
  tintColor: string;
  backgroundColor: string;
  size: number;
  width: number;
  fill: number;
  duration: { min: number; sec: number };
  onPlayerToggle?: (value: boolean) => void;
}

const ProgressTimer = forwardRef(
  (
    {
      children,
      fill,
      containerStyle,
      innerStyle,
      backgroundColor,
      tintColor,
      size,
      width,
      duration: _duration,
      onPlayerToggle,
    }: ProgressTimerProps,
    ref
  ) => {
    const [time, setTime] = useState(_duration);
    const [duration, setDuration] = useState(
      _duration?.min * 60 + _duration?.sec ?? 0
    );
    const [paused, setPaused] = useState(false);

    const [ticker, setTicker] = useState<number>();
    const [filler, setFiller] = useState(calculateFillerPercentage());

    function getSeparateTimeUnits(duration: number) {
      return {
        min: duration < 60 ? 0 : Math.floor(duration / 60),
        sec: duration < 60 ? duration : duration % 60,
      };
    }

    function calculateFillerPercentage() {
      return (
        100 - (duration / (_duration?.min * 60 + _duration?.sec ?? 0)) * 100
      );
    }

    useImperativeHandle(ref, () => ({
      togglePlayer() {
        setPaused(!paused);
        if (!!onPlayerToggle) onPlayerToggle(!paused);
      },
    }));

    useEffect(() => {
      // setDuration(_duration.min * 60 + _duration.sec);
    }, [_duration]);

    useEffect(() => {
      setTime(getSeparateTimeUnits(duration));
      setFiller(calculateFillerPercentage());
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
        console.log({ duration });
        setPaused(true);
      }

      return () => {
        clearInterval(_ticker as number);
      };
    }, [duration, paused]);

    return (
      <>
        <View style={containerStyle}>
          <AnimatedCircularProgress
            tintColor={tintColor}
            style={innerStyle}
            backgroundColor={backgroundColor}
            size={size}
            width={width}
            fill={filler}
          />
          {children}
        </View>
      </>
    );
  }
);

export default ProgressTimer;
