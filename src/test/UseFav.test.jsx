import {  renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { FavContextProvider, usefav } from "../context/favContext";
import { act } from "react";


const wrapper = ({children}) => (
    <FavContextProvider>{children}</FavContextProvider>
)


describe("useFavhook", () =>{
    beforeEach(() => {
        localStorage.clear()
    })

    it("starts with empty favourites", () => {
        const { result } = renderHook(() => usefav(), { wrapper });

        expect(result.current.favId).toEqual([]);
    });

    it("add a favId", () =>{
        const {result} = renderHook(()=> usefav() , {wrapper})
        const anime = {canonicalTitle: "Naruto"}
        
        act(() => {
            result.current.toggleFav("1" , anime)
        })
        expect(result.current.favId).toHaveLength(1)
    })

    it("toggle favId" , () =>{
        const {result} = renderHook(() => usefav() , {wrapper})
        const anime = {canonicalTitle: "Naruto"}
        
        act(() => {
            result.current.toggleFav("1" , anime)
        })
        act(() => {
            result.current.toggleFav("1" , anime)
        })
        expect(result.current.favId).toEqual([])
        expect(result.current.favId).toHaveLength(0)
    })

    it("persist to localstorage" , () => {
        const {result} = renderHook(() => usefav() , {wrapper})
        const anime = {canonicalTitle: "Naruto"}
        
        act(() => {
            result.current.toggleFav("1" , anime)
        })

        const saved = JSON.parse(localStorage.getItem("favIds"))
        expect(saved[0].Id).toBe("1")
    })
})
