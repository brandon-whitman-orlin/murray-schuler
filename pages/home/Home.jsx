import React, { useEffect, useState } from "react";
import "./Home.css";

import Polaroid from "../../components/polaroid/Polaroid";
import PolaroidScroller from "../../components/polaroidscroller/PolaroidScroller";

import { ReactComponent as Logo } from "../../assets/icons/logo.svg";

function Home() {
  return (
    <div className="home">
      <main className="main">
        <PolaroidScroller>
          <Polaroid
            text="Placeholder 1"
            image="https://picsum.photos/200/300"
          />
          <Polaroid
            text="Placeholder 2"
            image="https://picsum.photos/200/301"
          />
          <Polaroid
            text="Placeholder 3"
            image="https://picsum.photos/200/302"
          />
        </PolaroidScroller>
      </main>
    </div>
  );
}

export default Home;
