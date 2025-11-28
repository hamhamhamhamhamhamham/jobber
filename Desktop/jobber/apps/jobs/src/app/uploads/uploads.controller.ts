import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express"
import {diskStorage} from 'multer'
import { UPLOADS_PATH } from './upload';
import {Express} from "express"
@Controller('uploads')
export class UploadsController {



     // upload MULTIPART-FORMDATA request -> nestjs built-in interceptor(MULTER) that executes before route handler 
    @Post("upload")
    @UseInterceptors(
        FileInterceptor('file',{   //🔑key value of 🌟MULTIPART-FORMDATA request🌟(set from client) -> file
        storage:diskStorage({
            destination:UPLOADS_PATH,           //UPLOAD
            filename:(_req,file,callback)=>{
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()*1e9)
                const fileName = `${file.originalname.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.json`
                callback(null,fileName)
            }
        }), 
        fileFilter:(_req, file , callback)=>{     // FILE VALIDATION
            if(file.mimetype != "application/json"){
                return callback(
                    new BadRequestException('Only JSON files are allowed!'),false
                )
            }
            callback(null,true)
        }
    }))
    uploadFile(
        @UploadedFile() file : Express.Multer.File  // sucessfullt uploaded file!
    ){
       return {
        message : "File uploaded successfully!",
        filename:file.filename,
        mimetype:file.mimetype,
        fieldname:file.fieldname,
        path:file.path,
        size:file.size,
        stream:file.stream
       }
    }




}
