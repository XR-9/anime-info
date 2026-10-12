import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailsPage.css";
import { usefav } from "../context/favContext";
import Information from "../Components/media/Information";
import Loader from "../Components/ui/Loader";
import NotFound from "../Components/ui/NotFound";
import { fetchAnimeById } from "../services/CallApi";

function DetailsPage({ allData }) {
  const { id } = useParams();
  const { favId } = usefav();
  const [fetched, setFetched] = useState(null);
  const [status, setStatus] = useState("idle");

  const local =
    allData.find((a) => a.id === id)?.attributes ||
    favId.find((r) => r.Id === id)?.Anime;
  const hasLocal = Boolean(local);

  useEffect(() => {
    if (hasLocal) return;
    const controller = new AbortController();
    setStatus("loading");
    fetchAnimeById(id, controller.signal)
      .then((a) => { setFetched(a); setStatus("done"); })
      .catch((err) => { if (err.name !== "AbortError") setStatus("error"); });
    return () => controller.abort();
  }, [id, hasLocal]);

  const attrs = local || fetched;
  const isFav = favId.some((r) => r.Id === id);

  if (status === "loading") return <Loader />;
  if (status === "error")
    return <NotFound code="404" title="Anime not found" description="Ye anime load nahi ho paya." />;
  if (!attrs) return null;

  return <Information attrs={attrs} isFav={isFav} id={id} />;
}

export default DetailsPage;