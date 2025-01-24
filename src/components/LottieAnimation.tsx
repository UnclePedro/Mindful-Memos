import React from "react";
import Lottie from "react-lottie";

interface LoadingAnimationProps {
  height?: number;
  width?: number;
  animationData: any;
}

interface State {
  screenHeight: number;
  screenWidth: number;
}

export default class LoadingAnimation extends React.Component<
  LoadingAnimationProps,
  State
> {
  constructor(props: LoadingAnimationProps) {
    super(props);
    this.state = {
      screenHeight: window.innerHeight, // Use innerHeight for screen height
      screenWidth: window.innerWidth, // Use innerWidth for screen width
    };
  }

  componentDidMount() {
    // Listen for resize events to update the screen size when the window resizes
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    // Clean up the event listener when the component unmounts
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    // Update state with the new screen dimensions on resize
    this.setState({
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
    });
  };

  render() {
    const { height, width, animationData } = this.props;
    const { screenHeight, screenWidth } = this.state;

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${screenWidth}px`, // Full screen width based on screen size
          height: `${screenHeight}px`, // Full screen height based on screen size
          zIndex: -1,
        }}
      >
        <Lottie
          options={defaultOptions}
          height={height || screenHeight} // Default to full screen height if no height is provided
          width={width || screenWidth} // Default to full screen width if no width is provided
          isClickToPauseDisabled={true}
          style={{ cursor: "default" }}
        />
      </div>
    );
  }
}
