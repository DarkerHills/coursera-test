import { Nav } from "./Nav";
import { EmailCapture } from "./EmailCapture";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  return (
    <div
      className="isolate relative flex min-h-[520px] w-full flex-1 flex-col overflow-hidden lg:h-[832px]"
      data-node-id="2902:41849"
    >
      <HeroBackground />

      <Nav />

      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 px-6 py-10 sm:px-8">
        <div className="flex w-full max-w-[502px] flex-col items-center gap-6">
          <p
            className="mhmw-animate-in w-full text-center font-mhmw-body text-[15px] font-semibold text-mhmw-bg-medium capitalize"
            style={{ animationDelay: "120ms" }}
          >
            Save Ideas. Connect with designers. Get personalised home recommendation. All in one place
          </p>
          <h1
            className="mhmw-animate-in w-full text-center font-mhmw-display text-[28px] leading-[1.2] font-black text-mhmw-bg-default sm:text-[31px] sm:leading-[37.2px]"
            style={{ animationDelay: "220ms" }}
          >
            Find a house that suits the way you live
          </h1>
          <div className="mhmw-animate-in w-full" style={{ animationDelay: "340ms" }}>
            <EmailCapture />
          </div>
        </div>
      </div>
    </div>
  );
}
