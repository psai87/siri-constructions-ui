import {useEffect, useState} from "react";
import {imageUtil} from "../common/ImageUtil.ts";
import type {ImageProps} from "../model/Props.ts";


export default function ImagePreview({image}: ImageProps) {

    const [previewUrl, setPreviewUrl] = useState<string>("/siri-constructions-ui/preview_image.png");

    useEffect(() => {
        if (!image || !image.image) {
            setPreviewUrl("/siri-constructions-ui/preview_image.png")
            return;
        }
        const buffer = imageUtil.base64ToArrayBuffer(image.image);
        const blob = new Blob([buffer], {type: "image/jpeg"});
        const objectUrl = URL.createObjectURL(blob);
        setPreviewUrl(objectUrl);
        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [image]);

    return (
        <img
            src={previewUrl}
            alt="Preview"
            className="object-cover w-full h-full rounded-xl"
        />
    );
}
