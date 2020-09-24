import React from "react";
import map from "lodash/map";
import keys from "lodash/keys";
import pickBy from "lodash/pickBy";
import isEqual from "lodash/isEqual";
import sampleSize from "lodash/sampleSize";
import { ImageType } from "@/types/GalleryTypes";
import { fetchDogs } from "@/utils/Fetcher";
import Gallery from "@/components/Gallery";

interface GalleryContainerProps {
  header: string;
  interval: number;
}

interface GalleryContainerState {
  images: ImageType[];
}

class GalleryContainer extends React.Component<GalleryContainerProps, GalleryContainerState> {
  intervalID?: number;

  constructor(props: GalleryContainerProps) {
    super(props);
    this.state = { images: [] };
    this.animateImages = this.animateImages.bind(this);
    this.setComponentInterval = this.setComponentInterval.bind(this);
    this.clearComponentInterval = this.clearComponentInterval.bind(this);
  }

  animateImages(count: number): void {
    const { images } = this.state;
    const hiddenKeys = map(keys(pickBy(images, { isHidden: true })), Number);

    for (let i = 0; i < hiddenKeys.length - 1; i++) {
      const indexFirst = hiddenKeys[i];
      const indexSecond = hiddenKeys[i + 1];
      [images[indexFirst].src, images[indexSecond].src] = [images[indexSecond].src, images[indexFirst].src];
      images[indexFirst].isHidden = images[indexSecond].isHidden = false;
    }

    const randomImages = sampleSize([...images], count);
    randomImages.forEach((i) => (i.isHidden = true));

    this.setState({ images });
  }

  setComponentInterval(): void {
    this.intervalID = setInterval(this.animateImages, this.props.interval * 1000, 6);
  }

  clearComponentInterval(): void {
    this.intervalID ?? clearInterval(this.intervalID);
  }

  componentDidMount(): void {
    fetchDogs(18).then((response) => {
      const images: ImageType[] = [];
      response.forEach((v: string, i: number) => images.push({ id: i + 1, src: v, isHidden: false }));
      this.setState({ images });
      this.setComponentInterval();
    });
  }

  componentWillUnmount(): void {
    this.clearComponentInterval();
  }

  componentDidUpdate(prevProps: GalleryContainerProps): void {
    if (!isEqual(prevProps, this.props)) {
      this.clearComponentInterval();
      this.setComponentInterval();
    }
  }

  render(): JSX.Element {
    return <Gallery header={this.props.header} images={this.state.images} />;
  }
}

export default GalleryContainer;
