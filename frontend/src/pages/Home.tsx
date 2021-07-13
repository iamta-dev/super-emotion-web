import { DeepFace } from "../components/DeepFace"

export const Home = () => {
  return (
    <>
    <div className="flex flex-row justify-center">
    <DeepFace name="DeepFace"/>
    <DeepFace name="DeepFace + SuperResolution"/>
    </div>
    </>
  )
}