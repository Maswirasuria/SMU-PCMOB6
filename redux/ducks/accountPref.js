export const LIGHT_MODE= "light_mode";
export const DARK_MODE= "dark_mode";
export const UPLOAD_PIC= "upload_pic";
export const DELETE_PIC= "delete_pic";


const initialState = {
    isDark: false,
    profilePicture:null,
};

export function lightModeAction(){
    return {
        type:LIGHT_MODE,
    };
}

export function darkModeAction(){
    return {
        type:DARK_MODE,
    };
}

export function  uploadPicAction(){
    return{
        type: UPLOAD_PIC,
    };
}

export function deletePicAction(){
    return {
        type: DELETE_PIC,
    };


}