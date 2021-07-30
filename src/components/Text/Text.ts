import styled from "@emotion/styled";

interface IText {
  primary?: boolean;
  letterSpacing?: string;
  margin?: string;
  bold?: boolean;
  uppercase?: boolean;
}

const Text = styled.p<IText>(
  {
    fontSize: "1rem",
  },
  ({ primary, letterSpacing, margin = "0px", bold, uppercase }) => ({
    color: primary ? "#00bcd4" : "#757575",
    letterSpacing,
    margin,
    fontWeight: bold ? "bold" : "normal",
    textTransform: uppercase ? "uppercase" : "none",
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
