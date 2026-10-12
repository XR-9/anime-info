import { render , screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe , expect, it  , vi} from "vitest";
import Pagination from "../Components/media/Pagination";
describe("pagination" , () => {
    it("return null when it is 1 page" , () =>{
        const {container} = render(<Pagination currentPage={1} totalPage={1} onPageChange={() =>{}}/>)

        expect(container.firstChild).toBeNull()
    })

    it("hide prev button when it is 1st page" , () =>{
        const {container} =  render(<Pagination currentPage={1} totalPage={4} onPageChange={() =>{}}/>)

        const prev = screen.queryByText("← Prev")
        expect(prev.className).toHaveClass("hide-btn")
    })
    it("hide next button when it is last page" , () =>{
        const {container} =  render(<Pagination currentPage={4} totalPage={4} onPageChange={() =>{}}/>)

        const next = screen.queryByText("Next →")
        expect(next.className).toHaveClass("hide-btn")
    })
    it("go to next page" , async () =>{
        const user = userEvent.setup();
        const handleclick = vi.fn();
        render(<Pagination currentPage={2} totalPage={6} onPageChange={handleclick}/>)
        await user.click(screen.queryByText("Next →"))
        expect(handleclick).toHaveBeenCalledWith(3)
    })
    it("go to prev page" , async () =>{
        const user = userEvent.setup();
        const handleclick = vi.fn();
        render(<Pagination currentPage={2} totalPage={6} onPageChange={handleclick}/>)
        await user.click(screen.queryByText("← Prev"))
        expect(handleclick).toHaveBeenCalledWith(1)
    })
    

})