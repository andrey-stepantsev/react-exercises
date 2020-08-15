import React from "react";
import isEqual from "lodash/isEqual";
import Image from "../../components/Image/Image";

interface ImageContainerProps {
  src: string;
  isHidden: boolean;
}

class ImageContainer extends React.Component<ImageContainerProps, unknown> {
  constructor(props: ImageContainerProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: ImageContainerProps): boolean {
    return !isEqual(this.props, nextProps);
  }

  render(): JSX.Element {
    return <Image {...this.props} />;
  }
}

export default ImageContainer;
