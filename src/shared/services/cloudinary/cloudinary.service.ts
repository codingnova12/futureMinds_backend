import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
  UploadResponseCallback,
} from 'cloudinary';
import { CloudinaryConfigService } from 'src/infrastructure/configration/cloudinaryConfig.service';
import { Express } from 'express';
import 'multer';
@Injectable()
export class CloudinaryService {
  constructor(private readonly cloudinaryConfig: CloudinaryConfigService) {}
  public init() {
    cloudinary.config({
      cloud_name: this.cloudinaryConfig.getCloudName(),
      api_key: this.cloudinaryConfig.getApiKey(),
      api_secret: this.cloudinaryConfig.getApiSecret(), // Click 'View API Keys' above to copy your API secret
    });
  }
  public async upload(
    file: Express.Multer.File,
    options?: UploadApiOptions,
    callback?: UploadResponseCallback,
  ): Promise<UploadApiResponse> {
    return await cloudinary.uploader.upload(file.path, options, callback);
  }
}
