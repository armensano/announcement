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
  Query,
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
import { CreateAnnouncementResponse } from './response/announcement.response';
import { SearchAnnouncementDto } from './dto/search-announcement.dto';

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
  async create(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
    @UploadedFiles() images: any,
    @GetUser() user: JwtPayload,
  ): Promise<CreateAnnouncementResponse> {
    const result = await this.announcementsService.create(user.id, {
      ...createAnnouncementDto,
      images:
        images?.images?.length > 0
          ? images.images.map((image) => image.filename)
          : undefined,
      tags: JSON.parse(createAnnouncementDto.tags),
    });
    return CreateAnnouncementResponse.from(result);
  }

  @Post('search')
  @ApiBearerAuth()
  @UseGuards(CheckDBJwtAuthGuard)
  async searchAnnouncements(
    @Body() searchAnnouncementsDto: SearchAnnouncementDto,
  ): Promise<CreateAnnouncementResponse[]> {
    const result = await this.announcementsService.searchAnnouncements(
      searchAnnouncementsDto,
    );
    return CreateAnnouncementResponse.from(result);
  }

  @Get('cities')
  @ApiBearerAuth()
  @UseGuards(CheckDBJwtAuthGuard)
  async getCities(): Promise<string[]> {
    const result = await this.announcementsService.getCities();
    return result;
  }

  @Get('regions')
  @ApiBearerAuth()
  @UseGuards(CheckDBJwtAuthGuard)
  async getRegions(): Promise<string[]> {
    const result = await this.announcementsService.getRegions();
    return result;
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(CheckDBJwtAuthGuard)
  async findAll(
    @GetUser() user: JwtPayload,
    @Query('onlyMine') onlyMine: string,
  ): Promise<CreateAnnouncementResponse[]> {
    const result = await this.announcementsService.findAll(
      user.id,
      onlyMine === 'true',
    );
    return CreateAnnouncementResponse.from(result);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(CheckDBJwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<CreateAnnouncementResponse> {
    const result = await this.announcementsService.findOne(+id);
    return CreateAnnouncementResponse.from(result);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor(CREATE_UPDATE_SCENT_FILE_TYPES, multerOptions),
  )
  @ApiConsumes('multipart/form-data')
  @UseGuards(CheckDBJwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
    @UploadedFiles() images: any,
  ): Promise<CreateAnnouncementResponse> {
    const result = await this.announcementsService.update(+id, {
      ...updateAnnouncementDto,
      images:
        images?.images?.length > 0
          ? images.images.map((image) => image.filename)
          : undefined,
      tags: JSON.parse(updateAnnouncementDto.tags),
    });
    return CreateAnnouncementResponse.from(result);
  }

  @Delete(':id')
  @UseGuards(CheckDBJwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<CreateAnnouncementResponse> {
    const result = await this.announcementsService.remove(+id);
    return CreateAnnouncementResponse.from(result);
  }
}
