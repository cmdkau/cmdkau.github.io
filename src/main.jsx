import { createRoot } from "react-dom/client";
import GridMotion from "@/components/GridMotion";
import "../styles.css";
import "../script.js";

const gridItems = Array.from({ length: 24 }, () => null);
const heroBackground = document.getElementById("hero-background");

if (heroBackground) {
    createRoot(heroBackground).render(
        <GridMotion
            items={gridItems}
            rows={6}
            aspectRatio={1}
            gap={12}
            radius={4}
            angle={-8}
            tilt={4}
            speed={9}
            parallax={0.25}
            spotlight={0.45}
            dim={0.58}
            fade={0.72}
            tileColor="var(--hero-grid-tile)"
            className="hero-grid-motion"
            style={{ "--gm-border": "var(--hero-grid-border)" }}
        />
    );
}
