import React from "react";
import Lottie from "react-lottie";

interface LoadingAnimationProps {
  height?: number;
  width?: number;
  animationData: any;
}

export default class LoadingAnimation extends React.Component<LoadingAnimationProps> {
  render() {
    const { height, width, animationData } = this.props;
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <Lottie
        options={defaultOptions}
        height={height}
        width={width}
        style={{ position: "absolute", top: 0, left: 0, cursor: "default" }}
        isClickToPauseDisabled={true}
      />
    );
  }
}
