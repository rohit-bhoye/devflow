const uploadToCloudinary = async (imageBlob) => {
  const formData = new FormData();

  formData.append("file", imageBlob);
  formData.append("upload_preset", "devflow");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dopn7pnjc/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error("Cloudinary did not return a secure URL");
    }

    return data.secure_url;
  } catch (error) {
    console.log(`Cloudinary upload failed: ${error.message}`)
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export default uploadToCloudinary;
