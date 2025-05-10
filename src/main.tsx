import { render } from "preact";
import App from "./app.tsx";
import "./index.css";

// Initialize Firebase if configured
import '@/lib/firebase/init';

render(<App />, document.getElementById("app")!);
