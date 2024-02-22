import { APP_ROUTES } from "../../constants/route.const";
import "./home.scss";

const Home = ({ homes }) => {
  return (
    <section className="home_list">
      <div className="list">
        <h2> Liste de vos biens</h2>
        <ul>
          {homes.map((home) => (
            <li key={home.id}>{home.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
