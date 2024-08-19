import DragComponent from "@/components/DragComponent"
import NavBar from "@/components/NavBar"
import Image from "next/image"

export default function Home() {
    return (
        <div>
            <NavBar />
            <main className="">
                <DragComponent />
            </main>
        </div>
    )
}
