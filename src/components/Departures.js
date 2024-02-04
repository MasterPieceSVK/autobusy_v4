import DepartureCard from "./DepartureCard";
import Platform from "./Platform";

export default function Departures({ departures }) {
  const platforms = {};
  departures.map((platform) => {
    platforms[platform.PlatformName] = platform.PlatformName;
  });

  Object.values(platforms).map((platform) => {
    console.log(platform);
  });
  return (
    <div>
      <div className="flex gap-4 justify-center">
        {Object.values(platforms).map((platform) => {
          if (platform.length > 0) {
            return <Platform platformNo={platform} />;
          }
        })}
      </div>
      {departures.map((departure) => {
        return <DepartureCard departure={departure} />;
      })}
    </div>
  );
}
