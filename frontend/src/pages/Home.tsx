import { DeepFace } from "../components/DeepFace"
import { SuperResolution } from "../components/SuperResolution"

export const Home = () => {
  return (
    <>
    <div className="flex flex-row justify-center">
    <DeepFace name="DeepFace"/>
    <SuperResolution name="DeepFace + SuperResolution"/>
    </div>
    </>
  )
}