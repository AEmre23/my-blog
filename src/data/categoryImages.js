import foodImg from '../assets/food.jpg'
import techImg from '../assets/tech.jpg'
import otherImg from '../assets/other.jpg'
import designImg from '../assets/design.jpg'
import lifeImg from '../assets/life.jpg'
import travelImg from '../assets/travel.webp'

const ImagePicker = (category) => {
  let cateImg
  const Images = [
  foodImg,
  techImg,
  travelImg,
  designImg,
  lifeImg,
  otherImg
  ]
    if (category?.toLowerCase() == "food") cateImg = Images[0]
    else if (category?.toLowerCase() == "technology") cateImg = Images[1]
    else if (category?.toLowerCase() == "travel") cateImg = Images[2]
    else if (category?.toLowerCase() == "design") cateImg = Images[3]
    else if (category?.toLowerCase() == "life") cateImg = Images[4]
    else cateImg = Images[5]
  
  return cateImg
}


export default ImagePicker