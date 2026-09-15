import { useEffect, useState } from "react";
import Hero from "../components/Hero.jsx";
import MovieRow from "../components/MovieRow.jsx";
import Loader from "../components/Loader.jsx";
import {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
} from "../api/tmdb.js";

function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [trendingData, popularData, topRatedData, upcomingData] =
          await Promise.all([
            getTrending(),
            getPopular(),
            getTopRated(),
            getUpcoming(),
          ]);
        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setUpcoming(upcomingData);
      } catch (err) {
        setError("Could not load movies. Check your TMDB API key on the server.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p style={{ padding: 40 }}>{error}</p>;

  return (
    <div>
      <Hero movie={trending[0]} />
      <MovieRow title="Trending Now" movies={trending} />
      <MovieRow title="Popular on NetFlex" movies={popular} />
      <MovieRow title="Top Rated" movies={topRated} />
      <MovieRow title="Coming Soon" movies={upcoming} />
    </div>
  );
}

export default Home;
