import React, { useEffect, useState } from "react";
import "./Home.css";

import Polaroid from "../../components/polaroid/Polaroid";
import PolaroidScroller from "../../components/polaroidscroller/PolaroidScroller";

import Cat1 from "../../assets/images/cat1.jpg";
import Cat2 from "../../assets/images/cat2.jpg";
import Cat3 from "../../assets/images/cat3.jpg";

import { ReactComponent as Logo } from "../../assets/icons/logo.svg";

function Home() {
  return (
    <div className="home">
      <main className="main">
        <PolaroidScroller>
          <Polaroid
            text="Placeholder 1"
            image={Cat1}
          />
          <Polaroid
            text="Placeholder 2"
            image={Cat2}
          />
          <Polaroid
            text="Placeholder 3"
            image={Cat3}
          />
        </PolaroidScroller>
      </main>
    </div>
  );
}

export default Home;
