import { Abril_Fatface } from "next/font/google";

const abrilFatface = Abril_Fatface({
  weight: "400",
});

export default function HeroComponent() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-8 p-8 sm:gap-10 sm:px-16 md:gap-12 md:px-32 lg:px-48 xl:px-80">
      <div className="flex flex-col items-center justify-center gap-4 text-center sm:gap-5 md:gap-6">
        <h1
          className={`${abrilFatface.className} -skew-2 text-5xl leading-14 sm:text-6xl sm:leading-16 lg:text-7xl lg:leading-20 2xl:text-8xl 2xl:leading-24`}
        >
          <span className="hero__colored-text after:bg-[#41D2F2]">iLAB</span>{" "}
          Lives
          <br />
          in{" "}
          <span className="hero__colored-text after:bg-[#F2E52E]">
            Skill Hub
          </span>
        </h1>
        <p>
          Skill Hub is the physical presence of iLAB, situated in the vibrant
          coastal area of Payyanakkal, Kozhikode.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href="https://maps.app.goo.gl/QgTNoSREcg2wiKev6"
          className="btn btn-block btn-soft btn-primary sm:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
            />
          </svg>
          Get Directions
        </a>
        <a
          href="tel:+918129330038"
          className="btn btn-block btn-soft btn-secondary sm:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
          Contact Space Manager
        </a>
      </div>
    </div>
  );
}
