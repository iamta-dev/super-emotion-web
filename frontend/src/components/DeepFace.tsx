import {  useRef, useState } from 'react'
import { analyzeImg } from '../services/deepFace';
export const DeepFace = ({name}:{name:string}) => {
  const [processing,setProcessing] = useState<boolean>(false);
  const selectImgRef = useRef(null);
  const [selectImg, setSelectImg] = useState<string>("");
  const getBase64 = (e: any) => {
    var file = e.target.files[0];
    const { name } = e.target as HTMLInputElement;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        console.log(reader.result.toString())
        if (name === "selectImg") setSelectImg(reader.result.toString());
      }
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const analyze = async(imgBase64: string)=>{
    try {
    const res = await analyzeImg(imgBase64);
    console.log(res);
    } catch (error) {
      console.log(error);
    } finally{

    }
  }
  return (
    <>
    <div className="flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div
          className="w-70vh h-80vh flex flex-col items-center space-y-4 bg-white rounded-xl shadow-lg p-4 mx-8 mt-8"
        >
          <div className="flex text-center text-4xl font-bold">
            {name}
          </div>
          {selectImg !== "" && (
            <div className="grid place-items-center">
              <div className="">
                {/* ตัวอย่างรูป */}
              </div>
              <img
                alt="slip"
                className="w-200vh border-2 border-primary-600"
                src={selectImg}
              />
            </div>
          )}
          {processing&&(
          <div className="flex flex-row justify-center items-center">
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="text-xl">กำลังประมวลผล</div>
          </div>
          )}
          <div className="flex flex-row">
            <div className="flex justify-center">
              {selectImg!==""&&!processing&&(
                <div
                className="cursor-pointer rounded-md bg-primary-500 text-sm text-white text-center hover:cursor-pointer p-1 px-3 mx-4 w-32"
                data-cy="select-img"
                onClick={() => {
                  setProcessing(true);
                }}
              >
                ประมวลผล
              </div>
              )}
              
              {selectImg===""?(
                <div
                  className="cursor-pointer rounded-md bg-primary-500 text-sm text-white text-center hover:cursor-pointer p-1 px-3 mx-4 w-32"
                  data-cy="select-img"
                  onClick={() => {
                    // @ts-ignore: Object is possibly 'null'.
                    selectImgRef.current.click();
                  }}
                >
                  <p>เลือกรูปภาพ</p>
                </div>
                ):(
                  <div
                  className="cursor-pointer rounded-md bg-primary-500 text-sm text-white text-center hover:cursor-pointer p-1 px-3 mx-4 w-32"
                  data-cy="select-img"
                  onClick={() => {
                    setSelectImg("");
                    setProcessing(false);
                  }}
                >
                  <p>ยกเลิก</p>
                </div>
                )}
              <input
                name="selectImg"
                type="file"
                accept="image/*"
                capture="camera"
                onChange={getBase64}
                ref={selectImgRef}
                style={{ display: "none" }}
              />
            </div>
          </div>



          <Summary/>
        </div>
      </form>
    </div>
    </>
  )
}

const Summary = ( ) =>{
  return (
  <>
      <div className="bg-white">
        <section className="px-4 py-4 flex justify-between font-bold">ค่าจาก model</section>
        <div className="flex justify-between mb-8">
          <div
            className="grid h-64 w-full px-4 py-2"
          >
            <div className="grid grid-cols-2 justify-between">
              <div className="font-light text-sm">เลขทะเบียน</div>
              <div className={`font-light ml-8 text-sm text-gray-500`}>
                gggggggggg
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="font-light text-sm">ประเภทยานพาหนะ</div>
              <div className={`font-light ml-8 text-sm text-gray-500`}>
              gggggggggg
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="font-light text-sm">ข้อมูลยานพาหนะ</div>
              <div className={`font-light ml-8 text-sm text-gray-500`}>
              gggggggggg
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="font-light text-sm">รหัสยานพาหนะ</div>
              <div className="font-light ml-8 text-sm text-gray-500">
              gggggggggg
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="font-light text-sm">รหัสสำนักงาน</div>
              <div className="font-light ml-8 text-sm text-gray-500">
              gggggggggg
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
}