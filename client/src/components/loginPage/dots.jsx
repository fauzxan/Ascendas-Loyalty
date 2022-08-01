import { DotWrapper, Dot } from "./common";

export function Ldots(props) {
  return (
    <DotWrapper style={{ position: "relative", margin: "10px 10px" }}>
      <Dot delay="0s" />
      <Dot delay=".1s" />
      <Dot delay=".2s" />
    </DotWrapper>
  );
}
