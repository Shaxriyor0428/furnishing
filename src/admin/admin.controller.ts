import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './entities/admin.entity';
import { AdminAccessTokenGuard } from '../common/guards/admin.access-token.guard';
import { IsCreatorGuard } from '../common/guards/creator.guard';
import { AdminSelfGuard } from '../common/guards/admin.self.guard';

@UseGuards(AdminAccessTokenGuard)
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Post()
  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.create(createAdminDto);
  // }

  @UseGuards(AdminSelfGuard)
  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({
    status: 200,
    description: 'List of admins',
    type: [Admin],
  })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AdminSelfGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get admin by id retrived successfully',
    type: Admin,
  })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update admin by ID' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Updated successfully',
    type: Admin,
  })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(IsCreatorGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Removed successfully',
  })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
