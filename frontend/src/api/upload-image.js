import axios from 'axios';

export async function upload_image(image) {
    try{
        const formData = new FormData();
        formData.append('image', image);
        const response = await axios.post(
            `${import.meta.env.VITE_AXIOS_API}/api/upload-image`,
            formData,
            { withCredentials: true }
        );

        if(response.data.success){
            console.log('Image uploaded successfully');
        }else{
            console.log(response.data);
        }
        return response.data;
    }catch(error){
        const message = error.response?.data?.message || 'Image not uploaded. Server error, try again';
        alert(message);
        return { success: false, message };
    }
}
