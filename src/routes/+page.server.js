import { data } from "./data.js"

export function load() {
    return {
        elements: data.map((element) => ({
            element
        }))
    }
}