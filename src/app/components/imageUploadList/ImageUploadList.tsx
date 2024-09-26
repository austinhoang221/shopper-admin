import { faker } from "@faker-js/faker/.";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, GetProp, Image, Upload, UploadFile, UploadProps } from "antd";
import React from "react";

type Props = {};
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const ImageUploadList = (props: Props) => {
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImg, setPreviewImg] = React.useState("");
  const [fileList, setFileList] = React.useState<UploadFile[]>([
    // {
    //     uid: '-1',
    //     name: 'img1.png',
    //     status: 'done',
    //     url: faker.image.url(),
    // },
    // {
    //     uid: '1',
    //     name: 'img2.png',
    //     status: 'done',
    //     url: faker.image.url(),
    // }
  ]);

  const getBase64 = async (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <>
      <Upload
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 5 ? null : <UploadBtn />}
      </Upload>
      {previewImg && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImg(""),
          }}
          src={previewImg}
        />
      )}
    </>
  );
};

export const UploadBtn = () => (
  <Button type="primary">
    <FontAwesomeIcon icon={faPlusCircle} />
  </Button>
);

export default ImageUploadList;
