import Card from "@/_components/card"
import axios from "axios"
import { useEffect,useState } from "react";
export default function ArticleSection(){
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
    const [posts, setPosts] = useState([]);
    const getAllDataPost = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/admin/posts/all-data`);
          setPosts(response.data.posts);
          console.log("posts:", response.data.posts); // Log the response data instead of the state variable
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      useEffect(() => {
        getAllDataPost();
      }, []);
    return(
        <section className="bg-white h[45rem] p-5">
            <div className="cmd:ontainer mx-auto">
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