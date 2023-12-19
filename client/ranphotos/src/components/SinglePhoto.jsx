import { useParams } from "react-router-dom";
import Photos from "./Photos";



const SinglePhoto = () => {
  const { id } = useParams();


  return (
    <>
      <Photos singlePhotoId={id}/> 
    </>
  )
}


export default SinglePhoto;
