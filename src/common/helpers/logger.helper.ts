import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAuditDto } from 'src/modules/audits/dto/create-audit.dto';

@Injectable()
export class LoggerHelper {
  constructor(private prisma: PrismaService) {}

  /**
   * Registra una solicitud en la base de datos.
   * @param request La solicitud HTTP.
   * @param status El estado del log (ejemplo: 'SUCCESS', 'MISSING_TOKEN', etc.).
   * @param message Un mensaje detallado sobre la acción registrada.
   */
  async logRequest(
    request: any,
    status: string,
    message: string,
  ): Promise<void> {

    const userId = request?.user?.id || 'ANONYMOUS';
    const endpoint = request?.route?.path || 'UNKNOWN';
    const method = request?.method || 'UNKNOWN';

    const logData: CreateAuditDto = {
      userId,
      endpoint,
      method,
      status,
      message,
    };
    
    try {
      await this.prisma.logger.create({
        data: logData,
      });
    } catch (error) {
      console.error('Failed to log request:', {
        error: error.message,
        logData,
      });
    }
  }
}
