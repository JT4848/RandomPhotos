import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const Photos = ({ singlePhotoId }) => {
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/photo/photos");
      const data = await response.json();
      console.log(data)
      setPhoto(data)
    }
    fetchData();
  }, [])
  
  return (
    <>
      {singlePhotoId ? (
        <div>
          {photo
            .filter((pic) => pic.id.toString() === singlePhotoId)
            .map((selectedPic) => (
              <div key={selectedPic.id}>
                <h3>{`Photo ${selectedPic.id}`}</h3>
                <img src={selectedPic.photos} alt={`Photo ${selectedPic.id}`} />
              </div>
            ))}
        </div>
      ) : (
        <>
          {photo.map((pic) => (
            <Link key={pic.id} to={`/photo/${pic.id}`}>
              <img src={pic.photos} alt={`Photo ${pic.id}`} />
            </Link>
          ))}
        </>
      )}
    </>
  )
}



export default Photos;
