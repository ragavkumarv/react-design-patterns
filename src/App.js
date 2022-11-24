import { useEffect, useState } from "react";
import "./styles.css";

export function withStyles(Component) {
  return (props) => {
    const style = {
      color: "red",
      fontSize: "3em",
      // Merge props
      ...props.style
    };

    return <Component {...props} style={style} />;
  };
}

const Text = ({ on }) => (on ? <h1>ON</h1> : <h1>OFF</h1>);
const StyledText = withStyles(Text);

export default function App() {
  const [movies, isLoading, getMovies] = useMovies();

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <StyledText on={true} />
    </div>
  );
}

function useMovies() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const getMovies = () => {
    setLoading(true);
    fetch("Api")
      .then((data) => data.json())
      .then((mvs) => setMovies(mvs))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getMovies();
  }, []);

  return [movies, isLoading, getMovies];
}
