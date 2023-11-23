import Card from "@/_components/card"
import axios from "axios"
export default function ArticleSection(){

    async function getArticle(){
        const response = await axios.get("");
    }
    
    return(
        <section className="bg-white h[45rem] p-5">
            <div className="container mx-auto">
                <h1 className="text-5xl font-Title text-center">Artikel</h1>
                <div className="overflow-x-auto grid grid-flow-col grid-row-2 gap-4 py-10 items-center h-[40rem]">
                    <Card  /> 
                    <Card  /> 
                    <Card  /> 
                    <Card  /> 
                    <Card  /> 
                    <Card  /> 
                    <Card  /> 
                    <Card  /> 
                </div>
            </div>
        </section>
    )
}