import {  useRef, useState } from 'react'
import { analyzeImg } from '../services/deepFace';
interface IDeepFace {
  instance_1:{
    age: number;
    dominant_emotion: 'angry'|'disgust'|'fear'|'happy'|'neutral'|'sad'|'surprise';
    dominant_race: 'asian'|'black'|'indian'|'latino_hispanic'|'middle_eastern'|'white';
    emotion:{
      angry: number;
      disgust: number;
      fear: number;
      happy: number;
      neutral: number;
      sad: number;
      surprise: number;
    }
    race:{
      asian: number;
      black: number;
      indian: number;
      latino_hispanic: number;
      middle_eastern: number;
      white: number;
    }
    gender: string;
  },
  seconds: number;
  trx_id : string;
}

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
        if (name === "selectImg") setSelectImg(reader.result.toString());
      }
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const [instance,setInstance] = useState<IDeepFace>(
    {
      instance_1:{
        age: 0,
        dominant_emotion: 'angry',
        dominant_race: 'asian',
        emotion:{
          angry: 0,
          disgust: 0,
          fear: 0,
          happy: 0,
          neutral: 0,
          sad: 0,
          surprise: 0,
        },
        race:{
          asian: 0,
          black: 0,
          indian: 0,
          latino_hispanic: 0,
          middle_eastern: 0,
          white: 0,
        },
        gender: ""
      },
      seconds: 0,
      trx_id : "",
    }
  );

  const processingImg = async(imgBase64: string)=>{
    setProcessing(true);
    try {
    const res = await analyzeImg(imgBase64);
    console.log(res);
    if(res!==undefined){
      setInstance(res.data)
    }
    } catch (error) {
      console.log(error);
    } finally{
      setProcessing(false);
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
          className="w-70vh min-h-80vh flex flex-col items-center space-y-4 bg-white rounded-xl shadow-lg p-4 mx-8 mt-8"
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
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="text-xl font-bold text-primary-500">กำลังประมวลผล</div>
          </div>
          )}
          <div className="flex flex-row">
            <div className="flex justify-center">
              {selectImg!==""&&!processing&&(
                <div
                className="cursor-pointer font-bold rounded-md bg-primary-500 text-xl text-white text-center p-1 px-3 mx-4 w-32 hover:bg-opacity-90"
                data-cy="select-img"
                onClick={() => {
                  processingImg(selectImg);
                }}
              >
                ประมวลผล
              </div>
              )}
              
              {selectImg===""?(
                <div
                  className="cursor-pointer font-bold rounded-md bg-primary-500 text-xl text-white text-center p-1 px-3 mx-4 w-32 hover:bg-opacity-90"
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
                  className="cursor-pointer font-bold border-2 border-primary-500 rounded-md bg-white text-xl text-primary-500 text-center p-1 px-3 mx-4 w-32 hover:bg-opacity-90"
                  data-cy="select-img"
                  onClick={() => {
                    setSelectImg("");
                    setProcessing(false);
                    setInstance({...instance,trx_id:""})
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


          {instance.trx_id!==""&&(
            <Summary instance={instance}/>
          )}
        </div>
      </form>
    </div>
    </>
  )
}

const Summary = ({instance}:{instance: IDeepFace}) =>{
  return (
  <>
      <div className="bg-white">
        <div className="px-4 py-2 flex justify-between font-bold text-4xl">ค่าจาก model</div>
        <div className="flex justify-between mb-8">
          <div
            className="grid h-48 w-full px-4 py-2"
          >
            <div className="grid grid-cols-2 justify-between">
              <div className="text-xl">dominant_emotion</div>
              <div className={`ml-8 text-xl text-gray-500`}>
                {instance.instance_1.dominant_emotion}
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="text-xl">emotion</div>
              <div className={`ml-8 text-xl text-gray-500`}>
              {instance.instance_1.emotion[instance.instance_1.dominant_emotion]}
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="text-xl">dominant_race</div>
              <div className={`ml-8 text-xl text-gray-500`}>
                {instance.instance_1.dominant_race}
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="text-xl">race</div>
              <div className={`ml-8 text-xl text-gray-500`}>
              {instance.instance_1.race[instance.instance_1.dominant_race]}
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="text-xl">age</div>
              <div className={`ml-8 text-xl text-gray-500`}>
              {instance.instance_1.age}
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="text-xl">gender</div>
              <div className="ml-8 text-xl text-gray-500">
              {instance.instance_1.gender}
              </div>
            </div>
            <div className="grid grid-cols-2 justify-between">
              <div className="text-xl">process seconds</div>
              <div className="ml-8 text-xl text-gray-500">
              {instance.seconds}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
}