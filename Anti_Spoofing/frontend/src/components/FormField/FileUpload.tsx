import ImageAddLineIcon from "remixicon-react/ImageAddLineIcon";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FileDrop } from "react-file-drop";
import toBase64 from "../../utils/toBase64";

const FileUpload = ({
  setValue,
  value,
}: {
  name: string;
  setValue: (value: string) => void;
  value: string;
}) => {
  const [processing, setProcessing] = useState(false);
  const [file, setFile] = useState<string>(value);
  const fileInputRef = useRef(null);
  const onTargetClick = () => {
    //@ts-ignore
    fileInputRef.current.click();
  };

  const adapter = async (files: FileList | null) => {
    setProcessing(true);
    // setTouched((touched) => ({ ...touched, [name]: true }));
    try {
      console.log("received file drop");
      // const reader = new window.FileReader();
      const stringifiedFile = await toBase64(files![0]);
      console.log(stringifiedFile);
      setValue(stringifiedFile);
      setFile(stringifiedFile);
    } catch (e) {
      setFile("");
      setValue("");
      toast.error("Error occured while processing file");
    } finally {
      setProcessing(false);
    }
  };

  const filePickerContent = (
    <div className="py-16">
      {file ? (
        <img className="p-4" src={file} alt={"file"} />
      ) : (
        <>
          <div>
            <ImageAddLineIcon className="text-primary mx-auto" />
          </div>
          <div className="text-black font-bold text-body-4 mt-4 mb-0 text-center">
            {processing ? (
              <>Processing file...</>
            ) : (
              <>
                Drop your file here or{" "}
                <span className="text-primary underline cursor-pointer">
                  browse
                </span>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div>
      <div className="w-full border-dashed  border-primary border-2 rounded-small grid place-items-center">
        <input
          onChange={(e) => {
            adapter(e.target.files!);
          }}
          ref={fileInputRef}
          type="file"
          className="hidden"
        />
        {/*@ts-ignore*/}
        <FileDrop
          onDrop={adapter}
          onTargetClick={onTargetClick}
          className="w-full h-full"
        >
          {filePickerContent}
        </FileDrop>
      </div>
    </div>
  );
};

export default FileUpload;
