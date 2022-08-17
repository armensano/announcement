import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../files/config/multer-options';
import { CREATE_UPDATE_SCENT_FILE_TYPES } from '../constants';
import { CheckDBJwtAuthGuard } from 'src/jwt/jwt.guards';
import { GetUser } from 'src/shared/decorator/get-user';
import { JwtPayload } from 'src/jwt/jwt.strategy';

@ApiTags('announcements')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor(CREATE_UPDATE_SCENT_FILE_TYPES, multerOptions),
  )
  @ApiConsumes('multipart/form-data')
  @UseGuards(CheckDBJwtAuthGuard)
  create(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
    @UploadedFiles() images: any,
    @GetUser() user: JwtPayload,
  ) {
    return this.announcementsService.create(user.id, {
      ...createAnnouncementDto,
      images: images.images.map((image) => image.filename),
      tags: JSON.parse(createAnnouncementDto.tags),
    });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(CheckDBJwtAuthGuard)
  findAll() {
    return this.announcementsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(CheckDBJwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.announcementsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor(CREATE_UPDATE_SCENT_FILE_TYPES, multerOptions),
  )
  @ApiConsumes('multipart/form-data')
  @UseGuards(CheckDBJwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
    @UploadedFiles() images: any,
  ) {
    return this.announcementsService.update(+id, {
      ...updateAnnouncementDto,
      images:
        images?.images?.length > 0
          ? images.images.map((image) => image.filename)
          : undefined,
      tags: JSON.parse(updateAnnouncementDto.tags),
    });
  }

  @Delete(':id')
  @UseGuards(CheckDBJwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.announcementsService.remove(+id);
  }
}
