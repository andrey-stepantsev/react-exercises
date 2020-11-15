import styled from "@emotion/styled";

interface IText {
  primary?: boolean;
  spacing?: string;
  margin?: string;
  bold?: boolean;
  uppercase?: boolean;
}

const Text = styled.p<IText>(
  {
    fontSize: "1rem",
  },
  (props) => ({
    color: props.primary ? "#00bcd4" : "#757575",
    letterSpacing: props.spacing,
    margin: props.margin || "0",
    fontWeight: props.bold ? "bold" : "normal",
    textTransform: props.uppercase ? "uppercase" : "none",
  })
);

export const Header = styled(Text)({
  fontSize: "2.1rem",
});

export const HeaderSecond = styled(Text)({
  fontSize: "1.8rem",
});

export const Paragraph = styled(Text)({
  fontSize: "1.1rem",
});

export const Small = styled(Text)({
  fontSize: "0.9rem",
  opacity: "0.8",
});

export const Icon = styled.span({
  margin: "0 10px 0 0",
});

export const IconBig = styled.span({
  fontSize: "3rem",
  margin: "0 13px 0 -2px",
});
