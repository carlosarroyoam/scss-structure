import { Service } from '@angular/core';

import { APP_NAMESPACE } from '@/core/constants/storage-keys.constants';
import { StorageService } from '@/core/data-access/services/storage-service/storage-service';

@Service()
export class SessionStorageService extends StorageService {
  protected readonly storage = sessionStorage;
  protected readonly namespace = APP_NAMESPACE;
}
