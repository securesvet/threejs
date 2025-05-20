import { useState } from "react";
import Car from "./Car";
import styled from "styled-components";

export default function App() {
  const [carColor, setCarColor] = useState("#ff0000");

  return (
    <Main>
      <Flex>
        <CanvasBox>
          <Car/>
        </CanvasBox>
        <AsideBox>
          <OptionsAside color={carColor} setColor={setCarColor} />
        </AsideBox>
      </Flex>
    </Main>
  );
}

const Main = styled.main`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Flex = styled.div`
  display: flex;
  height: 100%;
`;

const CanvasBox = styled.div`
  flex: 3;
  background: #111;
`;

const AsideBox = styled.div`
  flex: 1;
  background: #f3f3f3;
  padding: 2rem;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
`;

function OptionsAside({ color, setColor }: { color: string; setColor: (c: string) => void }) {
  return (
    <aside>
      <h2>Options</h2>
      <label htmlFor="carColor">Car Color:</label>
      <input
        id="carColor"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ width: "100%", marginTop: "1rem", height: "3rem", border: "none" }}
      />
    </aside>
  );
}
