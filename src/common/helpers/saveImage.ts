import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { InternalServerErrorException } from '@nestjs/common';

export async function saveFile(file: any): Promise<string> {
  try {
    if (!file || !file.originalname) {
      throw new InternalServerErrorException("Fayl yuklanmadi yoki nomi yo'q");
    }
    const extname = path.extname(file.originalname);
    // console.log(extname, "\n", file);

    const fileName = uuid.v4() + extname;

    const filePath = path.resolve(__dirname, '..', '..', '..', 'uploads');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    fs.writeFileSync(path.join(filePath, fileName), file.buffer);
    return fileName;
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException('Rasmni filega yozishda xatolik');
  }
}
