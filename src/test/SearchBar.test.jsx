import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "../Components/media/SearchBar";
import { describe, it, expect } from "vitest";

describe("searchbar", () => {
  it("input present in searchBar", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("value changes on typing" , async() => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    await user.type(screen.getByRole("textbox") , "naruto")
    expect(screen.getByRole("textbox")).toHaveValue("naruto")
  })

  it("remove icon remain hidden untill there is no value" , () =>{
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    expect(screen.queryByRole("button" )).not.toBeInTheDocument()

  })

  it('remove icon visible when there is a value' , async() =>{
    const user = userEvent.setup();
    render(<MemoryRouter>
        <SearchBar/>
    </MemoryRouter>)

    await user.type(screen.getByRole("textbox") , "one")

    expect(screen.queryByRole("button")).toBeInTheDocument();
  })
  
  it("value clear when a user tap on cross button" , async ()=>{
    const user = userEvent.setup();
    render(<MemoryRouter>
        <SearchBar/>
    </MemoryRouter>)

    const input = screen.getByRole("textbox")

    await user.type(input , "naruto")
    await user.click(screen.queryByRole("button"))

    expect(input.value).toBe("")
     
  })

})

