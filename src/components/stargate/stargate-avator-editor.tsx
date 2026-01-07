import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import { getCroppedImg } from "@/lib/cropImage";
import { useQuery } from "@tanstack/react-query";

export default function StargateAvatorEditor({ userId }: { userId: string }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppingFile, setCroppingFile] = useState<File | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  //   const uploadMutation = useUploadProfileImage(userId);

  // Dropzone
  const onDrop = useCallback((files: File[]) => {
    if (!files.length) return;
    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) return alert("Invalid image type");
    if (file.size > 5 * 1024 * 1024) return alert("Max size 5MB");

    setCroppingFile(file);
    setImageSrc(URL.createObjectURL(file));
    setIsCropping(true);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onCropComplete = useCallback((_: any, croppedArea: any) => {
    setCroppedAreaPixels(croppedArea);
  }, []);

  const handleCropSave = async () => {
    if (!croppingFile || !croppedAreaPixels) return;

    const croppedFile = await getCroppedImg(imageSrc!, croppedAreaPixels);
    setImageSrc(URL.createObjectURL(croppedFile));
    setIsCropping(false);

    // uploadMutation.mutate(croppedFile); // React Query handles loading, errors, success
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-52 w-52">
        <img
          src={imageSrc || "/profile.png"}
          alt="Profile"
          className="h-full w-full rounded-full border border-gray-300 object-cover"
        />
        <div
          {...getRootProps()}
          className="absolute bottom-0 left-0 w-full cursor-pointer text-center"
        >
          <input {...getInputProps()} />
          <span className="rounded-md bg-gray-200 px-2 py-1 hover:bg-gray-300">
            Change
          </span>
        </div>
      </div>

      {isCropping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-md bg-white p-4">
            <div className="relative h-72 w-full">
              <Cropper
                image={imageSrc!}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setIsCropping(false)}>Cancel</button>
              <button
                onClick={handleCropSave}
                // disabled={uploadMutation.isLoading}
              >
                {/* {uploadMutation.isLoading ? "Uploading..." : "Save"} */}
                save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
