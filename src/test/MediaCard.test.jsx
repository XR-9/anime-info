import { screen, render, logRoles } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import MediaCard from "../Components/media/MediaCard";
import { FavContextProvider } from "../context/favContext";


const mockAnime = {
    canonicalTitle: "Naruto",
    posterImage: {
        medium: "https://example.com/poster.jpg",
        small: "https://example.com/small.jpg",
    },
    averageRating: "85.5",
    showType: "TV",
    episodeCount: 220,
    createdAt: "2002-10-03T00:00:00.000Z",
    status: "Finished",
    genres: ["Action", "Adventure" , "Thriller", "Martial Arts"],
}

const rendercomp = (anime = mockAnime , id = "1") =>{
    return render(<MemoryRouter>
        <FavContextProvider>
            <MediaCard anime={anime} id={id}/>
        </FavContextProvider>
    </MemoryRouter>)

}

describe("mediaCard" , () => {
    it("data present in mediaCard" , ()=>{
        rendercomp();

        expect(screen.getByText("Naruto")).toBeInTheDocument(),
        expect(screen.getByText(/220/)).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();

    })

    it("only first 3 genres are allowed" , () =>{
        rendercomp();
        expect(screen.queryByText("Martial Arts")).not.toBeInTheDocument();

    })
})