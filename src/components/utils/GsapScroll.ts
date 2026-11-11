import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  gsap.set(".character-model", { autoAlpha: 1, display: "block", x: 0, y: 0, yPercent: 0 });
  if (character) {
    character.rotation.set(0, 0, 0);
  }
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);

  const isDesktop = window.innerWidth > 1024;
  const isTablet = window.innerWidth > 900 && window.innerWidth <= 1024;
  const isMobile = window.innerWidth <= 900;

  if (!isMobile) {
    gsap.set(".what-box-in", { display: "none", opacity: 0 });
  } else {
    gsap.set(".what-box-in", { display: "flex", opacity: 1 });
  }

  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
      onLeaveBack: () => {
        gsap.set(".landing-container", { opacity: 1, y: "0%" });
        if (!isMobile) {
          gsap.set(".what-box-in", { display: "none", opacity: 0 });
        }
      },
      onUpdate: (self) => {
        if (self.progress <= 0.03) {
          gsap.set(".landing-container", { opacity: 1, y: "0%" });
        }
      },
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: isMobile ? ".whatIDO" : ".about-section",
      start: isMobile ? "top 85%" : "bottom 90%",
      end: isMobile ? "top 20%" : "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
      onLeaveBack: () => {
        if (!isMobile) {
          gsap.set(".what-box-in", { display: "none", opacity: 0 });
          gsap.set(".about-section", { opacity: 1, y: "0%" });
        }
      },
      onUpdate: (self) => {
        if (!isMobile && self.progress <= 0.02) {
          gsap.set(".what-box-in", { display: "none", opacity: 0 });
        }
      },
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  character?.children.forEach((object: any) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        child.material.transparent = true;
        child.material.opacity = 0;
        if (child.material.name === "Material.027") {
          child.material.color.set("#FFFFFF");
        }
      });
    }
    if (object.name === "screenlight") {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.emissive.set("#C8BFFF");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
    }
  });
  if (character) {
    const charX1 = isDesktop ? "-25%" : isTablet ? "-18%" : "0%";
    const rotY1 = isDesktop ? 0.7 : isTablet ? 0.5 : 0.35;
    const camZ1 = isDesktop ? 22 : isTablet ? 25 : 30;
    const camY1 = isMobile ? 13.5 : 13.1;
    const aboutMeY = isDesktop ? "-50%" : isTablet ? "-30%" : "-15%";

    tl1
      .fromTo(
        ".landing-container",
        { opacity: 1 },
        { opacity: 0, duration: 0.35, immediateRender: false },
        0.25
      )
      .fromTo(
        ".landing-container",
        { y: "0%" },
        { y: isMobile ? "25%" : "40%", duration: 0.7, immediateRender: false },
        0.1
      );

    if (!isMobile) {
      tl1.fromTo(
        ".about-me",
        { y: aboutMeY },
        { y: "0%", duration: 0.65, immediateRender: false },
        0.35
      );
    }

    tl1
      .to(
        character.rotation,
        { y: rotY1, duration: 0.6, ease: "power1.inOut" },
        0.4
      )
      .to(
        camera.position,
        { z: camZ1, y: camY1, duration: 0.6, ease: "power1.inOut" },
        0.4
      )
      .to(
        ".character-model",
        { x: charX1, y: 0, duration: 0.6, ease: "power1.inOut" },
        0.4
      );

    const charX2 = isDesktop ? "-15%" : isTablet ? "-10%" : "6%";
    const charY2 = isMobile ? "-23%" : "0%";
    const rotY2 = isDesktop ? 0.85 : isTablet ? 0.75 : 0.35;
    const rotX2 = isMobile ? 0.02 : 0.05;
    const camZ2 = isDesktop ? 72 : isTablet ? 82 : 420;
    const camY2 = isDesktop ? 8.0 : isTablet ? 7.6 : 7.5;

    tl2
      .to(
        camera.position,
        {
          z: camZ2,
          y: camY2,
          duration: isMobile ? 1 : 5,
          ease: isMobile ? "power1.inOut" : "power2.inOut",
        },
        0
      )
      .to(
        ".character-model",
        {
          pointerEvents: "none",
          x: charX2,
          y: charY2,
          duration: isMobile ? 1 : 5,
          ease: isMobile ? "power1.inOut" : "power2.inOut",
        },
        0
      )
      .to(
        character.rotation,
        {
          y: rotY2,
          x: rotX2,
          duration: isMobile ? 1 : 3.5,
          ease: "power1.inOut",
        },
        isMobile ? 0 : 1
      );

    if (!isMobile) {
      tl2
        .to(
          ".about-section",
          {
            opacity: 0,
            y: "30%",
            duration: 2,
            ease: "power1.in",
          },
          2.5
        )
        .fromTo(
          ".what-box-in",
          { display: "none", opacity: 0 },
          {
            display: "flex",
            opacity: 1,
            duration: 1.8,
            ease: "power1.out",
          },
          3.0
        );
    }

    tl2.fromTo(
      ".character-rim",
      { opacity: 1, scaleX: 1.4 },
      { opacity: 0, scale: 0, y: "-70%", duration: 4, immediateRender: false },
      0.3
    );

    tl3.fromTo(
      ".character-model",
      { yPercent: 0 },
      {
        yPercent: -100,
        ease: "none",
        duration: 1,
      },
      0
    );

    ScrollTrigger.create({
      trigger: ".career-section",
      start: "top 60%",
      end: "bottom top",
      onEnter: () => gsap.set(".character-model", { autoAlpha: 0 }),
      onLeaveBack: () => gsap.set(".character-model", { autoAlpha: 1 }),
    });
  }
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
