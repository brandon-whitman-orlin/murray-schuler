import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import "./PolaroidScroller.css"; // Include your keyframes here

const PolaroidScroller = ({ children }) => {
  const validPolaroids = useMemo(
    () => React.Children.toArray(children).filter(React.isValidElement),
    [children]
  );

  // Store fixed random rotations for each polaroid on initial mount
  const rotations = useMemo(
    () => validPolaroids.map(() => parseFloat((Math.random() * 10 - 5).toFixed(2))),
    [validPolaroids.length] // Only recreate if number of polaroids changes
  );

  const [polaroidOrder, setPolaroidOrder] = useState(validPolaroids);
  const [animatingPolaroid, setAnimatingPolaroid] = useState(null); // { key, direction }
  const scrollBlockIndex = useRef(0);
  const polaroidsSectionRef = useRef(null); // Reference to the polaroids section

  const handleScroll = useCallback(() => {
    // Check if the polaroids element is in viewport
    if (!polaroidsSectionRef.current) return;

    const rect = polaroidsSectionRef.current.getBoundingClientRect();
    const buffer = 30;
    const viewportHeight = window.innerHeight;

    // Only track scroll if the bottom of the polaroids element is at or below the bottom of the viewport
    // (with 30px buffer for edge cases)
    const isInViewport = rect.bottom >= (viewportHeight - buffer);

    if (!isInViewport) {
      return; // Exit early if polaroids are not in the relevant viewport area
    }

    const vh = window.innerHeight;
    const currentScroll = window.scrollY;
    const newBlockIndex = Math.round(currentScroll / vh);

    if (newBlockIndex === scrollBlockIndex.current) return;

    const direction = newBlockIndex > scrollBlockIndex.current ? "down" : "up";

    setPolaroidOrder((prevOrder) => {
      const newOrder = [...prevOrder];

      if (direction === "down") {
        const movedPolaroid = newOrder[0];
        // const revealedPolaroid = newOrder[1];

        // console.log(`Scrolled down: Moving "${movedPolaroid.props.text}" to back`);
        // console.log(`Now showing: "${revealedPolaroid?.props.text}"`);

        setAnimatingPolaroid({ key: movedPolaroid.key ?? 0, direction: "toBottom" });
        newOrder.push(newOrder.shift());
      } else {
        const movedPolaroid = newOrder[newOrder.length - 1];
        // const revealedPolaroid = movedPolaroid;

        // console.log(`Scrolled up: Bringing "${movedPolaroid.props.text}" to front`);
        // console.log(`Now showing: "${revealedPolaroid?.props.text}"`);

        setAnimatingPolaroid({ key: movedPolaroid.key ?? newOrder.length - 1, direction: "toTop" });
        newOrder.unshift(newOrder.pop());
      }

      return newOrder;
    });

    scrollBlockIndex.current = newBlockIndex;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!animatingPolaroid) return;

    const timer = setTimeout(() => setAnimatingPolaroid(null), 600); // Slightly longer than animation
    return () => clearTimeout(timer);
  }, [animatingPolaroid]);

  // Update polaroid order when children change
  useEffect(() => {
    setPolaroidOrder(validPolaroids);
  }, [validPolaroids]);

  const totalPolaroids = polaroidOrder.length;

  const stackedPolaroids = useMemo(() => {
    return polaroidOrder.map((child, index) => {
      const key = child.key ?? index;
      const isAnimating = animatingPolaroid?.key === key;
      const animationClass = isAnimating ? `animate-${animatingPolaroid.direction}` : "";
      const isActive = index === 0; // Top polaroid is at index 0

      // Use fixed rotation from state
      const rotation = child.props.rotation ?? rotations[index];
      const stackIndex = index;
      const zIndex = totalPolaroids - index;

      return React.cloneElement(child, {
        key,
        stackIndex,
        rotation,
        active: isActive,
        className: `${child.props.className ?? ""} ${animationClass}`.trim(),
        style: {
          ...(child.props.style || {}),
          '--polaroidZIndex': zIndex,
          '--stackIndex': stackIndex,
        },
      });
    });
  }, [polaroidOrder, animatingPolaroid, rotations, totalPolaroids]);

  return (
    <section
      ref={polaroidsSectionRef}
      className="polaroid-section"
      style={{ '--polaroidCount': totalPolaroids }}
    >
      <div className="polaroids">{stackedPolaroids}</div>
    </section>
  );
};

PolaroidScroller.propTypes = {
  children: PropTypes.node,
};

export default PolaroidScroller;