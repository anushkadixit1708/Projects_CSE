import lotte from "./home-lotte.json";
import { Player } from "@lottiefiles/react-lottie-player";
import Button from "../../components/Button";
const Home = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-2 container place-items-center">
        <div>
          <h1 className="text-title-1 font-medium">
            Fakeness Resistant 2-Factor Authentication
          </h1>
          <Button
            text="Try it out"
            theme="success"
            icon="tick"
            link="/access"
            className="mt-16"
          />
        </div>
        <Player src={lotte} autoplay loop />
      </div>
      {/* <div className="flex justify-end">
        <div>
          <h5 className="font-bold">A project by:</h5>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
